import React, { useState, useEffect, useRef } from 'react';
import { Typography, Container, Grid, Card } from '@material-ui/core';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Chart from './Chart';
import { useResizeObserver } from './useResizeObserver';
import { useStyles } from '../styles/CustomStyles';
import TableComponent from './TableComponent';
import BreadCrumbs from './BreadCrumbs';

const PollingPage = (props: any) => {
    const [refetchInterval, setRefetchInterval] = useState(6000);
    const chartNode = useRef(null)
    const dimensions = useResizeObserver(chartNode)
    const classes = useStyles();
    const uikId = props.match.params.id
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
    // const [width, setWidth] = useState(0)
    // useEffect(() => {
    //     setWidth(window.innerWidth)
    //     window.addEventListener('resize', () => {
    //         setWidth(window.innerWidth)
    //     })
    // }, [])
    return (
        <Container className={classes.container} maxWidth="md" ref={chartNode}>
            <Helmet>
                <title>{data?.data?.data?.uik_name}</title>
            </Helmet>
            <Grid container
                spacing={3}
                direction="column"
                alignItems="center"
                justifyContent="space-between"
            >
                <Grid item>
                    <BreadCrumbs uikName={data?.data?.data?.uik_name} tikNum={data?.data?.data?.parent_id} />
                </Grid>
                <Grid item>
                    <Typography className={classes.header} variant="h6" align="center" >{data?.data?.data?.uik_name}</Typography>
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
                                    <Typography variant="subtitle1" className={classes.headerSm} align="center"  >График количества проголосовавших</Typography>
                                </Grid>
                                <Grid item xs={12} style={{ width: dimensions?.width, height: "auto" }}  >

                                    <Chart data={data?.data?.data?.votes_data} status={status} electors={data?.data?.data?.electors} />
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
                                    <Typography className={classes.headerSm} align="center" variant="subtitle1">Список нарушений</Typography>
                                </Grid>
                                <Grid xs={12} item>
                                    <TableComponent issues={data?.data?.data?.issues} status={status} history={props.history} />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>

                }


            </Grid>
        </Container>
    )
}

export default PollingPage