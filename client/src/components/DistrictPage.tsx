import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Typography, Container, Grid, Card } from '@material-ui/core';
import { useQuery } from 'react-query';
import axios from '../api';
import Chart from './Chart';
import TableComponent from './TableComponent';
import { useResizeObserver } from './useResizeObserver';
import { useStyles } from '../styles/CustomStyles';
import BreadCrumbs from './BreadCrumbs';


const DistrictPage = (props: any) => {
    const classes = useStyles();
    const chartNode = useRef(null);
    const dimensions = useResizeObserver(chartNode)
    const [refetchInterval, setRefetchInterval] = useState(6000);
    const fetchData = async () => {
        const res: any = await axios.get(`/get_tik/${props.match.params.id}`);
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
        <Container className={classes.container} maxWidth="md" ref={chartNode}>
            <Helmet>
                <title>{data?.data?.data?.tik_name}</title>
            </Helmet>
            <Grid container
                spacing={3}
                direction="column"
                alignItems="center"
                justifyContent="space-between"
            >
                <Grid item>
                    <BreadCrumbs tikNum={props.match.params.id} />
                </Grid>
                {dimensions &&
                    <Grid item xs={12} style={{ width: dimensions?.width, height: "auto" }} >
                            <Grid
                                style={{ width: dimensions?.width, height: "auto" }}
                                container
                                spacing={3}
                                direction="column"
                                alignItems="center"
                                justifyContent="space-between">
                                <Grid item xs={12} >
                                    <Typography className={classes.headerSm} variant="subtitle1" align="center"  >???????????? ???????????????????? ??????????????????????????????</Typography>
                                </Grid>
                                <Grid item xs={12} style={{ width: dimensions?.width, height: "auto" }} >

                                    <Chart data={data?.data?.data?.votes_data} status={status} electors={data?.data?.data?.electors} />
                                </Grid>
                            </Grid>
                    </Grid>

                }

                {dimensions &&
                    <Grid item xs={12} style={{ width: dimensions?.width, height: "auto" }}  >
                            <Grid container
                                spacing={3}
                                direction="column"
                                alignItems="center"
                                justifyContent="space-between">
                                <Grid xs={12} item>
                                    <TableComponent tikNum={props.match.params.id} uiks={data?.data?.data?.summary_data} status={status} history={props.history} caption="?????????? ??????-???? ?????????????????????????????? ???? ??????????"/>
                                </Grid>
                            </Grid>
                    </Grid>

                }

            </Grid>
        </Container>
    )
}

export default DistrictPage