import React from 'react';
import { Typography, Toolbar } from '@material-ui/core';
import { useStyles } from '../styles/CustomStyles';

const Footer = () => {
    const classes = useStyles();
    return (

        <Toolbar className={classes.toolBar} >
            <Typography className={classes.headerSm} align="center">Barathrum&Co</Typography>
        </Toolbar>

    )
}

export default Footer;