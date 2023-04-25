import React from 'react';
import './annotation.css';
import { Grid, Card, Typography } from '@mui/material';
import MenuBar from './components/menubar';

// where we can add team info and user manual

class Home extends React.Component {

    handleLogin(username) {
        console.log(username);
        this.setState({user: username});
        fetch(`https://express-backend-vfm5.onrender.com/annotation/1/${username.toString()}`)
        .then(res => res.json())
        .then((res) => {
            if (res === null) {
                console.log("res is null");
                this.setState({annotated: false});
                return;
            } else {
                this.setState({
                    annotated: true,
                    colour: res.colour,
                    use: res.use,
                    legend: res.legend,
                    maptype: res.maptype,
                    number: res.number,
                    difficulty: res.difficulty,
                })
            }
        })
    }

    handleLogOut() {
        console.log("log out");
        this.setState({user: ""});
    }

    render() {
        document.title = "CO1OUR";
        return (
            <div className="App">
                <Grid container spacing={2}>
                    <Grid sx={{ flexGrow: 1 }} item xs={12}>
                        <MenuBar handleLogin={this.handleLogin} handleLogOut={this.handleLogOut}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <div className="card">
                                <h1>Use of colour for data vis</h1>
                                <p>This project is based on VIS30k.</p>
                                <p>User manual can be added here.</p>
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Home;