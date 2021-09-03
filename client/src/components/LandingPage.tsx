import React, { useEffect, useState } from 'react';
import { Typography, Container, Grid, Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell } from '@material-ui/core';
import '../styles/landingpg.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import Logo from '../images/np_logo.png'
import { makeStyles } from '@material-ui/styles';
import { classicNameResolver } from 'typescript';

const useStyles = makeStyles({
    table: {
        width: "100%",
        display: 'block',
        overflowX: 'auto'
    }
})

const LandingPage = (props: any) => {
    const classes = useStyles();
    const fetchData = async () => {
        const res: any = await axios.get('/republic/');
        return res
    }

    const { data, status } = useQuery('republic', fetchData)
    console.log(status)
    console.log(data?.data)


    // const { data, status } = useQuery('http://77.222.63.32:8080/republic/', fetchData)
    // console.log(data)
    // console.log(data?.data.data)
    // console.log(status)
    return (
        <Container maxWidth="md">
            <main className="landing-pg">
                <Box>
                    <img src={Logo} />
                </Box>
                <Grid container
                    spacing={2}
                    direction="column"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Grid item
                        xs={12}
                    >
                        информационная панель
                    </Grid>
                    <Grid item
                        xs={12}
                    >
                        график

                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} size="small" aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">
                                            ТИК
                                        </TableCell>
                                        <TableCell align="right">
                                            Кол-во голосов
                                        </TableCell>
                                        <TableCell align="right">
                                            Кол-во голосов(официально)
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                {data ? data?.data?.districts.map((dist: any) => {
                                    return <TableRow key={dist.tiknum}>
                                        <TableCell align="right">{dist.tik_name}</TableCell>
                                        <TableCell align="right">{dist.votes}</TableCell>
                                        <TableCell align="right">{dist.official ? dist.official : <p>нет данных</p>}</TableCell>
                                    </TableRow>
                                }) : <p>Loading</p>}
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </main>
        </Container>
    )
}

export default LandingPage