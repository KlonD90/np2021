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
        <Container style={{ marginTop: "1em" }} maxWidth="md" onClick={() => { history.push('/') }} className={classes.hoverEffect} >
            <Grid
                item
                container
                xs={12}
                spacing={1}
                direction={widthSize > 750 ? "row" : "column"}
                alignItems="center"
                justifyContent="center">
                <Grid item xs={widthSize > 750 ? 3 : 9}  >
                    <Paper>
                        <img className={classes.logoLg} src={Logo} />
                    </Paper>
                </Grid>
                <Grid item xs={widthSize > 750 ? 9 : 12} >
                    <HeaderInfoBar />
                </Grid>
            </Grid>

        </Container>
    )
}

export default Header




{/* <AppBar className={classes.appbar}>
<Toolbar className={classes.toolBarTop}>

    <HeaderInfoBar />
</Toolbar>
</AppBar> */}