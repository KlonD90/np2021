import React from 'react'
import { ComposedChart, Bar, XAxis, YAxis, Line, Tooltip, CartesianGrid, ReferenceArea, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { format, parseISO } from 'date-fns';
import '../styles/chart.css';

//how to make reference line https://github.com/recharts/recharts/issues/817

const Chart = (props: any) => {
    return (
        <ResponsiveContainer className="chart-container" width="100%" aspect={1.2}>
            {
                props.data ?
                    <ComposedChart
                        width={600}
                        height={400}
                        data={props.data}
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
                        <Line name="кол-во проголосовавших по данным НП" dataKey="amount" stroke="green" fill="url(#color)" activeDot={{ r: 6 }} />

                        <XAxis
                            fontFamily={'Roboto, sans-serif'}
                            angle={-50}
                            interval="preserveEnd"
                            dataKey="vote_date"
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
                            if (votesData.vote_date === "2021-09-10 20:00:00") {
                                return <ReferenceArea className="fontName" x1="2021-09-10 09:00:00" x2="2021-09-10 20:00:00" fill="yellow" label={{ value: "17 Сентябя" }} />
                            } else if (votesData.vote_date === "2021-09-11 09:00:00") {
                                return <ReferenceArea className="fontName" x1="2021-09-11 09:00:00" x2="2021-09-11 20:00:00" fill="blue" label={{ value: "18 Сентябя" }} />
                            } else if (votesData.vote_date === "2021-09-12 09:00:00") {
                                return <ReferenceArea className="fontName" x1="2021-09-12 09:00:00" x2="2021-09-12 20:00:00" fill="white" label={{ value: "19 Сентябя" }} />
                            }
                        })
                        }
                        {props.data.map((votesData: any) => {
                            if (votesData.amount && votesData.amount_official) {
                                return <ReferenceLine x={votesData.vote_date} stroke="blue" label="" />

                            }
                        })}
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                        <Legend className="fontName" wrapperStyle={{ position: 'relative', marginTop: '0.5em' }} />
                    </ComposedChart>

                    :
                    <p>{props.sstatus}</p>
            }
        </ResponsiveContainer>
    );
}

export default Chart

{/* <div className='chart-container' ref={containerRef} style={{ width: "100%", overflow: "hidden" }}> */ }