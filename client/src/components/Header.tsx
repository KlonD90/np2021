import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Container, Grid, } from '@material-ui/core';
import Logo from '../images/np_logo.png';
import HeaderInfoBar from './HeaderInfoBar';
import { useStyles } from '../styles/CustomStyles';

const Header = () => {
    const [widthSize, setWidthSize] = useState(0)
    const history = useHistory();
    useEffect(() => {
        setWidthSize(window.innerWidth)
        window.addEventListener('resize', () => {
            setWidthSize(window.innerWidth)
        })
    }, [])
    const classes = useStyles();
    return (
        <Container maxWidth="md" onClick={() => { history.push('/') }} className={classes.hoverEffect} >
            <Grid
                item
                container
                xs={12}
                direction={widthSize > 750 ? "row" : "column"}
                alignItems="center"
                justifyContent="center">
                <Grid item xs={widthSize > 750 ? 3 : 12} >
                    <img src={Logo} />
                </Grid>
                <Grid item xs={widthSize > 750 ? 9 : 12} >
                    <HeaderInfoBar />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Header