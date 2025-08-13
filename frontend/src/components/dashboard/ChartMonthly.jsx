import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartMonthly = ({ incomingData, outgoingData }) => {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Incoming Letters',
        data: incomingData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Outgoing Letters',
        data: outgoingData,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 className="text-lg font-semibold mb-4">Monthly Letters Overview</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartMonthly;