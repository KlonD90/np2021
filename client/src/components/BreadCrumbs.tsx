import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Breadcrumbs, Typography, Link, } from '@material-ui/core';
import { useStyles } from '../styles/CustomStyles';
import { useSelector } from 'react-redux';

const BreadCrumbs = (props: any) => {
    const classes = useStyles()
    const { history, tikNum } = props
    const districts = useSelector((state: any) => state.districts)
    const tikName = districts.filter((dist: any) => dist.tiknum === parseInt(tikNum))[0]
    // console.log(tikName.tik_name)
    console.log(districts)
    return (
        <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
            <Link className={classes.link} color="inherit" onClick={() => {
                history.push('/')
            }}><Typography><p>Главная</p></Typography></Link>
            {tikName && <Link className={classes.link} onClick={() => {
                history.goBack()
            }} color="inherit" ><Typography><p>{tikName.tik_name}</p></Typography></Link>}
            {props.uikName && <Link className={classes.link} color="inherit"><Typography><p>{props.uikName}</p></Typography></Link>}
        </Breadcrumbs>
    )
}

export default withRouter(BreadCrumbs);