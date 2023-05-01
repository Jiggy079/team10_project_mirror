import React, {lazy, Suspense} from 'react';
import './validation.css';
import { Grid, Card, FormGroup, Checkbox, Button, Avatar, Stack, RadioGroup, Typography, Alert, FormControlLabel, Radio, CircularProgress, ImageList, ImageListItem, ImageListItemBar, CardContent, TextField } from '@mui/material';
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
        const searchParams = new URLSearchParams(window.location.search);
        const username = searchParams.get("user");
        if (username === "undefined" || username === null) {
            this.setState({ user: "Guest" });
        } else {
            this.setState({ 
                user: username,
                users: [username],
            });
        }

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
    }

    modifyUser(checked, user) {
        let currentUserList = this.state.users;
        if (checked) {
            currentUserList.push(user);
        } else {
            currentUserList = currentUserList.filter((element) => element !== user);
        }
        this.setState({ users: currentUserList });
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
        const reversedAnnotations = {};

        if (this.state.user !== "Guest") {
            this.state.annotations.forEach(annotation => {
                if (this.state.users.includes(annotation.user)) {
                    if (!userAnnotations[parseInt(annotation.id)]) {
                        userAnnotations[parseInt(annotation.id)] = [];
                    }
                    userAnnotations[parseInt(annotation.id)].push(annotation);
                }
            });

            // only includes annotations where all selected users have provided an annotation for a given id
            Object.keys(userAnnotations).forEach(key => {
                if (userAnnotations[key].length !== this.state.users.length) {
                    delete userAnnotations[key];
                }
            })

            if (userAnnotations[1][0]["user"] !== this.state.user) {
                Object.keys(userAnnotations).forEach(key => {
                    if (!reversedAnnotations[parseInt(key)]) {
                        reversedAnnotations[parseInt(key)] = [];
                    }
                    reversedAnnotations[parseInt(key)].push(userAnnotations[key][1]);
                    reversedAnnotations[parseInt(key)].push(userAnnotations[key][0]);
                });
                console.log(reversedAnnotations);
                return reversedAnnotations;
            }
        }

        // console.log(userAnnotations);
        return userAnnotations;
    }

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
                        <Grid item xs={12}>
                            <MenuBar user={this.state.user}/>
                        </Grid>
                        {this.state.user !== "Guest" ? (
                            <Grid item xs={12}>
                                {/* User selection */}
                                <Card>
                                    <FormGroup sx={{ ml: 3 }} row>
                                    {allUser.map((item, index) => (
                                        <div>
                                            {item !== this.state.user ? (
                                                <FormControlLabel
                                                    control={<Checkbox color="secondary" onChange={(e) => this.modifyUser(e.target.checked, item)}/>} 
                                                    label={item + ": " + annotationCnt[index]}
                                                    disabled={this.state.users.length >= 2 && !this.state.users.includes(item)}
                                                />
                                            ) : (
                                                <FormControlLabel 
                                                    control={<Checkbox color="primary" checked/>} 
                                                    label={item + ": " + annotationCnt[index]}
                                                    disabled={this.state.users.length >= 2 && !this.state.users.includes(item)}
                                                />
                                            )
                                            }
                                        </div>
                                    ))}
                                    </FormGroup>
                                </Card>
        
                                <ImageList loading="lazy" cols={4} gap={10}>
                                {Object.entries(annotationsById).map(([id, annotations]) => (
                                    <Card>
                                        <div className="imgAnnotation">
                                            <ImageListItem loading="lazy" key={this.state.figures[id-1]["url"]}>
                                                <ImgWithLink figures={this.state.figures} id={id} user={this.state.user} />
                                            <ImageListItemBar
                                                title={this.state.figures[id-1]["name"]}
                                                position="below"
                                            />

                                            {this.state.users.length > 1 ? (
                                                    <ValidationIcons annotations={annotations} id={id} user={this.state.user}/>
                                                ) : (
                                                    <h6>Choose another user to cross check.</h6>
                                                )
                                            }
        
                                            </ImageListItem>
                                        </div>
                                    </Card>
                                ))}
                                </ImageList>
                            </Grid>
                        ) : (
                            <Grid item xs={12}>
                                <Alert severity="error">Please log in first.</Alert>
                            </Grid>
                        )}
                        

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