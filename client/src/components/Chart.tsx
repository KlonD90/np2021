import React, { useEffect, useState } from 'react'
import { ComposedChart, Bar, XAxis, YAxis, Line, Tooltip, CartesianGrid, ReferenceArea, ReferenceLine, ResponsiveContainer, Legend, } from 'recharts';
import { format, parseISO } from 'date-fns';
import '../styles/chart.css';

//how to make reference line https://github.com/recharts/recharts/issues/817
const Chart = (props: any) => {
    const [render, setRender] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setRender(true)
        }, 50)
        return () => {
            setRender(false)
        }
    }, [])
    return (
        <ResponsiveContainer className="chart-container" width="100%" height="70%" aspect={2}>
            {
                props.data && render === true ?
                    <ComposedChart
                        data={props.data}
                        margin={{
                            top: 0,
                            // right: 20,
                            // left: 10,
                            bottom: 0,
                        }}
                    >
                        <Legend className="fontName" verticalAlign="bottom" align="center" />
                        <defs>
                            <linearGradient id="color" x1="0" y1="0" x2="0" y2="01" >
                                <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4}>
                                </stop>
                                <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05}>
                                </stop>
                            </linearGradient>
                        </defs>
                        <Line dot={false} name="НП" dataKey="amount" stroke="green" />
                        <XAxis
                            fontFamily={'Open Sans, sans-serif'}
                            angle={-50}
                            interval="preserveEnd"
                            dataKey="vote_date"
                            tickMargin={2}
                            tickFormatter={str => {
                                const date = parseISO(str)
                                return format(date, "HH")
                            }} />
                        {props.electors ?
                            <YAxis
                                fontFamily={'Open Sans, sans-serif'}
                                dataKey="amount"
                                domain={[0, (dataMax: any) => (props.electors)]}
                                interval="preserveEnd"
                            /> :
                            <YAxis
                                fontFamily={'Open Sans, sans-serif'}
                                dataKey="amount"
                                interval="preserveEnd"
                            />}

                        <Bar
                            name="оф. данныe"
                            fontFamily={'Open Sans, sans-serif'}
                            dataKey="amount_official"
                            fill="red"
                            opacity="1"
                        />

                        {props.data.map((votesData: any) => {
                            if (votesData.vote_date === "2021-09-10 09:00:00") {
                                return <ReferenceLine className="fontName" x="2021-09-10 09:00:00" fill="white" label={{ value: "17 Сентябя", position: "right", fontStyle: "open sans", fontWeight: 300, fontSize: 5, }} alwaysShow={true} />
                            } else if (votesData.vote_date === "2021-09-11 09:00:00") {
                                return <ReferenceLine className="fontName" x="2021-09-11 09:00:00" x2="2021-09-11 20:00:00" fill="rgba(186, 184, 184, 0.7)" label={{ value: "18 Сентябя", position: "right", fontStyle: "open sans", fontWeight: 300, fontSize: 5 }} alwaysShow={true} />
                            } else if (votesData.vote_date === "2021-09-12 09:00:00") {
                                return <ReferenceLine className="fontName" x="2021-09-12 09:00:00" x2="2021-09-12 20:00:00" fill="rgba(143, 135, 135, 0.7)" label={{ value: "19 Сентябя", position: "right", fontStyle: "open sans", fontWeight: 300, fontSize: 5 }} alwaysShow={true} />
                            }
                        })
                        }

                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                    </ComposedChart>

                    :
                    <p>{props.status}</p>
            }
        </ResponsiveContainer>
    );
}

export default Chart
//     if (votesData.amount && votesData.amount_official) {
//         return <ReferenceLine x={votesData.vote_date} stroke="blue" label="" />

//     }
// })}


// ticks={["9:00, 17.09",
// "10:00, 17.09",
// "11:00, 17.09",
// "12:00, 17.09",
// "13:00, 17.09",
// "14:00, 17.09",
// "15:00, 17.09",
// "16:00, 17.09",
// "17:00, 17.09",
// "18:00, 17.09",
// "19:00, 17.09",
// "20:00, 17.09",
// "9:00, 18.09",
// "10:00, 18.09",
// "11:00, 18.09",
// "12:00, 18.09",
// "13:00, 18.09",
// "14:00, 18.09",
// "15:00, 18.09",
// "16:00, 18.09",
// "17:00, 18.09",
// "18:00, 18.09", "19:00, 18.09", "20:00, 18.09",
// "9:00, 19.09", "10:00, 19.09", "11:00, 19.09",
// "12:00, 19.09", "13:00, 19.09", "14:00, 19.09",
// "15:00, 19.09", "16:00, 19.09", "17:00, 19.09",
// "18:00, 19.09", "19:00, 19.09", "20:00, 19.09"]}