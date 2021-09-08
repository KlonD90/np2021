import React, { useRef } from 'react'
import { AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid, ReferenceArea, ResponsiveContainer, Legend } from 'recharts';
import { format, parseISO } from 'date-fns';
import '../styles/chart.css';

//how to make reference line https://github.com/recharts/recharts/issues/817

const Chart = (props: any) => {
    console.log(props.data)
    return (
        <ResponsiveContainer width="100%" aspect={1.5}>
            {
                props.data ?
                    <AreaChart
                        width={600}
                        height={400}
                        data={props.data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 10,
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
                        <Area name="кол-во проголосовавших по данным НП" dataKey="amount" stroke="black" fill="url(#color)" />
                        <Area name="кол-во проголосовавших по оф. данным" dataKey="amount_official" stroke="red" fill="url(#color)" />
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
                            <YAxis dataKey="amount"
                                fontFamily={'Roboto, sans-serif'}
                            />}
                        <YAxis
                            fontFamily={'Roboto, sans-serif'}
                            dataKey="amount_official"
                            interval="preserveEnd"
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
                        <Tooltip />
                        <CartesianGrid opacity={0.9} vertical={false} />
                        <Legend className="fontName" wrapperStyle={{ position: 'relative', marginTop: '0.5em' }} />
                    </AreaChart>

                    :
                    <p>{props.sstatus}</p>
            }
        </ResponsiveContainer>
    );
}

export default Chart

{/* <div className='chart-container' ref={containerRef} style={{ width: "100%", overflow: "hidden" }}> */ }