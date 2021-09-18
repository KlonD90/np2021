import React, { useEffect, useState } from 'react';
import { Typography, Paper } from '@material-ui/core';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import axios from '../api';
import { useQuery } from 'react-query';
import { useStyles } from '../styles/CustomStyles';
import { format, parseISO } from 'date-fns';

const HeaderInfoBar = () => {
    const [refetchInterval, setRefetchInterval] = useState(6000);
    const classes = useStyles();
    const fetchData = async () => {
        const res: any = await axios.get('/common_info/');
        return res
    }
    useEffect(() => {
        // setTest(data?.data?.votes_data.slice(0, 10))
        setRefetchInterval(6000)
        return () => {
            setRefetchInterval(10000000)
        }
    }, [])
    const { data, status } = useQuery('commoninfo', fetchData, { refetchInterval })
    console.log(data)
    return (
        <Paper className={classes.paper} elevation={1} >
            <Typography align="center" color="initial" style={{ fontFamily: "Monsterrat" }}>
                <SupervisedUserCircleIcon className={classes.icon} />
                По данным НП по состоянию на <b> {data ? data?.data?.last_update : status} </b> всего проголосовало <b>{data ? data?.data?.amount : status}</b>
            </Typography>
        </Paper>
    )
}

export default HeaderInfoBar;

