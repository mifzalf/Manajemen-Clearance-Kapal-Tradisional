import React, { useState } from 'react';
import Label from '../form/Label';
import InputField from '../form/InputField';
import Button from '../ui/Button';

const AgenFormModal = ({ onClose }) => {
  const [formData, setFormData] = useState({ nama: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Agen Baru:", formData);
    alert('Data Agen Berhasil Disimpan!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md mx-4">
        <form onSubmit={handleSubmit}>
          <div className="p-5 border-b">
            <h2 className="text-xl font-bold text-gray-800">Tambah Data Agen</h2>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <Label htmlFor="nama">Nama Agen</Label>
              <InputField name="nama" id="nama" value={formData.nama} onChange={handleChange} placeholder="Contoh: PT. Laut Biru Nusantara" required />
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

export default AgenFormModal;