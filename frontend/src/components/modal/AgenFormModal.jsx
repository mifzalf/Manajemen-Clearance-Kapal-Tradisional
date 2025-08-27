import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Label from '../form/Label';
import InputField from '../form/InputField';
import Button from '../ui/Button';
import axios from 'axios';

const AgenFormModal = ({ onClose, currentItem, onSuccess }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({ nama_agen: '' });
  const isEditMode = Boolean(currentItem);

  useEffect(() => {
    if (isEditMode) {
      setFormData({ nama_agen: currentItem.nama_agen });
    }
  }, [currentItem, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = isEditMode 
        ? await axios.patch(`${API_URL}/agen/update/${currentItem.id_agen}`, formData) 
        : await axios.post(`${API_URL}/agen/store`, formData);

      if(response.status === 200){
        toast.success(`Data Agen Berhasil ${isEditMode ? 'Diperbarui' : 'Disimpan'}!`);
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Error:", error.response?.data?.msg || error.message);
      toast.error(`Terjadi kesalahan saat menyimpan data.`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md mx-4">
        <form onSubmit={handleSubmit}>
          <div className="p-5 border-b">
            <h2 className="text-xl font-bold text-gray-800">{isEditMode ? 'Edit Data Agen' : 'Tambah Data Agen'}</h2>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <Label htmlFor="nama">Nama Agen</Label>
              <InputField name="nama_agen" id="nama" value={formData.nama_agen} onChange={handleChange} placeholder="Contoh: PT. Laut Biru Nusantara" required />
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

export default AgenFormModal;