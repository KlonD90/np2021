import React, { useEffect, useState } from 'react';
import { Typography, Container, Grid, Box, } from '@material-ui/core';
import '../styles/landingpg.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import Chart from './Chart';
import TableComponent from './TableComponent';


const LandingPage = (props: any) => {
    const fetchData = async () => {
        const res: any = await axios.get('/republic/');
        return res
    }

    const { data, status } = useQuery('republic', fetchData)

    return (
        <Container maxWidth="md">
            <main className="landing-pg">
                <Grid container
                    spacing={1}
                    direction="column"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Grid item xs={12} >
                        <Typography align="center" >Общее кол-во проголосовавших по Республики</Typography>
                    </Grid>
                    <Chart data={data?.data?.votes_data} status={status} />
                    <Grid item xs={12}>
                        <Typography align="center">Общее кол-во проголосовавших по ТИКам</Typography>
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

