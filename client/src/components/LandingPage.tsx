import React, { useState, useEffect, useRef } from 'react';
import { Typography, Container, Grid, Card, } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import '../styles/chart.css';
import { useQuery } from 'react-query';
import axios from '../api';
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
    const chartNode = useRef(null)
    const dimensions = useResizeObserver(chartNode)
    const classes = useStyles();
    const dispatch = useDispatch();
    const fetchData = async () => {
        const res: any = await axios.get('/republic/');
        dispatch(getDistrictsData(res?.data?.districts))
        return res
    }

    const fetchCommonData = async () => {
        const res: any = await axios.get('/common_info/');
        return res
    }

    const { data: commonData } = useQuery('commoninfo', fetchCommonData)


    const { data, status } = useQuery('republic', fetchData, { refetchInterval })
    useEffect(() => {
        // setTest(data?.data?.votes_data.slice(0, 10))
        setRefetchInterval(6000)
        return () => {
            setRefetchInterval(10000000)
        }
    }, [])

    return (
        <Container maxWidth="md" ref={chartNode} className={classes.container} style={{marginTop: '120px'}}>
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
                    <div className={classes.header}>{commonData ? (commonData?.data?.amount * 1).toString().split('').reverse().reduce<string[]>((r, c, i) => {r.push(c); if (i%3 === 2) { r.push(' ');} return r;}, []).reverse().join('') : 0}</div>
                    <div className={classes.hInfo}>всего проголосовало по данным НП<br/>по состоянию на {commonData ? commonData?.data?.last_update : status}</div>
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
                                    <Typography className={classes.headerSm} variant="subtitle1" align="center"  >Информация по районам</Typography>
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
                                <Grid xs={12} item>
                                    <TableComponent districts={data?.data?.districts} status={status} history={props.history} caption="Общее количество проголосовавших по ТИКам"/>
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

