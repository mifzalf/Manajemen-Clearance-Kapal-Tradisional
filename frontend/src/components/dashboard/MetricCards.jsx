import React from 'react';
import { FaShip, FaCheckCircle } from 'react-icons/fa';

const stats = [
  { 
    label: "Jumlah Kapal Terdaftar", 
    value: 152, 
    today: 3,
    icon: <FaShip className="h-6 w-6 text-blue-600" /> 
  },
  { 
    label: "Clearance Bulan Ini", 
    value: 78, 
    today: 5,
    icon: <FaCheckCircle className="h-6 w-6 text-blue-600" />
  },
];

const MetricCards = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            {stat.icon}
          </div>
          <div className="mt-5 flex items-end justify-between">
            <div>
              <span className="text-sm text-gray-500">{stat.label}</span>
              <h4 className="mt-1 text-2xl font-bold text-gray-800">{stat.value}</h4>
            </div>
            <div className="flex items-center text-sm font-medium text-green-600">
              <span>+{stat.today}</span>
              <span className="ml-1 text-gray-500">Baru</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricCards;