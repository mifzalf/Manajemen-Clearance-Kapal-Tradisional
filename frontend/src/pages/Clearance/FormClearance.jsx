import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Label from '../../components/form/Label';
import InputField from '../../components/form/InputField';
import Select from '../../components/form/Select';
import TextArea from '../../components/form/TextArea';
import Button from '../../components/ui/Button';
import FileInput from '../../components/form/FileInput';

const classificationOptions = [
  { value: '', label: 'Pilih Klasifikasi' },
  { value: 'Biasa', label: 'Biasa' },
  { value: 'Penting', label: 'Penting' },
  { value: 'Rahasia', label: 'Rahasia' },
];

const FormClearance = () => {
  const [formData, setFormData] = useState({
    agendaId: '',
    sender: '',
    letterNumber: '',
    letterDate: '',
    receivedDate: '',
    summary: '',
    classification: '',
    remarks: '',
    file: null,
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFormData({ ...formData, file: e.target.files[0] });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Clearance:", formData);
    alert('Data Clearance Disimpan!');
  };

  return (
    <div className="space-y-6">
      <Link to="/clearance" className="text-sm text-gray-500 hover:text-brand-500">&larr; Kembali ke Clearance</Link>
      <h1 className="text-2xl font-bold text-gray-800">Formulir Clearance</h1>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="agendaId">ID Agenda</Label>
            <InputField name="agendaId" id="agendaId" onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="sender">Pengirim / Agen</Label>
            <InputField name="sender" id="sender" onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="letterNumber">Nomor Surat</Label>
            <InputField name="letterNumber" id="letterNumber" onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="classification">Kode Klasifikasi</Label>
            <Select name="classification" id="classification" options={classificationOptions} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="letterDate">Tanggal Surat</Label>
            <InputField type="date" name="letterDate" id="letterDate" onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="receivedDate">Tanggal Diterima</Label>
            <InputField type="date" name="receivedDate" id="receivedDate" onChange={handleChange} required />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="summary">Ringkasan Isi</Label>
            <TextArea name="summary" id="summary" rows="3" onChange={handleChange}></TextArea>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="remarks">Keterangan Tambahan</Label>
            <TextArea name="remarks" id="remarks" rows="3" onChange={handleChange}></TextArea>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="file">Lampiran File</Label>
            <FileInput name="file" id="file" onChange={handleFileChange} />
          </div>
          <div className="md:col-span-2 flex justify-end gap-3">
            <Button to="/clearance" variant="secondary">Batal</Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormClearance;