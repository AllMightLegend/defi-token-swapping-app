import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import axios from 'axios';

const PriceChart: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart', {
        params: {
          vs_currency: 'usd',
          days: '7',
        },
      });
      const formattedData = result.data.prices.map((price: number[]) => ({
        time: new Date(price[0]).toLocaleDateString(),
        price: price[1],
      }));
      setData(formattedData);
    };
    fetchData();
  }, []);

  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#f5f5f5" />
      <Line type="monotone" dataKey="price" stroke="#ff7300" yAxisId={0} />
    </LineChart>
  );
};

export default PriceChart;
