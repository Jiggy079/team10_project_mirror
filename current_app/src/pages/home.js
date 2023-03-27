import React from 'react';
import './annotation.css';
import { Grid, Card, Typography } from '@mui/material';
import MenuBar from './components/menubar';

// where we can add team info and user manual

class Home extends React.Component {

    render() {
        document.title = "CO1OUR";
        return (
            <div className="App">
                <Grid container spacing={2}>
                    <Grid sx={{ flexGrow: 1 }} item xs={12}>
                        <MenuBar handleLogOut={null}/>
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