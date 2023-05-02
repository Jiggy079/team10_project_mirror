import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, MenuItem, Select } from '@mui/material';

export default function MenuBar({handleLogin, user}) {
    const pages = ["annotation", "validation", "exploration"];
    const usernames = [
        "Guest",
        "RL",
        "HL",
        "JV",
        "LW",
        "NK",
        "WQ",
        "YH",
        "ZZ",
    ];

    const navigate = useNavigate();
    
    const lightTheme = createTheme({
        palette: {
          mode: "light",
          primary: {
            main: "#434f63",
          },
        },
    });

    const handleLink = (page) => {
        navigate(`/${page}?user=${user}`);
    }

    return (
        <ThemeProvider theme={lightTheme}>
            <AppBar position="static">
                <Toolbar>
                <IconButton
                    href="/" 
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                >
                    <ColorLensRoundedIcon />
                </IconButton>
                <Typography variant="h6"
                    noWrap
                    component="a"
                    href="/" 
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        color: 'inherit',
                        textDecoration: 'none',
                    }}>
                    CO1OUR
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                    <Button
                        key={page}
                        onClick={() => handleLink(page)}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {page}
                    </Button>
                    ))}
                </Box>

                {user !== undefined &&
                <div>
                    {handleLogin !== undefined ? (
                        <Select
                        label="Username"
                        size="small"
                        onChange={(e) => handleLogin(e.target.value)}
                        sx={{ color: 'white' }} 
                        value={user}
                        >
                            {usernames.map((username) => (
                                <MenuItem
                                    key={username}
                                    value={username}
                                    >
                                    {username}
                                </MenuItem>
                            ))}
                        </Select>
                    ) : (
                        <div>
                        {user==="Guest" ? (
                            <Button
                            onClick={() => handleLink("")}
                            sx={{ my: 2, color: 'white' }}
                            >
                            Log in
                            </Button>
                        ) : (
                            <Button
                            onClick={() => handleLink("")}
                            sx={{ my: 2, color: 'white' }}
                            endIcon={<LogoutIcon />}
                            >
                            {user}
                            </Button>
                        )}
                        </div>
                    )}
            </div>
            }

                </Toolbar>
            </AppBar>
        </ThemeProvider>
  );
}