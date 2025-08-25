import React, { useState, useEffect } from 'react';
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
  const API_URL = import.meta.env.VITE_API_URL
  const [formData, setFormData] = useState({ nama_kategori_muatan: '', status_kategori_muatan: '' });
  const isEditMode = Boolean(currentItem);

  useEffect(() => {
    if (isEditMode) {
      setFormData({ nama_kategori_muatan: currentItem.nama_kategori_muatan, status: currentItem.status_kategori_muatan });
    }
  }, [currentItem, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = (isEditMode) ? await axios.patch(`${API_URL}/kategori-muatan/update/${currentItem.id_kategori_muatan}`, formData) : await axios.post(`${API_URL}/kategori-muatan/store`, formData)
    if (response.status == 200) {
      console.log(response)
      console.log(`Data ${isEditMode ? 'Diperbarui' : 'Disimpan'}: ` + formData);
      alert(`Data Muatan Berhasil ${isEditMode ? 'Diperbarui' : 'Disimpan'}!`);
      onClose();
      onSuccess()
    } else {
      console.log("Data Gagal Disimpan:", response.data.msg);
      alert(`Terjadi Kesalahan saat ${isEditMode ? 'memperbarui' : 'menyimpan'} data kategori muatan!`);
      onClose()
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
              <Label htmlFor="nama">Nama Muatan</Label>
              <InputField name="nama_kategori_muatan" id="nama" value={formData.nama_kategori_muatan} onChange={handleChange} placeholder="Contoh: LPG" required />
            </div>
            <div>
              <Label htmlFor="status">Status Muatan</Label>
              <Select name="status_kategori_muatan" id="status" value={formData.status_kategori_muatan} onChange={handleChange} options={statusOptions} required />
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