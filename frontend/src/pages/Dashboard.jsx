import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend } from "chart.js";
import MetricCards from '../components/dashboard/MetricCards';
import MonthlyLettersBarChart from '../components/dashboard/MonthlyLettersBarChart';
import LetterDistributionDoughnutChart from '../components/dashboard/LetterDistributionDoughnutChart';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <MetricCards />
        </div>

        <div className="col-span-12 lg:col-span-8">
          <MonthlyLettersBarChart />
        </div>

        <div className="col-span-12 lg:col-span-4">
          {}
          <LetterDistributionDoughnutChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;