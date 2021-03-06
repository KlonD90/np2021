import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Container, Grid, Paper } from '@material-ui/core';
import Logo from '../images/NewLogo.png';
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
        <Container style={{ marginTop: "1em" }} maxWidth="md"  >
            <Grid
                item
                container
                xs={12}
                spacing={1}
                direction={widthSize > 750 ? "row" : "column"}
                alignItems="center"
                justifyContent="flex-start">
                <Grid className={classes.hoverEffect} item xs={widthSize > 750 ? 3 : 9} onClick={() => { history.push('/') }}  >
                    <img className={classes.logoLg} src={Logo} alt="Наблюдательный Полк" />
                </Grid>
            </Grid>

        </Container>
    )
}

export default Header




