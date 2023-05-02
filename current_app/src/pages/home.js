import React from 'react';
import { Grid, Card, Fab, Dialog, CardMedia, DialogTitle, DialogContent, DialogContentText, Button, DialogActions } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import MenuBar from './components/menubar';

// where we can add team info and user manual

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "Guest",
            manual: false,
        }
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        const searchParams = new URLSearchParams(window.location.search);
        const username = searchParams.get("user");
        if (username === "undefined" || username === null) {
            this.setState({ user: "Guest" });
        } else {
            this.setState({ user: username });
        }
    }

    lightTheme = createTheme({
        palette: {
          mode: "light",
          primary: {
            main: "#434f63",
          },
        },
    });

    handleLogin(username) {
        this.setState({user: username});
    }

    render() {
        document.title = "CO1OUR";
        return (
            <div className="App">
                <ThemeProvider theme={this.lightTheme}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <MenuBar handleLogin={this.handleLogin} user={this.state.user}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardMedia
                                sx={{ height: 800 }}
                                image="https://files.catbox.moe/m47yin.png"
                            />
                        </Card>
                            <Fab
                                variant="extended"
                                sx={{ position: "absolute", bottom: "200px", left: "120px" }}
                                size="large"
                                onClick={() => this.setState({manual: true})}
                            >
                                <KeyboardArrowRightRoundedIcon />
                                get started
                            </Fab>
                    </Grid>
                </Grid>
                <Dialog
                    open={this.state.manual}
                    onClose={() => this.setState({manual: false})}
                >
                    <DialogTitle>
                        {"HOW TO USE?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="description">
                        The first step of analyzing is to get sufficient information of an image dataset. The annotation tool allows you to annotate images in the dataset by selecting according to the questions.

                        Users may annotate correctly in the first step, but there are chances of controversial annotations. Here the validation tool is to cross check between users.

                        The exploration tool, works as a filter which allows users to explore the image dataset with different properties and year range based on the previous annotations.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={() => this.setState({manual: false})}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                </ThemeProvider>
            </div>
        )
    }
}

export default Home;