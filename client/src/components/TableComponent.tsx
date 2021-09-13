import React, { useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell } from '@material-ui/core';
import { useStyles } from '../styles/CustomStyles'

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
            <Table className={classes.table} size="medium" aria-label="simple table" padding={767 > width ? "none" : "normal"} >
                <TableHead>
                    {props.districts || props.uiks ? <TableRow  >
                        <TableCell align="center">
                            ТИК
                        </TableCell>
                        <TableCell align="center">
                            Кол-во голосов
                        </TableCell>
                        <TableCell align="center">
                            Кол-во голосов(официально)
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
                        props.history.push({
                            pathname: '/tk/:id',
                            search: `?tiknum=${dist.tiknum}&tikName=${dist.tik_name}`
                        })
                    }} key={dist.tiknum}>
                        <TableCell align="right">{dist.tik_name}</TableCell>
                        <TableCell align="center">{dist.votes}</TableCell>
                        <TableCell align="center">{dist.official ? dist.official : <p>нет данных</p>}</TableCell>
                        <TableCell align="center">
                            Перейти на страницу ТИКа
                        </TableCell>
                    </TableRow>
                }) : props.uiks ? props.uiks.map((uik: any) => {
                    return <TableRow className={classes.hoverEffect} onClick={() => {
                        props.history.push({
                            pathname: '/uik/:id',
                            search: `?uikId=${uik.uik_id}&uikName=${uik.uik_name}&tikName=${props.tikName}&tikNum=${props.tikNumber}`
                        })
                    }} key={uik.uik_id}>
                        <TableCell align="right">{uik.uik_name}</TableCell>
                        <TableCell align="right">{uik.votes_amount}</TableCell>
                        <TableCell align="center">{uik.official ? uik.official : <p>нет данных</p>}</TableCell>
                        <TableCell align="center">
                            Перейти на страницу УИКа
                        </TableCell>
                    </TableRow>
                }) : props.issues ? props.issues.map((issue: any) => {
                    return <TableRow key={issue.registered_time}>
                        <TableCell align="center">{issue.registered_time}</TableCell>
                        <TableCell align="center">{issue.description}</TableCell>
                    </TableRow>
                }) : <p>{props.status}</p>

                }
            </Table>
        </TableContainer>
    )
}

export default TableComponent


