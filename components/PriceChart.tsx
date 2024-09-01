import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { getPriceData } from '../utils/api';

const PriceChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPriceData('bitcoin');
      setChartData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartData) {
      const ctx = document.getElementById('priceChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.dates,
          datasets: [
            {
              label: 'BTC Price',
              data: chartData.prices,
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: false,
            },
          ],
        },
      });
    }
  }, [chartData]);

  return <canvas id="priceChart"></canvas>;
};

export default PriceChart;
