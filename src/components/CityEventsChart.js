import { useState, useEffect } from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis, YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const CityEventsChart = ({ allLocations, events }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(getData());
    }, [events]);

    const getData = () => {
        const data = allLocations.map((location) => {
            const count = events.filter((event) => event.location === location).length;
            const city = location.split(/, | - /)[0];
            return { city, count };
        });
        return data;
    };

    return (
        <ResponsiveContainer width="99%" height={400}>
            <ScatterChart
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 60,  // увеличиваем отступ снизу для меток
                    left: -30,   // уменьшаем отступ слева для выравнивания
                }}
            >
                <CartesianGrid />
                <XAxis
                    type="category"
                    dataKey="city"
                    name="City"
                    angle={60}  // наклоняем метки на 60 градусов
                    interval={0}  // показываем все метки
                    tick={{ dx: 20, dy: 40, fontSize: 14 }}  // стилизуем метки
                />
                <YAxis
                    type="number"
                    dataKey="count"
                    name="Number of events"
                    allowDecimals={false}  // убираем десятичные значения
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Events in Cities" data={data} fill="#8884d8" />
            </ScatterChart>
        </ResponsiveContainer>
    );
}

export default CityEventsChart;