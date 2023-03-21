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
            figuresLoaded: false,
            annotationLoaded: false,
        };
    }

    componentDidMount() {
        fetch("https://files.catbox.moe/7dvpgw.json") // all images: https://files.catbox.moe/7dvpgw.json
            .then(res => res.json())
            .then((res) => {
                this.setState({
                    figures: res["in"],
                    figuresLoaded: true,
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

    filterByUser() {
        const userAnnotations = {};
        if (this.state.users !== []) {
            this.state.annotations.forEach(annotation => {
                if (this.state.users.includes(annotation.user)) {
                    if (!userAnnotations[parseInt(annotation.id)]) {
                        userAnnotations[parseInt(annotation.id)] = [];
                        userAnnotations[parseInt(annotation.id)].push(annotation);
                    } else {
                        userAnnotations[parseInt(annotation.id)].push(annotation);
                    }
                }
            })
            Object.keys(userAnnotations).forEach(key => {
                if (userAnnotations[key].length !== this.state.users.length) {
                    delete userAnnotations[key];
                }
            })
        }
        console.log(userAnnotations);
        return userAnnotations;
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
        if (this.state.annotationLoaded && this.state.figuresLoaded) {
            const annotationsById = this.filterByUser();
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
                                <FormControlLabel control={<Checkbox onChange={(e) => this.modifyUser(e.target.checked, item)}/>} label={item}/>
                                ))}
                                </FormGroup>
                            </Card>
    
                            <ImageList cols={4} gap={10}>
                            {Object.entries(annotationsById).map(([id, annotations]) => (
                                <Card>
                                    <div className="card">
                                        <ImageListItem variant="woven" key={this.state.figures[id-1]["url"]}>
                                            <div className="figure">
                                                <img
                                                src={this.state.figures[id-1]["url"]}
                                                alt={this.state.figures[id-1]["name"]}
                                                loading="lazy"
                                                />
                                            </div>
                                        <ImageListItemBar
                                            title={this.state.figures[id-1]["name"]}
                                            subtitle={<span>{this.state.figures[id-1]["year"]}</span>}
                                            position="below"
                                        />
                                            {/* modify annotation here */}
                                            {annotations.map((annotation) => (
                                                <div>
                                                    {this.state.users.includes(annotation["user"]) ? (
                                                        <div> 
                                                            <h6>{annotation["user"]}</h6>                                             
                                                        colour type: {annotation["colour"]}, 
                                                        colour use: {annotation["use"]}, 
                                                        colour legend: {annotation["legend"]}, 
                                                        colour mapping: {annotation["maptype"]}, 
                                                        num of colours: {annotation["number"]}.
                                                        </div>
                                                    ):(
                                                        <div></div>
                                                    )}
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