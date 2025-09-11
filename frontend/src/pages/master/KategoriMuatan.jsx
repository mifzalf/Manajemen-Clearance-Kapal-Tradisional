import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import MuatanTable from '../../components/table/MuatanTable';
import MuatanFormModal from '../../components/modal/MuatanFormModal';
import axiosInstance from '../../api/axiosInstance';

function KategoriMuatan() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [muatanData, setMuatanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchKategoriMuatan();
  }, []);

  const fetchKategoriMuatan = async () => {
    setLoading(true);
    try {
      let response = await axiosInstance.get('/kategori-muatan');
      setMuatanData(response.data.datas || []);
    } catch (error) {
      toast.error("Gagal memuat data muatan.");
      console.error("Fetch Muatan Error:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleDelete = (item) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p>Apakah Anda yakin ingin menghapus <strong>{item.nama_kategori_muatan}</strong>?</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                const response = await axiosInstance.delete(`/kategori-muatan/delete/${item.id_kategori_muatan}`);
                if (response.status === 200) {
                  toast.success('Data berhasil dihapus!');
                  fetchKategoriMuatan();
                }
              } catch (error) {
                toast.error('Gagal menghapus data.');
              }
            }}
            className="w-full px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Ya, Hapus
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Batal
          </button>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Dat Muatan</h1>
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
          <MuatanTable muatanItems={muatanData} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
      {isModalOpen && <MuatanFormModal onClose={handleCloseModal} currentItem={editingItem} onSuccess={fetchKategoriMuatan} />}
    </>
  );
}

export default KategoriMuatan;