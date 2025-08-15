import React, { useState, useEffect } from 'react';
import Label from '../form/Label';
import InputField from '../form/InputField';
import Button from '../ui/Button';

const DaerahFormModal = ({ activeTab, onClose }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (activeTab === 'negara') {
      setFormData({ kode: '', nama: '' });
    } else {
      setFormData({ nama: '' });
    }
  }, [activeTab]);

  const getTitle = () => {
    switch (activeTab) {
      case 'negara': return 'Tambah Data Negara';
      case 'provinsi': return 'Tambah Data Provinsi';
      case 'kabupaten': return 'Tambah Data Kabupaten/Kota';
      case 'kecamatan': return 'Tambah Data Kecamatan';
      default: return 'Tambah Data';
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Data baru untuk ${activeTab}:`, formData);
    alert(`Data ${activeTab} berhasil disimpan!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md mx-4">
        <form onSubmit={handleSubmit}>
          <div className="p-5 border-b">
            <h2 className="text-xl font-bold text-gray-800">{getTitle()}</h2>
          </div>
          <div className="p-5 space-y-4">
            {activeTab === 'negara' && (
              <div>
                <Label htmlFor="kode">Kode Negara</Label>
                <InputField name="kode" id="kode" value={formData.kode || ''} onChange={handleChange} placeholder="Contoh: RI" required />
              </div>
            )}
            <div>
              <Label htmlFor="nama">Nama {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</Label>
              <InputField name="nama" id="nama" value={formData.nama || ''} onChange={handleChange} placeholder={`Masukkan nama ${activeTab}...`} required />
            </div>
          </div>
          <div className="p-5 border-t flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
            <Button type="button" variant="secondary" onClick={onClose}>Batal</Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DaerahFormModal;