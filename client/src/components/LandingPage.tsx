import React, { useState, useEffect } from 'react';
import { Typography, Container, Grid, Divider } from '@material-ui/core';
import '../styles/landingpg.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import Chart from './Chart';
import TableComponent from './TableComponent';
import { useStyles } from '../styles/CustomStyles';


const LandingPage = (props: any) => {
    const [refetchInterval, setRefetchInterval] = useState(6000);
    const classes = useStyles();
    const fetchData = async () => {
        const res: any = await axios.get('/republic/');
        return res
    }
    const { data, status } = useQuery('republic', fetchData, { refetchInterval })
    useEffect(() => {
        setRefetchInterval(6000)
        return () => {
            setRefetchInterval(10000000)
        }
    }, [])
    return (
        <Container maxWidth="md">
            <Typography variant="h5" align="center" >Общее кол-во проголосовавших по Республики </Typography>
            <main className="landing-pg">
                <Grid container
                    spacing={1}
                    direction="column"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Grid item xs={12} >
                        <Typography variant="subtitle2" align="left"  >График количества проголосовавших</Typography>
                    </Grid>
                    <Chart data={data?.data?.votes_data} status={status} electors={data?.data?.electors} />
                    <Grid className={classes.gridItem} item xs={12}>
                        <Typography align="center" variant="h6">Общее кол-во проголосовавших по ТИКам</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TableComponent districts={data?.data?.districts} status={status} history={props.history} />
                    </Grid>
                </Grid>
            </main>
        </Container>
    )
}

export default LandingPage

