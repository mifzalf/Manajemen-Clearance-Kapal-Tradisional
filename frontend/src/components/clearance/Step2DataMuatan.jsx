import Label from '../form/Label';
import Select from '../form/Select';
import InputField from '../form/InputField';
import Button from '../ui/Button';

const Step2DataMuatan = ({ formData, setFormData, prevStep, muatanOptions }) => {
  console.log(formData)
  const satuanOptions = [
    { value: '', label: 'Pilih Satuan'},
    { value: 'Kg', label: 'Kg' },
    { value: 'Ton', label: 'Ton' },
    { value: 'Liter', label: 'Liter' },
    { value: 'Unit', label: 'Unit' },
  ];

  const handleMuatanChange = (type, index, e) => {
    const { name, value } = e.target;
    const list = [...formData[type]];
    list[index][name] = value;
    setFormData(prev => ({ ...prev, [type]: list }));
  };

  const addMuatan = (type) => {
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], { id_kategori_muatan: '', satuan_muatan: '', jumlah_muatan: '', jenis_perjalanan: type == 'barangDatang' ? 'datang' : 'berangkat' }]
    }));
  };
  
  const removeMuatan = (type, index) => {
    const list = [...formData[type]];
    list.splice(index, 1);
    setFormData(prev => ({ ...prev, [type]: list }));
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-800">Data Muatan (Barang Datang)</h3>
        {formData.barangDatang.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end">
            <div>
              <Label>Nama Muatan</Label>
              <Select name="id_kategori_muatan" value={item.id_kategori_muatan} onChange={e => handleMuatanChange('barangDatang', index, e)} options={[{value: '', label: 'Pilih Muatan'}, ...muatanOptions.map(k => ({value: k.id, label: k.nama}))]} />
            </div>
            <div>
              <Label>Satuan</Label>
              <Select name="satuan_muatan" value={item.satuan_muatan} onChange={e => handleMuatanChange('barangDatang', index, e)} options={satuanOptions} />
            </div>
            <div>
              <Label>Jumlah</Label>
              <InputField name="jumlah_muatan" type="number" value={item.jumlah_muatan} onChange={e => handleMuatanChange('barangDatang', index, e)} />
            </div>
            <button type="button" onClick={() => removeMuatan('barangDatang', index)} className="bg-red-500 text-white px-3 py-2 rounded-md h-11">Hapus</button>
          </div>
        ))}
        <button type="button" onClick={() => addMuatan('barangDatang')} className="mt-4 text-sm bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
          + Tambah Baris
        </button>
      </div>
      {formData.status_muatan_berangkat === 'SESUAI MANIFEST' && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Data Muatan (Barang Berangkat)</h3>
          {formData.barangBerangkat.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end">
                <div>
                <Label>Nama Muatan</Label>
                <Select name="id_kategori_muatan" value={item.id_kategori_muatan} onChange={e => handleMuatanChange('barangBerangkat', index, e)} options={[{value: '', label: 'Pilih Muatan'}, ...muatanOptions.map(k => ({value: k.id, label: k.nama}))]} />
              </div>
              <div>
                <Label>Satuan</Label>
                <Select name="satuan_muatan" value={item.satuan_muatan} onChange={e => handleMuatanChange('barangBerangkat', index, e)} options={satuanOptions} />
              </div>
              <div>
                <Label>Jumlah</Label>
                <InputField name="jumlah_muatan" type="number" value={item.jumlah_muatan} onChange={e => handleMuatanChange('barangBerangkat', index, e)} />
              </div>
              <button type="button" onClick={() => removeMuatan('barangBerangkat', index)} className="bg-red-500 text-white px-3 py-2 rounded-md h-11">Hapus</button>
            </div>
          ))}
          <button type="button" onClick={() => addMuatan('barangBerangkat')} className="mt-4 text-sm bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
            + Tambah Baris
          </button>
        </div>
      )}

      <div className="flex justify-between pt-4 border-t">
        <Button type="button" variant="secondary" onClick={prevStep}>Sebelumnya</Button>
        <Button type="submit">Simpan Clearance</Button>
      </div>
    </div>
  );
};

export default Step2DataMuatan;