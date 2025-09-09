import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Label from '../form/Label';
import InputField from '../form/InputField';
import Select from '../form/Select';
import Button from '../ui/Button';
import axios from 'axios';

const statusOptions = [
  { value: '', label: 'Pilih Status Muatan', disabled: true },
  { value: 'Umum', label: 'Umum' },
  { value: 'Berbahaya', label: 'Berbahaya' },
];

const MuatanFormModal = ({ onClose, currentItem, onSuccess }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({ nama_kategori_muatan: '', status_kategori_muatan: '' });
  const isEditMode = Boolean(currentItem);

  useEffect(() => {
    if (isEditMode && currentItem) {
      setFormData({ 
        nama_kategori_muatan: currentItem.nama_kategori_muatan, 
        status_kategori_muatan: currentItem.status_kategori_muatan 
      });
    } else {
      setFormData({ nama_kategori_muatan: '', status_kategori_muatan: '' });
    }
  }, [currentItem, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isEditMode 
        ? await axios.patch(`${API_URL}/kategori-muatan/update/${currentItem.id_kategori_muatan}`, formData, {
            headers: localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}
          }) 
        : await axios.post(`${API_URL}/kategori-muatan/store`, formData, {
            headers: localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}
          });

      if (response.status === 200) {
        toast.success(`Data Muatan Berhasil ${isEditMode ? 'Diperbarui' : 'Disimpan'}!`);
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Data Gagal Disimpan:", error.response?.data?.msg || error.message);
      toast.error(`Terjadi Kesalahan saat menyimpan data.`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md mx-4">
        <form onSubmit={handleSubmit}>
          <div className="p-5 border-b">
            <h2 className="text-xl font-bold text-gray-800">{isEditMode ? 'Edit Data Muatan' : 'Tambah Data Muatan'}</h2>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <Label htmlFor="nama_kategori_muatan">Nama Muatan</Label>
              <InputField name="nama_kategori_muatan" id="nama_kategori_muatan" value={formData.nama_kategori_muatan} onChange={handleChange} placeholder="Contoh: LPG" required />
            </div>
            <div>
              <Label htmlFor="status_kategori_muatan">Status Muatan</Label>
              <Select name="status_kategori_muatan" id="status_kategori_muatan" value={formData.status_kategori_muatan} onChange={handleChange} options={statusOptions} required />
            </div>
          </div>
          <div className="p-5 border-t flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
            <Button type="button" variant="secondary" onClick={onClose}>Batal</Button>
            <Button type="submit">{isEditMode ? 'Simpan Perubahan' : 'Simpan'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MuatanFormModal;