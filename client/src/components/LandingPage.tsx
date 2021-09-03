import React, { useEffect, useState } from 'react';
import { Typography, Container, Grid, Box, } from '@material-ui/core';
import '../styles/landingpg.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import Logo from '../images/np_logo.png'



const LandingPage = () => {
    const fetchData = async () => {
        const res: any = await axios.get('/republic/');
        return res
    }

    const { data, status } = useQuery('republic', fetchData)
    console.log('hey')
    console.log(status)
    console.log(data)


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
                        карта калмыкии
                    </Grid>
                    <Grid item
                        xs={12}
                    >
                        сводная таблица по тикам
                        лист всех тиков гипперссылками

                    </Grid>
                </Grid>
            </main>
        </Container>
    )
}

export default LandingPage