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

const ChartComparison = ({ incomingData, outgoingData }) => {
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
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
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Comparison of Incoming and Outgoing Letters</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartComparison;