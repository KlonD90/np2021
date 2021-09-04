import React, { useRef } from 'react'
import { useElementSize } from './ResizeHook';
import { AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid } from 'recharts';
import { format, parseISO } from 'date-fns';

const Chart = (props: any) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, height] = useElementSize(containerRef);
    return (
        <div ref={containerRef} style={{ width: "100%", overflow: "hidden" }}>
            {props.data ?
                <AreaChart
                    height={400}
                    width={width}
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
                    <Area dataKey="amount" stroke="#2451B7" fill="url(#color)" />
                    <XAxis angle={width <= 478 ? -45 : 0} interval={0} dataKey="vote_date" tickFormatter={str => {
                        const date = parseISO(str)
                        if (width <= 600) {
                            return format(date, "HH")
                        }
                        return format(date, "HH:mm")
                    }} />
                    <YAxis dataKey="amount" />
                    <Tooltip />
                    <CartesianGrid opacity={0.9} vertical={false} />
                </AreaChart>

                :
                <p>{props.sstatus}</p>}
        </div>
    );
}

export default Chart