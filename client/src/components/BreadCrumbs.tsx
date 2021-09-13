import React from 'react';
import { withRouter } from 'react-router';
import { Breadcrumbs, Typography, Link } from '@material-ui/core';
import { useStyles } from '../styles/CustomStyles';
import queryString from 'query-string';


const BreadCrumbs = (props: any) => {
    const classes = useStyles()
    const { history, location, match } = props
    const name = queryString.parse(location.search)
    return (
        <Breadcrumbs className={classes.breadcrumbs}>
            <Link color="inherit"><Typography>Главная</Typography></Link>
            <Link onClick={() => {
                history.goBack()
            }} color="inherit"><Typography>{name.tikName}</Typography></Link>
            <Link color="inherit"><Typography>{name.uikName}</Typography></Link>
        </Breadcrumbs>
    )
}

export default withRouter(BreadCrumbs);