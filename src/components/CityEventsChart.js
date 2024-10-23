import React, { useEffect, useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CityEventsChart = ({ events }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = () => {
            const locations = events.map((event) => event.location);
            const data = locations.reduce((acc, location) => {
                const existingLocation = acc.find((item) => item.city === location);
                if (existingLocation) {
                    existingLocation.count += 1;
                } else {
                    acc.push({ city: location, count: 1 });
                }
                return acc;
            }, []);
            setData(data);
        };
        getData();
    }, [events]);  // Добавил 'events' как зависимость, убрал сложное выражение

    return (
        <ResponsiveContainer width="99%" height={400}>
            <ScatterChart>
                <CartesianGrid />
                <XAxis type="category" dataKey="city" name="City" />
                <YAxis type="number" dataKey="count" name="Number of events" allowDecimals={false} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={data} fill="#8884d8" />
            </ScatterChart>
        </ResponsiveContainer>
    );
};

export default CityEventsChart;