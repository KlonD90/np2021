import React from 'react';
import queryString from 'query-string';
import { Typography, Container, Grid } from '@material-ui/core';
import '../styles/landingpg.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import Chart from './Chart';
import TableComponent from './TableComponent';

const DistrictPage = (props: any) => {
    const tikNum = queryString.parse(props.location.search)
    const fetchData = async () => {
        const res: any = await axios.get(`/get_tik/${tikNum.tiknum}`);
        return res
    }
    const { data, status } = useQuery('get_tik', fetchData)
    console.log(data)
    return (
        <Container maxWidth="md">
            <Typography variant="h5" align="center" >{data?.data?.data?.tik_name} </Typography>
            <main className="landing-pg">
                <Grid container
                    spacing={1}
                    direction="column"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Grid item xs={12} >
                        <Typography variant="subtitle2" align="left"  >График количества проголосовавших [{data?.data?.data?.tik_name}]</Typography>
                        <Typography variant="h6" align="center"  >19 Сентября 2021</Typography>
                    </Grid>
                    <Chart data={data?.data?.data?.votes_data} status={status} />
                    <hr className='divider' />
                    <Grid item xs={12}>
                        <Typography align="center" variant="h6">Общее кол-во проголосовавших по УИКам</Typography>
                    </Grid>
                    <Grid item xs={12}  >
                        <TableComponent uiks={data?.data?.data?.summary_data} status={status} history={props.history} />
                    </Grid>
                </Grid>
            </main>
        </Container>
    )
}

export default DistrictPage