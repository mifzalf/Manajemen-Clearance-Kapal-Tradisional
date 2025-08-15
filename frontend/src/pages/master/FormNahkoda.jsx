import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Label from '../../components/form/Label';
import InputField from '../../components/form/InputField';
import Button from '../../components/ui/Button';

function FormNahkoda() {
  const [formData, setFormData] = useState({
    nama: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nama) {
      alert('Nama nahkoda wajib diisi!');
      return;
    }
    console.log("Data Nahkoda Baru:", formData);
    alert('Data Nahkoda Berhasil Disimpan!');
    navigate('/master/nahkoda');
  };

  return (
    <div className="space-y-6">
          <Link to="/master/nahkoda" className="text-sm text-gray-500 hover:text-indigo-600 inline-flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Master Muatan
          </Link>
      <h1 className="text-2xl font-bold text-gray-800">Formulir Data Nahkoda</h1>
      
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="nama">Nama Nahkoda</Label>
            <InputField
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Contoh: Capt. Budi Santoso"
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button to="/master/nahkoda" variant="secondary">Batal</Button>
            <Button type="submit">Simpan Data</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormNahkoda;