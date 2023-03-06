import React from 'react';
import './validation.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Grid, Card, FormGroup, Checkbox, Button, RadioGroup, FormControlLabel, Radio, CircularProgress } from '@mui/material';
import ArtTrackRoundedIcon from '@mui/icons-material/ArtTrackRounded';
import MenuBar from './components/menubar';

class Validation extends React.Component {
    currentUserList = [];
    constructor(props) {
        super(props);
        this.state = {
            figures : [],
            users: [],
            annotations: [],
            annotationLoaded: false,
        };
    }

    componentDidMount() {
        fetch("https://files.catbox.moe/aumoxt.json") // all images: https://files.catbox.moe/7dvpgw.json
            .then(res => res.json())
            .then((res) => {
                this.setState({
                    figures: res["in"],
                })
            })
        fetch(`https://express-backend-vfm5.onrender.com/annotation/`)
            .then(res => res.json())
            .then((res) => {
                this.setState({
                    annotations: res,
                    annotationLoaded: true,
                })
            })
    }

    modifyUser(checked, user) {
        if (checked) {
            this.currentUserList.push(user);
        } else {
            this.currentUserList = this.currentUserList.filter((element) => element !== user);
        }
        this.setState({users: this.currentUserList});
    }

    groupAnnotationsById() {
        const annotationsById = {};
        this.state.annotations.forEach(annotation => {
            if (!annotationsById[parseInt(annotation.id)]) {
                annotationsById[parseInt(annotation.id)] = [];
            } else {
                annotationsById[parseInt(annotation.id)].push(annotation);
            }
        })
        return annotationsById;
    }

    updateAnnotation() { 
        const newAnnotation = {
            id: this.state.currentFigureIndex + 1,
            imageId: this.state.figures[this.state.currentFigureIndex]["imageID"],
            colour: this.state.colour,
            use: this.state.use,
            legend: this.state.legend,
            maptype: this.state.maptype,
            number: this.state.number,
            difficulty: this.state.difficulty,
        }
        
        fetch(`https://express-backend-vfm5.onrender.com/update/${newAnnotation.id.toString()}/${newAnnotation.user.toString()}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAnnotation),
        })

    }

    render() {
        document.title = "Validation tool";
        let allUser = [
            "RL",
            "HL",
            "JV",
            "LW",
            "NK",
            "WQ",
            "YH",
            "ZZ",
        ];
        if (this.state.annotationLoaded) {
            const annotationsById = this.groupAnnotationsById();
            return (
                <div className="App">
                    <Grid container spacing={2}>
                        <Grid sx={{ flexGrow: 1 }} item xs={12}>
                            <MenuBar handleLogOut={null}/>
                        </Grid>
                        <Grid item xs={12}>
                            {/* add user selection here */}
                            <Card>
                                <FormGroup sx={{ ml: 3 }} row>
                                {allUser.map((item) => (
                                <FormControlLabel control={<Checkbox checked onChange={(e) => this.modifyUser(e.target.checked, item)}/>} label={item}/>
                                ))}
                                </FormGroup>
                            </Card>
    
    
                            <ImageList cols={4} gap={10}>
                            {Object.entries(annotationsById).map(([id, annotations], index) => (
                                
                                <Card>
                                    <div className="card">
                                        <ImageListItem variant="woven" key={this.state.figures[index]["url"]}>
                                            <div className="figure">
                                                <img
                                                src={this.state.figures[index]["url"]}
                                                alt={this.state.figures[index]["name"]}
                                                loading="lazy"
                                                />
                                            </div>
                                        <ImageListItemBar
                                            title={this.state.figures[index]["name"]}
                                            subtitle={<span>{this.state.figures[index]["year"]}</span>}
                                            position="below"
                                        />
                                            {/* modify annotation here */}
                                            {annotations.map((annotation) => (
                                                <div>
                                                <h6>{annotation["user"]}</h6>
                                                colour type: {annotation["colour"]}, 
                                                colour use: {annotation["use"]}, 
                                                colour legend: {annotation["legend"]}, 
                                                colour mapping: {annotation["maptype"]}, 
                                                num of colours: {annotation["number"]}.
                                                </div>
                                            ))}
    
                                            {/* <ArtTrackRoundedIcon /> */}
                                        </ImageListItem>
                                    </div>
                                </Card>
                            ))}
                            </ImageList>
                        </Grid>
                    </Grid>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <Grid container spacing={2}>
                        <Grid sx={{ flexGrow: 1 }} item xs={12}>
                            <MenuBar handleLogOut={null}/>
                        </Grid>
                        <Grid item xs={12}>
                            <CircularProgress />
                        </Grid>
                    </Grid>
                </div>
            )
        }
    }
        
}

export default Validation;