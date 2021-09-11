import React, { useState, useEffect, useRef } from 'react';
import queryString from 'query-string';
import { Typography, Container, Grid, Card } from '@material-ui/core';
import { useQuery } from 'react-query';
import axios from 'axios';
import Chart from './Chart';
import TableComponent from './TableComponent';
import { useResizeObserver } from './useResizeObserver';
import { useStyles } from '../styles/CustomStyles';


const DistrictPage = (props: any) => {
    const classes = useStyles();
    const chartNode = useRef(null);
    const dimensions = useResizeObserver(chartNode)
    const [refetchInterval, setRefetchInterval] = useState(6000);
    const tikNum = queryString.parse(props.location.search)
    const fetchData = async () => {
        const res: any = await axios.get(`/get_tik/${tikNum.tiknum}`);
        return res
    }
    const { data, status } = useQuery('get_tik', fetchData, { refetchInterval })
    useEffect(() => {
        setRefetchInterval(6000)
        return () => {
            setRefetchInterval(10000000)
        }
    }, [])
    return (
        <Container maxWidth="md" ref={chartNode}>
            <Grid container
                spacing={3}
                direction="column"
                alignItems="center"
                justifyContent="space-between"
            >
                <Grid item>
                    <Typography className={classes.header} variant="h4" align="center" >{data?.data?.data?.tik_name}</Typography>
                </Grid>

                {dimensions &&
                    <Grid item xs={12} style={{ width: dimensions?.width, height: "auto" }} >
                        <Card>
                            <Grid
                                style={{ width: dimensions?.width, height: "auto" }}
                                container
                                spacing={3}
                                direction="column"
                                alignItems="center"
                                justifyContent="space-between">
                                <Grid item xs={12} >
                                    <Typography variant="h6" align="center"  >График количества проголосовавших</Typography>
                                </Grid>
                                <Grid item xs={12} style={{ width: dimensions?.width, height: "auto" }} >

                                    <Chart data={data?.data?.data?.votes_data} status={status} electors={data?.data?.data?.electors} />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>

                }

                {dimensions &&
                    <Grid item xs={12} style={{ width: dimensions?.width, height: "auto" }}  >
                        <Card>
                            <Grid container
                                spacing={3}
                                direction="column"
                                alignItems="center"
                                justifyContent="space-between">
                                <Grid item xs={12}>
                                    <Typography align="center" variant="h6">Общее кол-во проголосовавших по ТИКам</Typography>
                                </Grid>
                                <Grid xs={12} item>
                                    <TableComponent uiks={data?.data?.data?.summary_data} status={status} history={props.history} />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>

                }

            </Grid>
        </Container>
    )
}

export default DistrictPage