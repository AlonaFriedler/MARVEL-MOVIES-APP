import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Toolbar, AppBar, Box } from '@mui/material';

const Navbar: React.FC = () => {
    return (
        <AppBar position="sticky" color="primary">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Marvel Movies Dashboard
                </Typography>
                <Box>
                    <Button color="inherit" component={Link} to="/movies-per-actor">
                        Movies Per Actor
                    </Button>
                    <Button color="inherit" component={Link} to="/actors-with-multiple-characters">
                        Actors With Multiple Characters
                    </Button>
                    <Button color="inherit" component={Link} to="/characters-with-multiple-actors">
                        Characters With Multiple Actors
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
