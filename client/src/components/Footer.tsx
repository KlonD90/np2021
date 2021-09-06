import React from 'react';
import { Container, Box, Grid, Typography, AppBar, Toolbar } from '@material-ui/core';
import { useStyles } from '../styles/CustomStyles';

const Footer = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="md">
            <Toolbar className={classes.toolBar} >
                <Typography align="center">Barathrum&Co</Typography>
            </Toolbar>
        </Container>
    )
}

export default Footer;