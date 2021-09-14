import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useStyles } from '../styles/CustomStyles';
import { format, parseISO } from 'date-fns';

const HeaderInfoBar = () => {
    const classes = useStyles();
    const fetchData = async () => {
        const res: any = await axios.get('/common_info/');
        return res
    }
    const { data, status } = useQuery('commoninfo', fetchData)
    return (
        <Paper className={classes.paper} elevation={1} >
            <Typography align="center" color="initial" style={{ fontFamily: "Open Sans" }}>
                <SupervisedUserCircleIcon className={classes.icon} />
                По данным НП по состоянию на <b> {data ? data?.data?.last_update : status} </b> всего проголосовало <b>{data ? data?.data?.amount : status}</b>
            </Typography>
        </Paper>
    )
}

export default HeaderInfoBar;

