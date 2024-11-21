// GradientLineChart.jsx
import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Filler, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

interface ValuationProps {
  profit: [
    {
      month: number;
      year: number;
      profit: number;
    }
  ],
  valuation: [
    {
      month: number;
      year: number;
      maxPricePerShare: number;
    }
  ]
}

const Valuation = ({ profit, valuation }: ValuationProps) => {
  const chartRef = useRef(null);

  // Map month numbers to month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Transform data
  const profitData = {
    dates: profit.map(item => `${monthNames[item.month - 1]} ${item.year}`),
    profit: profit.map(item => item.profit.toFixed(2))
  };

  const valuationData = {
    dates: valuation.map(item => `${monthNames[item.month - 1]} ${item.year}`),
    valuation: valuation.map(item => item.maxPricePerShare.toFixed(2))
  };

  //Label Dates
  const labelDates = profitData.dates.length > valuationData.dates.length ? profitData.dates : valuationData.dates;

  //Pad the shorter array with zeros
  if (profitData.dates.length > valuationData.dates.length) {
    const diff = profitData.dates.length - valuationData.dates.length;
    for (let i = 0; i < diff; i++) {
      valuationData.dates.push('');
      valuationData.valuation.push(0);
    }
  } else if (valuationData.dates.length > profitData.dates.length) {
    const diff = valuationData.dates.length - profitData.dates.length;
    for (let i = 0; i < diff; i++) {
      profitData.dates.push('');
      profitData.profit.push(0);
    }
  }

  // Set up data
  const data = {
    labels: labelDates,
    datasets: [
      {
        label: 'Profit',
        data: profitData.profit,
        borderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: 'rgba(75,192,192,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        fill: true, // Enable fill under the line
        tension: 0.4, // Smooth out the lines
        backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
  
            if (!chartArea) {
              return null;
            }
  
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, 'rgba(75, 192, 192, 0.5)');
            gradient.addColorStop(1, 'rgba(75, 192, 192, 0)');
  
            return gradient;
          },
      },
      {
        label: 'Portfolio Value',
        data: valuationData.valuation,
        borderColor: 'rgba(153, 102, 255, 1)',
        pointBackgroundColor: 'rgba(153, 102, 255, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2,
        fill: true, // Enable fill under the line
        tension: 0.4, // Smooth out the lines
        backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
  
            if (!chartArea) {
              return null;
            }
  
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, 'rgba(153, 102, 255, 0.5)');
            gradient.addColorStop(1, 'rgba(153, 102, 255, 0)');
  
            return gradient;
          },
      },
    ],
  };

  // Set up options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Current Revenue and Portfolio Gains',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `$${context.parsed.y}`;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
      },
    },
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Valuation</h2>
      <div className="bg-white p-4 rounded-lg shadow-md" style={{ height: '50vh' }}>
        <div className="relative w-full h-full">
          <Line ref={chartRef} data={data} options={options} />
        </div>
      </div>
    </>
  );
};
export default Valuation;

