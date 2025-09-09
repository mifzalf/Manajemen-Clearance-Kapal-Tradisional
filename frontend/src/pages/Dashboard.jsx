import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";
import MetricCards from '../components/dashboard/MetricCards';
import MonthlyClearanceBarChart from '../components/dashboard/MonthlyClearanceBarChart';
import CargoCategoryDoughnutChart from '../components/dashboard/CargoCategoryDoughnutChart';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL
  const [totalKapal, setTotalKapal] = useState(0)
  const [totalPerjalanan, setTotalPerjalanan] = useState(0)
  const [totalKapalNow, setTotalKapalNow] = useState(0)
  const [totalPerjalananNow, setTotalPerjalananNow] = useState(0)
  const [totalPerjalananPerBulan, setTotalPerjalananPerBulan] = useState([])
  const [totalKategori, setTotalKategori] = useState([])

  useEffect(() => {
    fetchTotalKapal()
    fetchTotalPerjalanan()
    fetchTotalKapalNow()
    fetchTotalPerjalananNow()
    fetchPerjalananPerBulan()
    fetchTotalKategori()
  }, [])

  const fetchTotalKapal = async () => {
    let response = await axios.get(API_URL + '/kapal/total',{
      headers: localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}
    })
    setTotalKapal(response.data.datas)
  }

  const fetchTotalPerjalanan = async () => {
    let response = await axios.get(API_URL + '/perjalanan/total',{
      headers: localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}
    })
    setTotalPerjalanan(response.data.datas)
  }

  const fetchTotalKapalNow = async () => {
    let response = await axios.get(API_URL + '/kapal/total-today',{
      headers: localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}
    })
    setTotalKapalNow(response.data.datas)
  }

  const fetchTotalPerjalananNow = async () => {
    let response = await axios.get(API_URL + '/perjalanan/total-today',{
      headers: localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}
    })
    setTotalPerjalananNow(response.data.datas)
  }

  const fetchPerjalananPerBulan = async () => {
    let response = await axios.get(API_URL + '/perjalanan/total-month',{
      headers: localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}
    })
    setTotalPerjalananPerBulan(response.data.defaultData)
  }

  const fetchTotalKategori = async () => {
    let response = await axios.get(API_URL + '/perjalanan/total-kategori',{
      headers: localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}
    })
    setTotalKategori(response.data.defaultDatas)
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <MetricCards totalKapal={totalKapal} totalPerjalanan={totalPerjalanan} kapalNow={totalKapalNow} perjalananNow={totalPerjalananNow} />
        </div>

        <div className="col-span-12 lg:col-span-8">
          <MonthlyClearanceBarChart datas={totalPerjalananPerBulan} />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <CargoCategoryDoughnutChart datas={totalKategori} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;