import React from 'react';
import { Typography, Container, Grid, Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles({
    table: {
        width: "100%",
        display: 'block',
        overflowX: 'auto'
    }
})

const TableComponent = (props: any) => {
    const classes = useStyles();
    return (
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
                {props.districts ? props.districts.map((dist: any) => {
                    return <TableRow onClick={() => {
                        props.history.push({
                            pathname: '/tk/:id',
                            search: `?tiknum=${dist.tiknum}`
                        })
                    }} key={dist.tiknum}>
                        <TableCell align="right">{dist.tik_name}</TableCell>
                        <TableCell align="right">{dist.votes}</TableCell>
                        <TableCell align="right">{dist.official ? dist.official : <p>нет данных</p>}</TableCell>
                    </TableRow>
                }) : <p>{props.status}</p>}
            </Table>
        </TableContainer>
    )
}

export default TableComponent