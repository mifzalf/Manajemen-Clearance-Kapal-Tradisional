import React, { useState, useEffect, useMemo } from 'react';
import Label from '../form/Label';
import InputField from '../form/InputField';
import Select from '../form/Select';
import Button from '../ui/Button';

const DaerahFormModal = ({ activeTab, onClose, allNegara = [], allProvinsi = [], allKabupaten = [] }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({ parentId: '', kode: '', nama: '' });
  }, [activeTab]);

  const parentOptions = useMemo(() => {
    switch (activeTab) {
      case 'provinsi':
        return [{ value: '', label: 'Pilih Negara' }, ...allNegara.map(n => ({ value: n.id, label: n.nama }))];
      case 'kabupaten':
        return [{ value: '', label: 'Pilih Provinsi' }, ...allProvinsi.map(p => ({ value: p.id, label: p.nama }))];
      case 'kecamatan':
        return [{ value: '', label: 'Pilih Kabupaten/Kota' }, ...allKabupaten.map(k => ({ value: k.id, label: k.nama }))];
      default:
        return [];
    }
  }, [activeTab, allNegara, allProvinsi, allKabupaten]);

  const getTitle = () => {
    switch (activeTab) {
      case 'negara': return 'Tambah Data Negara';
      case 'provinsi': return 'Tambah Data Provinsi';
      case 'kabupaten': return 'Tambah Data Kabupaten/Kota';
      case 'kecamatan': return 'Tambah Data Kecamatan';
      default: return 'Tambah Data';
    }
  };

  const getParentLabel = () => {
    switch (activeTab) {
      case 'provinsi': return 'Negara';
      case 'kabupaten': return 'Provinsi';
      case 'kecamatan': return 'Kabupaten/Kota';
      default: return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
            {activeTab !== 'negara' && (
              <div>
                <Label htmlFor="parentId">{getParentLabel()}</Label>
                <Select name="parentId" id="parentId" value={formData.parentId} onChange={handleChange} options={parentOptions} required />
              </div>
            )}
            
            {activeTab === 'negara' && (
              <div>
                <Label htmlFor="kode">Kode Negara</Label>
                <InputField name="kode" id="kode" value={formData.kode || ''} onChange={handleChange} placeholder="Contoh: RI" required />
              </div>
            )}
            <div>
              <Label htmlFor="nama">Nama {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</Label>
              <InputField name="nama" id="nama" value={formData.nama || ''} onChange={handleChange} required />
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