import React from 'react';
import Chart from "react-apexcharts";

const seriesData = [670, 451];

const options = {
  chart: {
    type: 'donut',
    fontFamily: "Outfit, sans-serif",
  },
  colors: ["#465fff", "#34d399"],
  labels: ['Surat Masuk', 'Surat Keluar'],
  legend: {
    position: 'bottom',
    horizontalAlign: 'center',
    fontFamily: "Outfit, sans-serif",
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
            label: 'Total Surat',
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((a, b) => {
                return a + b
              }, 0)
            }
          }
        }
      }
    }
  },
};

const LetterDistributionDoughnutChart = () => {
  return (
    <div className="flex h-[420px] flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">Distribusi Surat</h3>
      <div className="flex h-full w-full items-center justify-center">
        <Chart options={options} series={seriesData} type="donut" height={350} />
      </div>
    </div>
  );
};

export default LetterDistributionDoughnutChart;