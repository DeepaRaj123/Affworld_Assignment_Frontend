import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

/**
 * Header Component
 * Renders the navigation bar for the application using Material-UI's AppBar and Toolbar.
 * Includes links to Login, Register, Tasks, and Feed pages.
 */
const Header = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Task Manager
                </Typography>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/register">Register</Button>
                <Button color="inherit" component={Link} to="/tasks">Tasks</Button>
                <Button color="inherit" component={Link} to="/feed">Feed</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
