import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";
import MetricCards from '../components/dashboard/MetricCards';
import MonthlyClearanceBarChart from '../components/dashboard/MonthlyClearanceBarChart';
import CargoCategoryDoughnutChart from '../components/dashboard/CargoCategoryDoughnutChart';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <MetricCards />
        </div>

        <div className="col-span-12 lg:col-span-8">
          <MonthlyClearanceBarChart />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <CargoCategoryDoughnutChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;