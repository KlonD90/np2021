import React from 'react';
import { withRouter } from 'react-router';
import { Breadcrumbs, Typography, Link } from '@material-ui/core';
import { useStyles } from '../styles/CustomStyles';
import { useSelector } from 'react-redux';
import queryString from 'query-string';
import { Helmet } from 'react-helmet';

const BreadCrumbs = (props: any) => {
    const classes = useStyles()
    const { history, location } = props
    const name = queryString.parse(location.search)
    const districts = useSelector((state: any) => state.districts)
    const tikNum = parseInt(location.pathname.split('/')[2])
    const tikName = districts.filter((dist: any) => dist.tiknum === tikNum)[0]
    return (
        <Breadcrumbs className={classes.breadcrumbs}>
            <Helmet>
                <title>{name.tikName ? name.tikName : name.uikName ? name.uikName : "Наблюдательный Полк"}</title>
            </Helmet>
            <Link color="inherit" onClick={() => {
                history.push('/')
            }}><Typography>Главная</Typography></Link>
            <Link onClick={() => {
                history.goBack()
            }} color="inherit"><Typography>{tikName && tikName.tik_name}</Typography></Link>
            <Link color="inherit"><Typography>{name.uikName}</Typography></Link>
        </Breadcrumbs>
    )
}

export default withRouter(BreadCrumbs);