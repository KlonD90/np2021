import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { Typography, Container, Grid } from '@material-ui/core';
import '../styles/landingpg.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import Chart from './Chart';

const PollingPage = (props: any) => {
    const [refetchInterval, setRefetchInterval] = useState(6000);
    const { uikId } = queryString.parse(props.location.search)
    const fetchData = async () => {
        const res: any = await axios.get(`/get_uik/${uikId}`);
        return res
    }
    const { data, status } = useQuery('uik', fetchData, { refetchInterval })
    useEffect(() => {
        setRefetchInterval(6000)
        return () => {
            setRefetchInterval(10000000)
        }
    }, [])
    return (
        <Container maxWidth="md">
            <Typography variant="h5" align="center" >{data?.data?.data?.uik_name}</Typography>
            <main className="landing-pg">
                <Grid container
                    spacing={1}
                    direction="column"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Grid item xs={12} >
                        <Typography variant="subtitle2" align="left"  >График количества проголосовавших [{data?.data?.data?.uik_name}]</Typography>
                    </Grid>
                    <Chart electors={data?.data?.data.electors} data={data?.data?.data?.votes_data} status={status} />
                </Grid>
            </main>
        </Container>
    )
}

export default PollingPage