import React, { useState } from 'react';
import Label from '../form/Label';
import InputField from '../form/InputField';
import Select from '../form/Select';
import Button from '../ui/Button';

const statusOptions = [
  { value: '', label: 'Pilih Status Muatan', disabled: true },
  { value: 'Umum', label: 'Umum' },
  { value: 'Berbahaya', label: 'Berbahaya' },
  { value: 'Cair', label: 'Cair' },
  { value: 'Curah', label: 'Curah' },
  { value: 'Lainnya', label: 'Lainnya' },
];

const MuatanFormModal = ({ onClose }) => {
  const [formData, setFormData] = useState({ nama: '', status: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Muatan Baru:", formData);
    alert('Data Muatan Berhasil Disimpan!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md mx-4">
        <form onSubmit={handleSubmit}>
          <div className="p-5 border-b">
            <h2 className="text-xl font-bold text-gray-800">Tambah Data Muatan</h2>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <Label htmlFor="nama">Nama Muatan</Label>
              <InputField name="nama" id="nama" value={formData.nama} onChange={handleChange} placeholder="Contoh: LPG" required />
            </div>
            <div>
              <Label htmlFor="status">Status Muatan</Label>
              <Select name="status" id="status" value={formData.status} onChange={handleChange} options={statusOptions} required />
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

export default MuatanFormModal;