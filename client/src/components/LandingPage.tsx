import React, { useState, useEffect, useRef } from 'react';
import { Typography, Container, Grid, Paper, Card } from '@material-ui/core';
import '../styles/chart.css'
import { useQuery } from 'react-query';
import axios from 'axios';
import Chart from './Chart';
import TableComponent from './TableComponent';
import { useStyles } from '../styles/CustomStyles';
import KalmMap from './KalmMap';
import { useResizeObserver } from './useResizeObserver';


const LandingPage = (props: any) => {
    const [refetchInterval, setRefetchInterval] = useState(6000);
    const chartNode = useRef(null)
    const dimensions = useResizeObserver(chartNode)
    const classes = useStyles();
    const fetchData = async () => {
        const res: any = await axios.get('/republic/');
        return res
    }
    // console.log(dimensions)
    const { data, status } = useQuery('republic', fetchData, { refetchInterval })
    useEffect(() => {
        setRefetchInterval(6000)
        return () => {
            setRefetchInterval(10000000)
        }
    }, [])
    const [width, setWidth] = useState(0)
    useEffect(() => {
        setWidth(window.innerWidth)
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth)
        })
    }, [])
    return (
        <Container maxWidth="md" ref={chartNode}>
            <Grid container
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent="space-between"
            >
                <Grid item>
                    <Typography className={classes.header} variant="h4" align="center" >Общее кол-во проголосовавших по Республики </Typography>
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
                                    <Typography variant="h6" align="center"  >График количества проголосовавших</Typography>
                                </Grid>
                                <Grid item xs={width < 767 ? 12 : 9} style={{ width: dimensions?.width, height: "auto" }} >

                                    <Chart data={data?.data?.votes_data} status={status} electors={data?.data?.electors} />
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
                                    <Typography variant="h6" align="center"  >Инфо по районам</Typography>
                                </Grid>
                                <Grid item xs={12} style={{ width: dimensions?.width, height: "auto" }} >

                                    <KalmMap districts={data?.data?.districts} />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                }

                {dimensions &&
                    <Grid item xs={9} style={{ width: dimensions?.width, height: "auto", marginBottom: "2em" }}  >
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

