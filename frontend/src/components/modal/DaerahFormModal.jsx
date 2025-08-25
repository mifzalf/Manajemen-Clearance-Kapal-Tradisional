import React, { useState, useEffect, useMemo } from 'react';
import Label from '../form/Label';
import InputField from '../form/InputField';
import Select from '../form/Select';
import Button from '../ui/Button';
import axios from 'axios';

const DaerahFormModal = ({ activeTab, onClose, currentItem, allNegara = [], allProvinsi = [], allKabupaten = [], onSuccess}) => {
  const API_URL = import.meta.env.VITE_API_URL
  const [formData, setFormData] = useState({});
  const isEditMode = Boolean(currentItem);

  useEffect(() => {
    if (isEditMode && currentItem) {
      let parentId;
      if (activeTab === 'provinsi') parentId = currentItem.negaraId;
      if (activeTab === 'kabupaten') parentId = currentItem.provinsiId;
      if (activeTab === 'kecamatan') parentId = currentItem.kabupatenId;

      setFormData({
        parentId: parentId || '',
        kode_negara: currentItem.kode_negara || '',
        nama_negara: currentItem.nama_negara || ''
      });
    } else {
      setFormData({ kode_negara: '', nama_negara: '' });
    }
  }, [activeTab, currentItem, isEditMode]);

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
    const action = isEditMode ? 'Edit' : 'Tambah';
    switch (activeTab) {
      case 'negara': return `${action} Data Negara`;
      case 'provinsi': return `${action} Data Provinsi`;
      case 'kabupaten': return `${action} Data Kabupaten/Kota`;
      case 'kecamatan': return `${action} Data Kecamatan`;
      default: return `${action} Data`;
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = (isEditMode) ? await axios.patch(`${API_URL}/negara/update/${currentItem.id_negara}`, formData) : await axios.post(`${API_URL}/negara/store`, formData)
    if (response.status == 200) {
      console.log(`Data ${isEditMode ? 'diperbarui' : 'baru'} untuk ${activeTab}:`, formData);
      alert(`Data ${activeTab} berhasil ${isEditMode ? 'diperbarui' : 'disimpan'}!`);
      onSuccess()
      onClose();
    } else {
      console.log("Error:", response.data.msg);
      alert(`Terjadi kesalahaan saat ${isEditMode ? 'memperbarui' : 'menyimpan'} data`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md mx-4">
        <form onSubmit={handleSubmit}>
          <div className="p-5 border-b"><h2 className="text-xl font-bold text-gray-800">{getTitle()}</h2></div>
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
                <InputField name="kode_negara" id="kode" value={formData.kode_negara} onChange={handleChange} placeholder="Contoh: RI" required />
              </div>
            )}
            <div>
              <Label htmlFor="nama">Nama {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</Label>
              <InputField name={`nama_${activeTab}`} id="nama" value={formData.nama_negara} onChange={handleChange} required />
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

export default DaerahFormModal;