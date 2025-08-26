import React, { useState, useEffect } from 'react';
import NahkodaTable from '../../components/table/NahkodaTable';
import NahkodaFormModal from '../../components/modal/NahkodaFormModal';
import axios from "axios"


function Nahkoda() {
  const API_URL = import.meta.env.VITE_API_URL
  const [nahkodaData, setNahkodaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    setLoading(false);

    setTimeout(() => {
      fecthNahkoda()
    }, 0);
  }, []);

  async function fecthNahkoda() {
    let response = await axios.get(`${API_URL}/nahkoda`)
    setNahkodaData(response?.data?.datas)
  }

  const handleOpenModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Data Nahkoda</h1>
          <button onClick={handleOpenModal} className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors">
            + Tambah Data
          </button>
        </div>

        {loading ? <p>Memuat data...</p> : <NahkodaTable nahkodaItems={nahkodaData} onEdit={handleEdit} onSuccess={fecthNahkoda} />}
      </div>
      {isModalOpen && <NahkodaFormModal onClose={handleCloseModal} currentItem={editingItem} onSuccess={fecthNahkoda} />}
    </>
  );
}

export default Nahkoda;