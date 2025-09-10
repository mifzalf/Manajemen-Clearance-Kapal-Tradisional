import Label from '../form/Label';
import InputField from '../form/InputField';
import Select from '../form/Select';
import Button from '../ui/Button';

const Step1DataKapal = ({ formData, setFormData, nextStep, handleKapalChange, kapalOptions, nahkodaOptions, kabupatenOptions, kecamatanOptions, agenOptions, jenisPpkOptions }) => {

  console.log(formData)

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'kapalId') {
      handleKapalChange(value);
    } else if (name === "no_spb_asal") {
      setFormData(prev => ({
        ...prev,
        spb: {
          ...prev.spb,
          no_spb_asal: value
        }
      }))
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
    nextStep();
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
          <div><Label htmlFor="jenisPpk">Jenis PPK</Label><Select id="jenisPpk" name="ppk" value={formData.ppk} onChange={handleChange} options={createOptions(jenisPpkOptions, 'Pilih Jenis PPK')} required /></div>
          <div><Label htmlFor="noSpbAsal">No SPB Asal</Label><InputField id="noSpbAsal" name="no_spb_asal" value={formData.spb?.no_spb_asal} onChange={handleChange} required /></div>
          <div><Label htmlFor="tanggalClearance">Tanggal Clearance</Label><InputField id="tanggalClearance" name="tanggal_clearance" type="date" value={formData.tanggal_clearance} onChange={handleChange} required /></div>
          <div><Label htmlFor="pukulClearance">Pukul Clearance</Label><InputField id="pukulClearance" name="pukul_agen_clearance" type="time" value={formData.pukul_agen_clearance} onChange={handleChange} required /></div>
        </div>
      </div>
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-800">Data Kapal & Awak</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div><Label htmlFor="kapalId">Nama Kapal</Label><Select id="kapalId" name="id_kapal" value={formData.id_kapal} onChange={handleChange} options={createOptions(kapalOptions, 'Pilih Kapal')} required /></div>
          <div><Label htmlFor="nahkodaId">Nama Nahkoda</Label><Select id="nahkodaId" name="id_nahkoda" value={formData.id_nahkoda} onChange={handleChange} options={createOptions(nahkodaOptions, 'Pilih Nahkoda')} required /></div>
          <div><Label htmlFor="jumlahCrew">Jumlah Crew</Label><InputField id="jumlahCrew" name="jumlah_crew" type="number" value={formData.jumlah_crew} onChange={handleChange} required /></div>
        </div>
      </div>

      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-800">Data Perjalanan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div><Label htmlFor="kedudukanKapal">Kedudukan Kapal</Label><Select id="kedudukanKapal" name="id_kedudukan_kapal" value={formData.id_kedudukan_kapal} onChange={handleChange} options={createOptions(kabupatenOptions, 'Pilih Kedudukan')} required /></div>
          <div><Label htmlFor="datangDari">Datang Dari</Label><Select id="datangDari" name="id_datang_dari" value={formData.id_datang_dari} onChange={handleChange} options={createOptions(kecamatanOptions, 'Pilih Asal')} required /></div>
          <div><Label htmlFor="tanggalDatang">Tanggal Datang</Label><InputField id="tanggalDatang" name="tanggal_datang" type="date" value={formData.tanggal_datang} onChange={handleChange} required /></div>
          <div><Label htmlFor="tujuanAkhir">Tujuan Akhir</Label><Select id="tujuanAkhir" name="id_tujuan_akhir" value={formData.id_tujuan_akhir} onChange={handleChange} options={createOptions(kecamatanOptions, 'Pilih Tujuan')} required /></div>
          <div><Label htmlFor="tanggalBerangkat">Tanggal Berangkat</Label><InputField id="tanggalBerangkat" name="tanggal_berangkat" type="date" value={formData.tanggal_berangkat} onChange={handleChange} required /></div>
          <div><Label htmlFor="pukulKapalBerangkat">Pukul Berangkat</Label><InputField id="pukulKapalBerangkat" name="pukul_kapal_berangkat" type="time" value={formData.pukul_kapal_berangkat} onChange={handleChange} required /></div>
          <div className="md:col-span-2"><Label htmlFor="agenKapalId">Agen Kapal</Label><Select id="agenKapalId" name="id_agen" value={formData.id_agen} onChange={handleChange} options={createOptions(agenOptions, 'Pilih Agen')} required /></div>
          <div><Label htmlFor="tempatSinggah">Tempat Singgah (Opsional)</Label><Select id="tempatSinggah" name="id_tempat_singgah" value={formData.id_tempat_singgah} onChange={handleChange} options={createOptions(kecamatanOptions, 'Pilih Tempat Singgah')} /></div>
          <div>
            <Label>Status Muatan Berangkat</Label>
            <div className="flex gap-4 h-11 items-center">
              <label className="flex items-center"><input type="radio" name="status_muatan_berangkat" value="NIHIL" checked={formData.status_muatan_berangkat === 'NIHIL'} onChange={handleChange} className="mr-2" />Kosong</label>
              <label className="flex items-center"><input type="radio" name="status_muatan_berangkat" value="SESUAI MANIFEST" checked={formData.status_muatan_berangkat === 'SESUAI MANIFEST'} onChange={handleChange} className="mr-2" />Ada Muatan</label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="button" onClick={handleNext}>
          Berikutnya
        </Button>
      </div>
    </div>
  );
};

export default Step1DataKapal;