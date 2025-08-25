import React, { useState, useEffect } from 'react';
import MuatanTable from '../../components/table/MuatanTable';
import MuatanFormModal from '../../components/modal/MuatanFormModal';
import axios from 'axios'

function KategoriMuatan() {
  const API_URL = import.meta.env.VITE_API_URL
  const [muatanData, setMuatanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchKategoriMuatan()
    setLoading(false);
  }, []);

  const fetchKategoriMuatan = async () => {
    let response = await axios.get(`${API_URL}/kategori-muatan`) 
    console.log(response)
    setMuatanData(response.data.datas)
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
          <h1 className="text-2xl font-bold text-gray-800">Data Master Muatan</h1>
          <button
            onClick={handleOpenModal}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors"
          >
            + Tambah Data
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Memuat data...</p>
        ) : (
          <MuatanTable muatanItems={muatanData} onEdit={handleEdit} onSuccess={fetchKategoriMuatan} />
        )}
      </div>
      {isModalOpen && <MuatanFormModal onClose={handleCloseModal} currentItem={editingItem} onSuccess={fetchKategoriMuatan} />}
    </>
  );
}

export default KategoriMuatan;