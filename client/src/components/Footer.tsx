import React from 'react';
import { Container, Box, Grid, Typography, AppBar, Toolbar } from '@material-ui/core';
import { useStyles } from '../styles/CustomStyles';

const Footer = () => {
    const classes = useStyles();
    return (

        <Toolbar className={classes.toolBar} >
            <Typography align="center">Barathrum&Co</Typography>
        </Toolbar>

    )
}

export default Footer;