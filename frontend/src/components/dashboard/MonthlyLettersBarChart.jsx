import React from 'react';
import Chart from "react-apexcharts";

const MonthlyLettersBarChart = () => {
  const options = {
    colors: ["#465fff", "#34d399"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 350,
      toolbar: { show: false },
      animations: {
        enabled: true,
        dynamicAnimation: {
          enabled: false
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 4,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [ "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember" ],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit, sans-serif",
    },
    yaxis: { title: { text: undefined } },
    grid: { yaxis: { lines: { show: true } } },
    fill: { opacity: 1 },
    tooltip: {
      x: { show: false },
      y: { formatter: (val) => `${val} surat` },
    },
  };

  const series = [
    { name: "Surat Masuk", data: [20, 30, 40, 35, 50, 60, 55, 70, 65, 80, 75, 90] },
    { name: "Surat Keluar", data: [15, 25, 30, 28, 35, 40, 38, 45, 42, 50, 48, 55] },
  ];

  return (
    <div className="flex h-[420px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between">
        {}
        <h3 className="text-lg font-semibold text-gray-800">
          Surat Bulanan
        </h3>
      </div>
      <div className="flex-grow">
        <Chart options={options} series={series} type="bar" height={350} />
      </div>
    </div>
  );
};

export default MonthlyLettersBarChart;