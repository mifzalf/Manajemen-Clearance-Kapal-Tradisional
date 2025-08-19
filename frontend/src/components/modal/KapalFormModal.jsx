import React, { useState, useEffect, useMemo } from 'react';
import Label from '../form/Label';
import InputField from '../form/InputField';
import Select from '../form/Select';
import Button from '../ui/Button';

const KapalFormModal = ({ activeTab, onClose, jenisKapalOptions = [] }) => {
  const [formData, setFormData] = useState({});

  const formattedJenisKapalOptions = useMemo(() => {
    return [
      { value: '', label: 'Pilih Jenis Kapal', disabled: true },
      ...jenisKapalOptions.map(item => ({ value: item.nama, label: item.nama }))
    ];
  }, [jenisKapalOptions]);

  useEffect(() => {
    if (activeTab === 'kapal') {
      setFormData({
        nama: '', jenis: '', bendera: '', gt: '', nt: '',
        nomorSelar: '', tandaSelar: '', nomorImo: '', callSign: ''
      });
    } else {
      setFormData({ nama: '' });
    }
  }, [activeTab]);

  const getTitle = () => {
    return activeTab === 'kapal' ? 'Tambah Data Kapal Baru' : 'Tambah Jenis Kapal Baru';
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
  
  const renderFormContent = () => {
    if (activeTab === 'kapal') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="nama">Nama Kapal</Label>
            <InputField name="nama" id="nama" value={formData.nama || ''} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="jenis">Jenis Kapal</Label>
            <Select name="jenis" id="jenis" value={formData.jenis || ''} onChange={handleChange} options={formattedJenisKapalOptions} required />
          </div>
          <div>
            <Label htmlFor="bendera">Bendera</Label>
            <InputField name="bendera" id="bendera" value={formData.bendera || ''} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="gt">Gross Tonnage (GT)</Label>
            <InputField type="number" name="gt" id="gt" value={formData.gt || ''} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="nt">Net Tonnage (NT)</Label>
            <InputField type="number" name="nt" id="nt" value={formData.nt || ''} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="nomorSelar">Nomor Selar</Label>
            <InputField name="nomorSelar" id="nomorSelar" value={formData.nomorSelar || ''} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="tandaSelar">Tanda Selar</Label>
            <InputField name="tandaSelar" id="tandaSelar" value={formData.tandaSelar || ''} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="nomorImo">Nomor IMO</Label>
            <InputField name="nomorImo" id="nomorImo" value={formData.nomorImo || ''} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="callSign">Call Sign</Label>
            <InputField name="callSign" id="callSign" value={formData.callSign || ''} onChange={handleChange} />
          </div>
        </div>
      );
    }
    
    if (activeTab === 'jenisKapal') {
      return (
        <div>
          <Label htmlFor="nama">Nama Jenis Kapal</Label>
          <InputField name="nama" id="nama" value={formData.nama || ''} onChange={handleChange} placeholder="Contoh: General Cargo" required />
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl mx-4">
        <form onSubmit={handleSubmit}>
          <div className="p-5 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">{getTitle()}</h2>
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
          </div>
          <div className="p-5 max-h-[70vh] overflow-y-auto">
            {renderFormContent()}
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

export default KapalFormModal;