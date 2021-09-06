import React, { useRef } from 'react'
import { useElementSize } from './ResizeHook';
import { AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid, ReferenceArea, ResponsiveContainer, Legend, Line } from 'recharts';
import { format, parseISO } from 'date-fns';
import '../styles/chart.css';

const Chart = (props: any) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, height] = useElementSize(containerRef);
    // const dateToCompare = props.data[0].vote_date
    // console.log(dateToCompare)
    return (
        <div className="chart-container">
            <ResponsiveContainer minWidth="800px">
                {props.data ?
                    <AreaChart
                        height={400}
                        width={600}
                        data={props.data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <defs>
                            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1" >
                                <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4}>
                                </stop>
                                <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05}>
                                </stop>
                            </linearGradient>
                        </defs>
                        <Area name="кол-во проголосовавших по данным НП" dataKey="amount" stroke="black" fill="url(#color)" />
                        <XAxis
                            fontFamily={'Roboto, sans-serif'}
                            angle={width <= 478 ? -45 : 0}
                            interval={0}
                            dataKey="vote_date"
                            tickFormatter={str => {
                                const date = parseISO(str)
                                if (width <= 600) {
                                    return format(date, "HH")
                                }
                                return format(date, "HH:mm")
                            }} />
                        {props.electors ?
                            <YAxis dataKey="amount" domain={[0, (dataMax: any) => (props.electors)]} /> :
                            <YAxis dataKey="amount"
                                fontFamily={'Roboto, sans-serif'}
                            />}
                        {props.data.map((votesData: any) => {
                            if (votesData.vote_date === "2021-08-11 20:00:00") {
                                return <ReferenceArea x1="2021-08-11 09:00:00" x2="2021-08-11 18:00:00" fill="yellow" label={format(parseISO(votesData.vote_date), "PPP")} />
                            } else if (votesData.vote_date === "2021-08-11 18:00:00") {
                                return <ReferenceArea x1="2021-08-11 18:00:00" x2="2021-08-11 20:00:00" fill="blue" label={format(parseISO(votesData.vote_date), "PPP")} />
                            } else if (votesData.vote_date === "2021-08-12 20:00:00") {
                                return <ReferenceArea x1="2021-08-13 09:00:00" x2="2021-08-13 20:00:00" fill="white" label={format(parseISO(votesData.vote_date), "PPP")} />
                            }
                        })
                        }
                        <Tooltip />
                        <CartesianGrid opacity={0.9} vertical={false} />
                        <Legend fontFamily={'Roboto, sans-serif'} className="fontName" />
                        {/* <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
                    </AreaChart>

                    :
                    <p>{props.sstatus}</p>}
            </ResponsiveContainer>
        </div>
    );
}

export default Chart

{/* <div className='chart-container' ref={containerRef} style={{ width: "100%", overflow: "hidden" }}> */ }