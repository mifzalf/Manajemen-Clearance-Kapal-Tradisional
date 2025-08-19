import React from 'react';
import Chart from "react-apexcharts";

const CargoCategoryDoughnutChart = () => {
  const seriesData = [120, 55, 40, 65, 15];
  const seriesLabels = ['Umum', 'Berbahaya', 'Cair', 'Curah', 'Lainnya'];

  const options = {
    chart: {
      type: 'donut',
      fontFamily: "Outfit, sans-serif",
    },
    colors: ['#3B82F6', '#EF4444', '#60A5FA', '#2563EB', '#9CA3AF'],
    labels: seriesLabels,
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Muatan',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0)
              }
            }
          }
        }
      }
    },
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">Distribusi Kategori Muatan</h3>
      <div className="flex h-full w-full items-center justify-center">
        <Chart options={options} series={seriesData} type="donut" height={350} />
      </div>
    </div>
  );
};

export default CargoCategoryDoughnutChart;