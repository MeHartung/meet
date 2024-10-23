import React, { useEffect, useState, useMemo } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';

const EventGenresChart = ({ events }) => {
    const [data, setData] = useState([]);

    // Используем useMemo для запоминания массива genres
    const genres = useMemo(() => ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'], []);

    useEffect(() => {
        const getData = () => {
            const data = genres.map((genre) => {
                const filteredEvents = events.filter((event) => event.summary.includes(genre));
                return {
                    name: genre,
                    value: filteredEvents.length,
                };
            });
            return data;
        };
        setData(getData());
    }, [events, genres]); // genres больше не пересоздаётся при каждом рендере

    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
        const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
        return percent ? (
            <text
                x={x}
                y={y}
                fill="#8884d8"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
            </text>
        ) : null;
    };

    const colors = ['#5F9EA0', '#66CCCC', '#9B59B6', '#DA70D6', '#3e40d6'];

    return (
        <ResponsiveContainer width="99%" height={400}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    fill="#8884d8"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={150}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default EventGenresChart;