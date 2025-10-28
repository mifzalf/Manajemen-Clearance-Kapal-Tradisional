import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import ConfirmationModal from '../../components/modal/ConfirmationModal';
import PelabuhanFormModal from '../../components/modal/PelabuhanFormModal';
import PelabuhanTable from '../../components/table/PelabuhanTable';

function Pelabuhan() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Fungsi untuk mengambil data
  const fetchData = async () => {
    setLoading(true);
    try {
      let response = await axiosInstance.get('/pelabuhan');
      setData(response.data.datas || []);
    } catch (error) {
      toast.error("Gagal memuat data pelabuhan.");
      console.error("Fetch Data Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsConfirmOpen(true);
  };

  const handleCloseConfirm = () => {
    setItemToDelete(null);
    setIsConfirmOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      try {
        await axiosInstance.delete(`/pelabuhan/delete/${itemToDelete.id_pelabuhan}`);
        toast.success(`Data "${itemToDelete.nama_pelabuhan}" berhasil dihapus.`);
        fetchData();
      } catch (error) {
        toast.error("Gagal menghapus data.");
      } finally {
        handleCloseConfirm();
      }
    }
  };

  return (
    <>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Data Master Pelabuhan</h1>
          <button onClick={handleOpenModal} className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors">
            + Tambah Pelabuhan
          </button>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          {loading ? (
            <p className="text-center py-10 text-gray-500">Memuat data...</p>
          ) : (
            <PelabuhanTable items={data} onEdit={handleEdit} onDelete={handleDeleteClick} />
          )}
        </div>
      </div>

      {isModalOpen && (
        <PelabuhanFormModal
          onClose={handleCloseModal}
          currentItem={editingItem}
          onSuccess={fetchData}
        />
      )}
      
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus data pelabuhan "${itemToDelete?.nama_pelabuhan}"?`}
      />
    </>
  );
}

export default Pelabuhan;