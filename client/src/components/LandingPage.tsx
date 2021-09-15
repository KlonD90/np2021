import React, { useState, useEffect, useRef } from 'react';
import { Typography, Container, Grid, Card, } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import '../styles/chart.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import Chart from './Chart';
import TableComponent from './TableComponent';
import { useStyles } from '../styles/CustomStyles';
import KalmMap from './KalmMap';
import { useResizeObserver } from './useResizeObserver';
import { getDistrictsData } from '../actions/districts';
import BreadCrumbs from './BreadCrumbs';
import Loading from '../images/Spin-1s-200px.gif';

const LandingPage = (props: any) => {
    const [refetchInterval, setRefetchInterval] = useState(6000);
    const [test, setTest] = useState(null);
    const chartNode = useRef(null)
    const dimensions = useResizeObserver(chartNode)
    const classes = useStyles();
    const dispatch = useDispatch();
    const fetchData = async () => {
        const res: any = await axios.get('/republic/');
        dispatch(getDistrictsData(res?.data?.districts))
        return res
    }

    const { data, status } = useQuery('republic', fetchData, { refetchInterval })
    useEffect(() => {
        // setTest(data?.data?.votes_data.slice(0, 10))
        setRefetchInterval(6000)
        return () => {
            setRefetchInterval(10000000)
        }
    }, [])
    // This is fofr testing purposes =>
    // useEffect(() => {
    //     const testData2 = data?.data?.votes_data.slice(0, 20)
    //     setTimeout(() => {
    //         setTest(testData2)
    //     }, 6100)
    // }, [])

    // useEffect(() => {
    //     const testData3 = data?.data?.votes_data.slice(0, 34)
    //     setTimeout(() => {
    //         setTest(testData3)
    //     }, 12100)
    // }, [])

    return (
        <Container maxWidth="md" ref={chartNode} className={classes.container}>
            <Helmet>
                <title>Наблюдательный Полк</title>
            </Helmet>
            <Grid container
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent="space-between"
            >
                <Grid item>
                    <Typography className={classes.header} variant="h6" align="center" >Общее кол-во проголосовавших по Республики </Typography>
                </Grid>
                <Grid item>
                    <BreadCrumbs />
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
                                <Grid item xs={9} >
                                    <Typography className={classes.headerSm} variant="subtitle1" align="center"  >График количества проголосовавших</Typography>
                                </Grid>
                                <Grid item xs={12} style={{ width: dimensions?.width, height: "auto" }} >

                                    {data?.data?.votes_data ? <Chart data={data?.data?.votes_data} status={status} electors={data?.data?.electors} /> : <div className="loading-spin">
                                        <img src={Loading} alt="loading" />
                                    </div>}
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>

                }

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
                                    <Typography className={classes.headerSm} variant="subtitle1" align="center"  >Инфо по районам</Typography>
                                </Grid>
                                <Grid item xs={12} style={{ width: dimensions?.width, height: "auto" }} >

                                    <KalmMap districts={data?.data?.districts} status={props.status} />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                }

                {dimensions &&
                    <Grid item xs={12} style={{ width: dimensions?.width, height: "auto", marginBottom: "2em" }}  >
                        <Card>
                            <Grid container
                                spacing={3}
                                direction="column"
                                alignItems="center"
                                justifyContent="space-between">
                                <Grid item xs={12}>
                                    <Typography className={classes.headerSm} align="center" variant="subtitle1">Общее кол-во проголосовавших по ТИКам</Typography>
                                </Grid>
                                <Grid xs={12} item>
                                    <TableComponent districts={data?.data?.districts} status={status} history={props.history} />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>

                }

            </Grid>
        </Container>
    )
}

export default LandingPage

