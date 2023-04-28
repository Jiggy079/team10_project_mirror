import React from 'react';
import './validation.css';
import { Grid, Card, FormGroup, Checkbox, Button, Avatar, Stack, RadioGroup, Typography, FormControlLabel, Radio, CircularProgress, ImageList, ImageListItem, ImageListItemBar, CardContent, TextField } from '@mui/material';
import MenuBar from './components/menubar';
import ValidationIcons from './components/validationIcons';
import ImgWithLink from './components/imgWithLink'

class Validation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            figures : [],
            users: [],
            annotations: [],
            user: "",
            figuresLoaded: false,
            annotationLoaded: false,
        };
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        fetch("https://files.catbox.moe/9j21gm.json")
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
        
        const searchParams = new URLSearchParams(window.location.search);
        const username = searchParams.get("user");
        if (username === "undefined" || username === null) {
            this.setState({ user: "Guest" });
        } else {
            this.setState({ user: username });
        }
    }

    modifyUser(checked, user) {
        let currentUserList = this.state.users;
        if (checked) {
            currentUserList.push(user);
        } else {
            currentUserList = currentUserList.filter((element) => element !== user);
        }
        this.setState({users: currentUserList});
    }

    countAnnotations() {
        const allUser = [
            "RL",
            "HL",
            "JV",
            "LW",
            "NK",
            "WQ",
            "YH",
            "ZZ",
        ];
        const annotationCnt = [0,0,0,0,0,0,0,0];
        this.state.annotations.forEach(annotation => {
            annotationCnt[allUser.indexOf(annotation.user)]++;
        })
        return annotationCnt;
    }

    filterByUser() {
        const userAnnotations = {};
        if (this.state.users.length > 0) {
            this.state.annotations.forEach(annotation => {
                if (this.state.users.includes(annotation.user)) {
                    if (!userAnnotations[parseInt(annotation.id)]) {
                        userAnnotations[parseInt(annotation.id)] = [];
                    }
                    userAnnotations[parseInt(annotation.id)].push(annotation);
                }
            })
            for (const key in userAnnotations) {
                if (userAnnotations[key].length !== this.state.users.length) {
                    delete userAnnotations[key];
                }
            }
        }
        console.log(userAnnotations);
        return userAnnotations;
    }

    // updateAnnotation() { 
    //     const newAnnotation = {
    //         id: this.state.currentFigureIndex + 1,
    //         imageId: this.state.figures[this.state.currentFigureIndex]["imageID"],
    //         colour: this.state.colour,
    //         use: this.state.use,
    //         legend: this.state.legend,
    //         maptype: this.state.maptype,
    //         number: this.state.number,
    //         difficulty: this.state.difficulty,
    //     }
        
    //     fetch(`https://express-backend-vfm5.onrender.com/update/${newAnnotation.id.toString()}/${newAnnotation.user.toString()}`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(newAnnotation),
    //     })
    // }

    handleLogin(username) {
        this.setState({user: username});
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
            const annotationCnt = this.countAnnotations();
            return (
                <div className="App">
                    <Grid container spacing={2}>
                        <Grid sx={{ flexGrow: 1 }} item xs={12}>
                            <MenuBar handleLogin={this.handleLogin} user={this.state.user}/>
                        </Grid>
                        <Grid item xs={12}>
                            {/* User selection */}
                            <Card>
                                <FormGroup sx={{ ml: 3 }} row>
                                {allUser.map((item, index) => (
                                    <FormControlLabel 
                                        control={<Checkbox onChange={(e) => this.modifyUser(e.target.checked, item)}/>} 
                                        label={item + ": " + annotationCnt[index]}
                                    />
                                ))}
                                </FormGroup>
                            </Card>
    
                            <ImageList loading="lazy" cols={4} gap={10}>
                            {Object.entries(annotationsById).map(([id, annotations]) => (
                                <Card>
                                    <div className="imgAnnotation">
                                        <ImageListItem key={this.state.figures[id-1]["url"]}>
                                            <div className="imgcard">
                                                <ImgWithLink figures={this.state.figures} id={id} user={this.state.user} />
                                            </div>
                                        <ImageListItemBar
                                            title={this.state.figures[id-1]["name"]}
                                            position="below"
                                        />

                                        <ValidationIcons annotations={annotations} />

                                        {/* {annotations.map((annotation) => (
                                            <div className="annotations">
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
                                        ))} */}
    
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