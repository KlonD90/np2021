import React from 'react';
import { Typography, Container, Grid, Box, } from '@material-ui/core';
import Logo from '../images/np_logo.png'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useElementSize } from './ResizeHook';

const Header = () => {

    const fetchData = async () => {
        const res: any = await axios.get('/republic/');
        return res
    }
    const { data, status } = useQuery('republic', fetchData)
    const lastUpdate = data?.data?.votes_data.sort((a: any, b: any) => {
        const date = parseISO(a.vote_date).getTime()
        const date2 = parseISO(b.vote_date).getTime()
        return date2 - date
    })[0]
    return (
        <Container>
            <Grid
                container
                direction="row"
                wrap="wrap"
                alignItems="center"
                justifyContent="space-between">
                <Grid item xs={3}>
                    <img src={Logo} />
                </Grid>

                <Grid item xs={9} >
                    <Grid container direction="row" alignItems="center">
                        <SupervisedUserCircleIcon />
                        <Typography align="center">По данным НП по состоянию на {lastUpdate ? lastUpdate.vote_date : status} всего проголосовало {lastUpdate ? lastUpdate.amount : status} </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Header