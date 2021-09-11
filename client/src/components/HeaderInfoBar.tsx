import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useStyles } from '../styles/CustomStyles';

const HeaderInfoBar = () => {
    const classes = useStyles();
    const fetchData = async () => {
        const res: any = await axios.get('/common_info/');
        return res
    }
    const { data, status } = useQuery('commoninfo', fetchData)
    return (
        <Paper className={classes.paper} elevation={1} >
            <Typography align="center" color="inherit">
                <SupervisedUserCircleIcon className={classes.icon} />
                По данным НП по состоянию на {data ? data?.data?.last_update : status} всего проголосовало {data ? data?.data?.amount : status}
            </Typography>
        </Paper>
    )
}

export default HeaderInfoBar;

