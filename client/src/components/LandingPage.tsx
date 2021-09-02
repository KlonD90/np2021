import React from 'react';
import { Typography, Container, Grid } from '@material-ui/core';
import '../styles/landingpg.css'

const LandingPage = () => {

    return (
        <Container maxWidth="md">
            <main className="landing-pg">
                <Typography
                    variant="h6"
                    component="h1"
                    gutterBottom
                    align="center"
                >
                    Наблюдательный Полк 2021 (Калмыкия
                </Typography>
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