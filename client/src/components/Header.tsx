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
                wrap="wrap"
                alignItems="center"
                justifyContent="center">
                <Grid item xs={3} >
                    <img src={Logo} />
                </Grid>
                <Grid item xs={9} >
                    <HeaderInfoBar />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Header