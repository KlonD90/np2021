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
                    {props.districts ? <TableRow  >
                        <TableCell align="center">
                            <p>   ТИК</p>
                        </TableCell>
                        <TableCell align="center">
                            <p>голоса:<b>НП</b>/<span className="italic">официально</span></p>
                        </TableCell>
                    </TableRow> : props.uiks ? <TableRow> <TableCell align="center">
                        <p>УИК</p>
                    </TableCell>
                        <TableCell align="center">
                            <p>Адрес</p>
                        </TableCell>
                        <TableCell align="center">
                            <p>голоса:<b> НП</b>/<span className="italic">официально</span></p>
                        </TableCell>
                    </TableRow> : props.issues && props.issues.length > 0 ? <TableRow  >
                        <TableCell align="center">
                            Время
                        </TableCell>
                        <TableCell align="center">
                            Описание нарушения
                        </TableCell>
                    </TableRow> : <p>Нарушений не зафиксировано</p>}
                </TableHead>
                {props.districts ? props.districts.map((dist: any) => {
                    return <TableRow className={classes.hoverEffect} onClick={() => {
                        props.history.push(`/tk/${dist.tiknum}`)
                    }} key={dist.tiknum}>
                        <TableCell align="left"><p className="cell underline">{dist.tik_name}</p></TableCell>
                        <TableCell align="left"><p className="cell"><b>{dist.votes}</b>/<span className="italic">{dist.official ? dist.official : "—"}</span></p></TableCell>
                    </TableRow>
                }) : props.uiks ? props.uiks.map((uik: any) => {
                    const shortAddress = uik.address.split(',').slice(3,).join()
                    return <TableRow className={classes.hoverEffect} onClick={() => {
                        props.history.push(`/uik/${props.tikNum}/${uik.uik_id}`)
                    }} key={uik.uik_id}>
                        <TableCell align="left"><p className="cell underline">УИК№{uik.uik_id}</p></TableCell>
                        <TableCell align="left"><p className="cell underline">{shortAddress}</p></TableCell>
                        <TableCell align="left"><p className="cell"><b>{uik.votes_amount}</b>/<span className="italic">{uik.official ? uik.official : "—"}</span></p></TableCell>

                    </TableRow>
                }) : props.issues ? props.issues.map((issue: any) => {
                    return <TableRow key={issue.registered_time}>
                        <TableCell align="left"><p className="cell">{format(parseISO(issue.registered_time), "dd:MM, HH")}</p></TableCell>
                        <TableCell align="left"><p className="cell">{issue.description}</p></TableCell>
                    </TableRow>
                }) : <p>{props.status}</p>

                }
            </Table>
        </TableContainer>
    )
}

export default TableComponent


