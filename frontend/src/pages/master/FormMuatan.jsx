import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Label from '../../components/form/Label';
import InputField from '../../components/form/InputField';
import Select from '../../components/form/Select';
import Button from '../../components/ui/Button';

const statusOptions = [
  { value: '', label: 'Pilih Status Muatan', disabled: true },
  { value: 'Umum', label: 'Umum' },
  { value: 'Berbahaya', label: 'Berbahaya' },
  { value: 'Cair', label: 'Cair' },
  { value: 'Curah', label: 'Curah' },
  { value: 'Lainnya', label: 'Lainnya' },
];

function FormMuatan() {
  const [formData, setFormData] = useState({
    nama: '',
    status: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.status) {
      alert('Semua kolom wajib diisi!');
      return;
    }
    console.log("Data Muatan Baru:", formData);
    alert('Data Muatan Berhasil Disimpan!');
    navigate('/master/muatan');
  };

  return (
    <div className="space-y-6">
      <Link to="/master/muatan" className="text-sm text-gray-500 hover:text-indigo-600 inline-flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Kembali ke Master Muatan
      </Link>
      <h1 className="text-2xl font-bold text-gray-800">Formulir Data Muatan</h1>
      
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <Label htmlFor="nama">Nama Muatan</Label>
            <InputField
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="masukkan nama muatan"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <Label htmlFor="status">Status Muatan</Label>
            <Select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={statusOptions}
              required
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t">
            <Button to="/master/muatan" variant="secondary">Batal</Button>
            <Button type="submit">Simpan Data</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormMuatan;