import React from 'react';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell } from '@material-ui/core';
import { useStyles } from '../styles/CustomStyles'

const TableComponent = (props: any) => {
    const classes = useStyles();
    console.log(props.districts)
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
                    return <TableRow className={classes.hoverEffect} onClick={() => {
                        props.history.push({
                            pathname: '/tk/:id',
                            search: `?tiknum=${dist.tiknum}`
                        })
                    }} key={dist.tiknum}>
                        <TableCell align="right">{dist.tik_name}</TableCell>
                        <TableCell align="right">{dist.votes}</TableCell>
                        <TableCell align="right">{dist.official ? dist.official : <p>нет данных</p>}</TableCell>
                    </TableRow>
                }) : props.uiks ? props.uiks.map((uik: any) => {
                    return <TableRow className={classes.hoverEffect} onClick={() => {
                        props.history.push({
                            pathname: '/uik/:id',
                            search: `?uikId=${uik.uik_id}`
                        })
                    }} key={uik.uik_id}>
                        <TableCell align="right">{uik.uik_name}</TableCell>
                        <TableCell align="right">{uik.votes_amount}</TableCell>
                        <TableCell align="right">{uik.official ? uik.official : <p>нет данных</p>}</TableCell>
                    </TableRow>
                }) : <p>{props.status}</p>

                }
            </Table>
        </TableContainer>
    )
}

export default TableComponent


