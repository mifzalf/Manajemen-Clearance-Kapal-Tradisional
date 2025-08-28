import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Step1DataKapal from '../../components/clearance/Step1DataKapal';
import Step2DataMuatan from '../../components/clearance/Step2DataMuatan';

// ... (semua data contoh Anda tetap sama)
const sampleKapalData = [
  { id: 1, nama: 'KM. Sejahtera Abadi', jenis: 'General Cargo', bendera: 'Indonesia', gt: 500, nt: 350, nomorSelar: '123/Abc', tandaSelar: 'GT.500', nomorImo: 'IMO9876543', callSign: 'ABCD' },
  { id: 2, nama: 'MT. Cahaya Bintang', jenis: 'Tanker', bendera: 'Indonesia', gt: 1200, nt: 800, nomorSelar: '456/Def', tandaSelar: 'GT.1200', nomorImo: 'IMO1234567', callSign: 'EFGH' },
];
const sampleNahkodaData = [{ id: 1, nama: 'Capt. Budi Santoso' }, { id: 2, nama: 'Capt. Agus Wijaya' }];
const sampleKabupatenData = [{ id: 1, nama: 'Kabupaten Sumenep' }, { id: 2, nama: 'Kota Surabaya' }];
const sampleKecamatanData = [{ id: 1, nama: 'Kalianget' }, { id: 2, nama: 'Kota Sumenep' }];
const sampleAgenData = [{ id: 1, nama: 'PT. Laut Biru Nusantara' }, { id: 2, nama: 'CV. Samudera Jaya' }];
const sampleMuatanData = [
  { id: 1, nama: 'LPG (Liquefied Petroleum Gas)'},
  { id: 2, nama: 'Semen Curah' },
  { id: 3, nama: 'Batu Bara' },
];
const sampleJenisPkk = [{id: 1, nama: 'Dalam Negeri'}, {id: 2, nama: 'Luar Negeri'}];

const sampleClearanceDetailData = { 
    id: 1, jenisPkk: '1', noSpbAsal: '123/SPB-LMG/08-2025', tanggalClearance: '2025-08-20', pukulClearance: '09:45', 
    kapalId: 1, nahkodaId: 2, jumlahCrew: 12, 
    kedudukanKapal: 1, datangDari: 2, tanggalDatang: '2025-08-19', tanggalBerangkat: '2025-08-20', pukulKapalBerangkat: '14:00', tempatSinggah: 2, tujuanAkhir: 1, agenKapalId: 1, 
    statusMuatan: 'Ada Muatan', 
    barangDatang: [ { muatanId: 2, satuan: 'Ton', jumlah: 10 } ],
    barangBerangkat: [ { muatanId: 3, satuan: 'Ton', jumlah: 50 } ] 
};
const initialState = {
    jenisPkk: '', noSpbAsal: '', tanggalClearance: '', pukulClearance: '',
    kapalId: '', jenisKapal: '', negaraAsal: '', gt: '', nt: '', nomorSelar: '', tandaSelar: '', nomorImo: '', callSign: '',
    nahkodaId: '', jumlahCrew: '',
    kedudukanKapal: '', datangDari: '', tanggalDatang: '', tanggalBerangkat: '', pukulKapalBerangkat: '', tempatSinggah: '', tujuanAkhir: '', agenKapalId: '',
    statusMuatan: 'Kosong', barangDatang: [], barangBerangkat: [],
};


const FormClearance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const formRef = useRef(null);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialState);
  
  useEffect(() => {
    if (isEditMode) {
      const dataToEdit = { ...initialState, ...sampleClearanceDetailData };
      const selectedKapal = sampleKapalData.find(k => k.id === dataToEdit.kapalId);
      if (selectedKapal) {
          Object.assign(dataToEdit, selectedKapal);
      }
      setFormData(dataToEdit);
    }
  }, [id, isEditMode]);

  const handleKapalChange = (kapalId) => {
    const selectedKapal = sampleKapalData.find(k => k.id === parseInt(kapalId));
    if (selectedKapal) {
      setFormData(prev => ({...prev, ...selectedKapal, kapalId: selectedKapal.id}));
    } else {
      setFormData(prev => ({ ...prev, kapalId: '', jenisKapal: '', negaraAsal: '', gt: '', nt: '', nomorSelar: '', tandaSelar: '', nomorImo: '', callSign: '' }))
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formRef.current?.checkValidity()) {
        formRef.current?.reportValidity();
        return;
    }
    let {barangBerangkat, barangDatang, ...cleanData} = formData
    let newData = {
      ...cleanData,
      muatan: [...formData.barangBerangkat, ...formData.barangDatang]
    }
    console.log("Formulir Lengkap Disubmit:", newData);
    toast.success(`Data Clearance berhasil ${isEditMode ? 'diperbarui' : 'disimpan'}!`);
    if (isEditMode) {
      navigate(`/clearance/${id}`);
    } else {
      navigate('/clearance');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">{isEditMode ? 'Edit' : 'Formulir'} Surat Persetujuan Berlayar</h1>
      <div className="w-full">
        <ol className="flex items-center w-full">
          <li className={`flex w-full items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-500'} after:content-[''] after:w-full after:h-1 after:border-b ${step > 1 ? 'after:border-blue-600' : 'after:border-gray-200'} after:border-4 after:inline-block`}>
            <span className={`flex items-center justify-center w-10 h-10 ${step >= 1 ? 'bg-blue-100' : 'bg-gray-100'} rounded-full lg:h-12 lg:w-12 shrink-0`}>1</span>
          </li>
          <li className={`flex items-center w-auto`}>
            <span className={`flex items-center justify-center w-10 h-10 ${step >= 2 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'} rounded-full lg:h-12 lg:w-12 shrink-0`}>2</span>
          </li>
        </ol>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <form ref={formRef} onSubmit={handleSubmit}>
          {step === 1 && (
            <Step1DataKapal
              formData={formData} setFormData={setFormData}
              nextStep={nextStep} handleSubmit={handleSubmit}
              handleKapalChange={handleKapalChange} kapalOptions={sampleKapalData}
              nahkodaOptions={sampleNahkodaData} kabupatenOptions={sampleKabupatenData}
              kecamatanOptions={sampleKecamatanData} agenOptions={sampleAgenData}
              jenisPkkOptions={sampleJenisPkk}
            />
          )}
          {step === 2 && (
            <Step2DataMuatan
              formData={formData} setFormData={setFormData}
              prevStep={prevStep} muatanOptions={sampleMuatanData}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default FormClearance;