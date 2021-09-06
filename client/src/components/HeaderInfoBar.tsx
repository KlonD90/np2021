import React from 'react';
import { Typography, Container, Grid, Box,Card, CardContent, Paper } from '@material-ui/core';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import { useQuery } from 'react-query';
import {useStyles} from '../styles/CustomStyles';


const HeaderInfoBar = () =>{
    const classes = useStyles();
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
    return(
                      <Paper className={classes.paper} elevation={6} >
                            <Typography align="center">
                                <SupervisedUserCircleIcon />
                                По данным НП по состоянию на {lastUpdate ? lastUpdate.vote_date : status} всего проголосовало {lastUpdate ? lastUpdate.amount : status}
                            </Typography>
                        </Paper>
    )
}

export default HeaderInfoBar;