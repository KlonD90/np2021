import React, { useEffect, useState } from 'react';
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
    return (
        <table className='issue-table'>
            <caption>{props.caption}</caption>
            {props.districts
                ? <colgroup>
                    <col span={1} style={{width: '50%'}} />
                    <col span={1} style={{width: '50%'}} />
                </colgroup>
                : props.uiks
                    ? <colgroup>
                        <col span={1} style={{width: '25%'}} />
                        <col span={1} style={{width: '50%'}} />
                        <col span={1} style={{width: '25%'}} />
                    </colgroup>
                    : props.issues && props.issues.length > 0
                        ? <colgroup>
                            <col span={1} style={{width: '20%'}} />
                            <col span={1} style={{width: '75%'}} />
                        </colgroup>
                        : <colgroup>
                            <col span={1} style={{width: '100%'}} />
                        </colgroup>}
            {props.districts 
                ? <tr>
                    <th>ТИК</th>
                    <th>голоса: НП/официально</th>
                </tr> 
                : props.uiks 
                    ? <tr>
                        <th>УИК</th>
                        <th>адрес</th>
                        <th>голоса</th>
                    </tr> 
                    : props.issues && props.issues.length > 0 
                        ? <tr>
                            <th>дата</th>
                            <th>описание</th>
                        </tr> 
                        : <p>Нарушений не зафиксировано</p>}
            {props.districts 
                ? props.districts.map((dist: any) => {return(
                <tr className="issue-table__row_clickable" onClick={() => {props.history.push(`/tk/${dist.tiknum}`)}} key={dist.tiknum}>
                    <td><span>{dist.tik_name}</span></td>
                    <td><span>{dist.votes}&nbsp;/ {dist.official ? dist.official : "—"}</span></td>
                </tr>)})
                : props.uiks
                    ? props.uiks.map((uik: any) => {
                        const shortAddress = uik.address.split(',').slice(3,).join()
                        return (
                        <tr className="issue-table__row_clickable" onClick={() => {props.history.push(`/uik/${props.tikNum}/${uik.uik_id}`)}} key={uik.uik_id}>
                           <td><span>УИК №{uik.uik_id}</span></td> 
                           <td><span>{shortAddress}</span></td> 
                           <td><span>{uik.votes_amount}&nbsp;/ {uik.official ? uik.official : "—"}</span></td> 
                        </tr>)})
                    : props.issues
                        ? props.issues.map((issue: any) => {return (
                        <tr key={issue.registered_time}>
                            <td><span>{format(parseISO(issue.registered_time), "yyyy:MM:dd, HH:mm:ss")}</span></td>
                            <td><span>{issue.description}</span></td>
                        </tr>)})
                        : <p>{props.status}</p>}
        </table>
    )
}

export default TableComponent


