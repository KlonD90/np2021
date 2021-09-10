import React, { useEffect, useState } from 'react'
import { ComposedChart, Bar, XAxis, YAxis, Line, Tooltip, CartesianGrid, ReferenceArea, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { format, parseISO } from 'date-fns';
import '../styles/chart.css';

//how to make reference line https://github.com/recharts/recharts/issues/817
const Chart = (props: any) => {
    const [chartData, setChartData] = useState([])
    useEffect(() => {
        if (props.data) {
            let i = 1;
            const formattedData = props.data.map((votesData: any) => {
                return {
                    ...votesData,
                    vote_date: [i++, votesData.vote_date]
                }
            })
            setChartData(formattedData)
        }
    }, [props.data])

    return (
        <ResponsiveContainer className="chart-container" width="100%" height="70%" aspect={2}>
            {
                chartData.length > 0 ?
                    <ComposedChart
                        width={600}
                        height={400}
                        data={chartData}
                        margin={{
                            top: 0,
                            right: 30,
                            left: 20,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="color" x1="0" y1="0" x2="0" y2="01" >
                                <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4}>
                                </stop>
                                <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05}>
                                </stop>
                            </linearGradient>
                        </defs>
                        <Line dot={false} name="кол-во проголосовавших по данным НП" dataKey="amount" stroke="green" />
                        <XAxis
                            fontFamily={'Roboto, sans-serif'}
                            angle={-50}
                            interval="preserveEnd"
                            dataKey="vote_date[1]"
                            tickMargin={12}
                            tickFormatter={str => {
                                const date = parseISO(str)
                                return format(date, "HH")
                            }} />
                        {props.electors ?
                            <YAxis
                                fontFamily={'Roboto, sans-serif'}
                                dataKey="amount"
                                domain={[0, (dataMax: any) => (props.electors)]}
                                interval="preserveEnd"
                            /> :
                            <YAxis
                                dataKey="amount"
                                fontFamily={'Roboto, sans-serif'}
                            />}
                        <Bar
                            name="кол-во проголосовавших по оф. данным"
                            fontFamily={'Roboto, sans-serif'}
                            dataKey="amount_official"
                            fill="red"
                            opacity="1"
                        />

                        {props.data.map((votesData: any) => {
                            const time = votesData.vote_date
                            if (votesData.vote_date === "2021-09-10 20:00:00") {
                                return <ReferenceArea className="fontName" x1="2021-09-10 09:00:00" x2="2021-09-10 20:00:00" fill="yellow" label={{ value: "17 Сентябя" }} />
                            } else if (votesData.vote_date === "2021-09-11 09:00:00") {
                                return <ReferenceArea className="fontName" x1="2021-09-11 09:00:00" x2="2021-09-11 20:00:00" fill="blue" label={{ value: "18 Сентябя" }} />
                            } else if (votesData.vote_date === "2021-09-12 09:00:00") {
                                return <ReferenceArea className="fontName" x1="2021-09-12 09:00:00" x2="2021-09-12 20:00:00" fill="white" label={{ value: "19 Сентябя" }} />
                            }
                        })
                        }
                        <Legend className="fontName" />
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

{/* <div className='chart-container' ref={containerRef} style={{ width: "100%", overflow: "hidden" }}> */ }

// {props.data.map((votesData: any) => {
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