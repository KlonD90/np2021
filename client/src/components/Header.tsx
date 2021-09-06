import React, { useEffect, useState } from 'react';
import { Typography, Container, Grid, Box,Card, CardContent, Paper } from '@material-ui/core';
import Logo from '../images/np_logo.png';
import HeaderInfoBar from './HeaderInfoBar';

const Header = () => {
    const [widthSize, setWidthSize] = useState(0)

    useEffect(() => {
        setWidthSize(window.innerWidth)
        window.addEventListener('resize', () => {
            setWidthSize(window.innerWidth)
        })
    }, [])

 
    return (
        <Container maxWidth="md">
            <Grid
                item
                container
                xs={12}
                direction={widthSize > 750 ? "row" : "column"}
                wrap="wrap"
                alignItems="center"
                justifyContent="center">
                <Grid item xs={3}>
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