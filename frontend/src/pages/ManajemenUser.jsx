import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import UserTable from '../components/table/UserTable';
import UserFormModal from '../components/modal/UserFormModal';
import ConfirmationModal from '../components/modal/ConfirmationModal';
import axios from 'axios';

const sampleUserData = [
    {id: 1, nama_lengkap: 'Budi Santoso', username: 'budi', jabatan: 'Administrator', role: 'Admin'},
    {id: 2, nama_lengkap: 'Ani Yudhoyono', username: 'ani', jabatan: 'Staff Operasional', role: 'User'},
];

function ManajemenUser() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
        // let response = await axios.get(`${API_URL}/users`);
        // setUserData(response.data.datas || []);
        setUserData(sampleUserData); // Ganti dengan API call jika sudah siap
    } catch (error) {
        toast.error("Gagal memuat data pengguna.");
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
        // const response = await axios.delete(`${API_URL}/users/delete/${itemToDelete.id}`);
        toast.success(`Pengguna "${itemToDelete.nama_lengkap}" berhasil dihapus.`);
        fetchUsers();
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
            <h1 className="text-2xl font-bold text-gray-800">Manajemen Pengguna</h1>
            <div className="flex items-center gap-3">
                <button onClick={handleOpenModal} className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors">
                    + Tambah Pengguna
                </button>
            </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Memuat data...</p>
        ) : (
          <UserTable userItems={userData} onEdit={handleEdit} onDelete={handleDeleteClick} />
        )}
      </div>

      {isModalOpen && <UserFormModal onClose={handleCloseModal} currentItem={editingItem} onSuccess={fetchUsers} />}
      
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus pengguna "${itemToDelete?.nama_lengkap}"?`}
      />
    </>
  );
}

export default ManajemenUser;