import React, { useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell } from '@material-ui/core';
import { useStyles } from '../styles/CustomStyles'
import { format, parseISO } from 'date-fns';
import '../styles/table.css'

const TableComponent = (props: any) => {
    const [width, setWidth] = useState(0)
    useEffect(() => {
        setWidth(window.innerWidth)
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth)
        })
    }, [])
    const classes = useStyles();
    return (
        <TableContainer>
            <Table className={classes.table} size="medium" aria-label="simple table" padding={767 > width && props.history.location.pathname !== '/uik/:id' ? "none" : "normal"} >
                <TableHead>
                    {props.districts || props.uiks ? <TableRow  >
                        <TableCell align="center">
                            <p>   ТИК</p>
                        </TableCell>
                        <TableCell align="center">
                            <p>  Кол-во голосов</p>
                        </TableCell>
                        <TableCell align="center">
                            <p>   Кол-во голосов(официально)</p>
                        </TableCell>
                    </TableRow> : <TableRow  >
                        <TableCell align="center">
                            Время
                        </TableCell>
                        <TableCell align="center">
                            Описание нарушения
                        </TableCell>
                    </TableRow>}
                </TableHead>
                {props.districts ? props.districts.map((dist: any) => {
                    return <TableRow className={classes.hoverEffect} onClick={() => {
                        props.history.push(`/tk/${dist.tiknum}`)
                    }} key={dist.tiknum}>
                        <TableCell align="right"><p className="underline">{dist.tik_name}</p></TableCell>
                        <TableCell align="center"><p>{dist.votes}</p></TableCell>
                        <TableCell align="center"><p>{dist.official ? dist.official : "нет данных"}</p></TableCell>
                    </TableRow>
                }) : props.uiks ? props.uiks.map((uik: any) => {
                    return <TableRow className={classes.hoverEffect} onClick={() => {
                        props.history.push(`/uik/${uik.uik_id}`)
                    }} key={uik.uik_id}>
                        <TableCell align="right"><p className="underline">{uik.uik_name}</p></TableCell>
                        <TableCell align="right"><p>{uik.votes_amount}</p></TableCell>
                        <TableCell align="center"><p >{uik.official ? uik.official : "нет данных"}</p> </TableCell>
                    </TableRow>
                }) : props.issues ? props.issues.map((issue: any) => {
                    return <TableRow key={issue.registered_time}>
                        <TableCell align="left"><p>{format(parseISO(issue.registered_time), "dd:MM, HH")}</p></TableCell>
                        <TableCell align="left"><p>{issue.description}</p></TableCell>
                    </TableRow>
                }) : <p>{props.status}</p>

                }
            </Table>
        </TableContainer>
    )
}

export default TableComponent


