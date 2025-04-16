import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { getPriceData } from '../utils/api';
import styles from '../styles/Layout.module.css';

const PriceChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1d');
  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const timeframes = [
    { label: '1D', value: '1d' },
    { label: '1W', value: '1w' },
    { label: '1M', value: '1m' },
    { label: '1Y', value: '1y' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getPriceData(selectedTimeframe);
        setChartData(data);
      } catch (error) {
        console.error('Error fetching price data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedTimeframe]);

  useEffect(() => {
    if (chartData && canvasRef.current) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.dates,
          datasets: [
            {
              label: 'BTC Price',
              data: chartData.prices,
              borderColor: '#00FF00',
              backgroundColor: 'rgba(0, 255, 0, 0.1)',
              fill: true,
              tension: 0.1,
              borderWidth: 1,
              pointRadius: 0,
              pointHoverRadius: 4,
              pointHoverBackgroundColor: '#00FF00',
              pointHoverBorderColor: '#00FF00',
              pointHoverBorderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 0,
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: '#000000',
              titleColor: '#00FF00',
              bodyColor: '#00FF00',
              borderColor: '#00FF00',
              borderWidth: 1,
              padding: 10,
              displayColors: false,
              titleFont: {
                family: 'Courier New',
                size: 12,
              },
              bodyFont: {
                family: 'Courier New',
                size: 12,
              },
              callbacks: {
                label: (context) => {
                  return `$ ${context.parsed.y.toFixed(2)}`;
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: 'rgba(0, 255, 0, 0.1)',
                borderColor: '#00FF00',
              },
              ticks: {
                color: '#00FF00',
                font: {
                  family: 'Courier New',
                  size: 10,
                },
              },
            },
            y: {
              grid: {
                color: 'rgba(0, 255, 0, 0.1)',
                borderColor: '#00FF00',
              },
              ticks: {
                color: '#00FF00',
                font: {
                  family: 'Courier New',
                  size: 10,
                },
                callback: (value) => `$${value}`,
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartData]);

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h2 className={styles.chartTitle}>{'>'}BTC_PRICE_CHART</h2>
        <div className={styles.timeframeSelector}>
          {timeframes.map((timeframe) => (
            <button
              key={timeframe.value}
              className={`${styles.timeframeButton} ${
                selectedTimeframe === timeframe.value ? styles.active : ''
              }`}
              onClick={() => setSelectedTimeframe(timeframe.value)}
            >
              {'>_'}{timeframe.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.chartWrapper}>
        {isLoading ? (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingSpinner}>
              <pre>
                {`
    LOADING DATA
    [|||||||   ]
    PLEASE WAIT
                `}
              </pre>
            </div>
          </div>
        ) : (
          <canvas ref={canvasRef} />
        )}
      </div>
    </div>
  );
};

export default PriceChart;
