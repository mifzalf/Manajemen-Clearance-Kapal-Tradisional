import React from 'react';
import Label from '../form/Label';
import InputField from '../form/InputField';
import Select from '../form/Select';
import Button from '../ui/Button';

const Step1DataKapal = ({ formData, setFormData, nextStep, handleSubmit, handleKapalChange, kapalOptions, nahkodaOptions, kabupatenOptions, kecamatanOptions, agenOptions, jenisPkkOptions }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'kapalId') {
      handleKapalChange(value);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => {
    const form = document.querySelector('form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    if (formData.statusMuatan === 'Ada Muatan') {
        nextStep();
    } else {
        handleSubmit(new Event('submit', { cancelable: true }));
    }
  };
  
  const createOptions = (items, placeholder) => [
    { value: '', label: placeholder, disabled: true },
    ...items.map(item => ({ value: item.id, label: item.nama }))
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-800">Data Clearance</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div><Label htmlFor="jenisPpk">Jenis PKK</Label><Select id="jenisPpk" name="jenisPpk" value={formData.jenisPpk} onChange={handleChange} options={createOptions(jenisPkkOptions, 'Pilih Jenis PKK')} required /></div>
          <div><Label htmlFor="noSpbAsal">No SPB Asal</Label><InputField id="noSpbAsal" name="noSpbAsal" value={formData.noSpbAsal} onChange={handleChange} required /></div>
          <div><Label htmlFor="tanggalClearance">Tanggal Clearance</Label><InputField id="tanggalClearance" name="tanggalClearance" type="date" value={formData.tanggalClearance} onChange={handleChange} required /></div>
          <div><Label htmlFor="pukulClearance">Pukul Clearance</Label><InputField id="pukulClearance" name="pukulClearance" type="time" value={formData.pukulClearance} onChange={handleChange} required /></div>
        </div>
      </div>
      
       <div className="border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-800">Data Kapal & Awak</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div><Label htmlFor="kapalId">Nama Kapal</Label><Select id="kapalId" name="kapalId" value={formData.kapalId} onChange={handleChange} options={createOptions(kapalOptions, 'Pilih Kapal')} required /></div>
          <div><Label htmlFor="nahkodaId">Nama Nahkoda</Label><Select id="nahkodaId" name="nahkodaId" value={formData.nahkodaId} onChange={handleChange} options={createOptions(nahkodaOptions, 'Pilih Nahkoda')} required /></div>
          <div><Label htmlFor="jumlahCrew">Jumlah Crew</Label><InputField id="jumlahCrew" name="jumlahCrew" type="number" value={formData.jumlahCrew} onChange={handleChange} required /></div>
        </div>
      </div>
      
       <div className="border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-800">Data Perjalanan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div><Label htmlFor="kedudukanKapal">Kedudukan Kapal</Label><Select id="kedudukanKapal" name="kedudukanKapal" value={formData.kedudukanKapal} onChange={handleChange} options={createOptions(kabupatenOptions, 'Pilih Kedudukan')} required/></div>
            <div><Label htmlFor="datangDari">Datang Dari</Label><Select id="datangDari" name="datangDari" value={formData.datangDari} onChange={handleChange} options={createOptions(kabupatenOptions, 'Pilih Asal')} required/></div>
            <div><Label htmlFor="tanggalDatang">Tanggal Datang</Label><InputField id="tanggalDatang" name="tanggalDatang" type="date" value={formData.tanggalDatang} onChange={handleChange} required/></div>
            <div><Label htmlFor="tujuanAkhir">Tujuan Akhir</Label><Select id="tujuanAkhir" name="tujuanAkhir" value={formData.tujuanAkhir} onChange={handleChange} options={createOptions(kabupatenOptions, 'Pilih Tujuan')} required/></div>
            <div><Label htmlFor="tanggalBerangkat">Tanggal Berangkat</Label><InputField id="tanggalBerangkat" name="tanggalBerangkat" type="date" value={formData.tanggalBerangkat} onChange={handleChange} required/></div>
            <div><Label htmlFor="pukulKapalBerangkat">Pukul Berangkat</Label><InputField id="pukulKapalBerangkat" name="pukulKapalBerangkat" type="time" value={formData.pukulKapalBerangkat} onChange={handleChange} required/></div>
            <div className="md:col-span-2"><Label htmlFor="agenKapalId">Agen Kapal</Label><Select id="agenKapalId" name="agenKapalId" value={formData.agenKapalId} onChange={handleChange} options={createOptions(agenOptions, 'Pilih Agen')} required/></div>
            <div><Label htmlFor="tempatSinggah">Tempat Singgah (Opsional)</Label><Select id="tempatSinggah" name="tempatSinggah" value={formData.tempatSinggah} onChange={handleChange} options={createOptions(kecamatanOptions, 'Pilih Tempat Singgah')} /></div>
            <div>
              <Label>Status Muatan Berangkat</Label>
              <div className="flex gap-4 h-11 items-center">
                <label className="flex items-center"><input type="radio" name="statusMuatan" value="Kosong" checked={formData.statusMuatan === 'Kosong'} onChange={handleChange} className="mr-2"/>Kosong</label>
                <label className="flex items-center"><input type="radio" name="statusMuatan" value="Ada Muatan" checked={formData.statusMuatan === 'Ada Muatan'} onChange={handleChange} className="mr-2"/>Ada Muatan</label>
              </div>
            </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button type="button" onClick={handleNext}>
          {formData.statusMuatan === 'Ada Muatan' ? 'Berikutnya' : 'Simpan'}
        </Button>
      </div>
    </div>
  );
};

export default Step1DataKapal;