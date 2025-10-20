import Label from '../form/Label';
import Select from '../form/Select';
import InputField from '../form/InputField';
import Button from '../ui/Button';

const Step2DataMuatan = ({ formData, setFormData, prevStep, muatanOptions }) => {
  const satuanOptions = [
    { value: '', label: 'Pilih Satuan'},
    { value: 'Kg', label: 'Kg' },
    { value: 'Ton', label: 'Ton' },
    { value: 'Liter', label: 'Liter' },
    { value: 'Unit', label: 'Unit' },
  ];

  const golonganOptions = [
    { value: '', label: 'Pilih Golongan' },
    { value: 'I', label: 'Golongan I' },
    { value: 'II', label: 'Golongan II' },
    { value: 'III', label: 'Golongan III' },
    { value: 'IV', label: 'Golongan IV' },
    { value: 'V', label: 'Golongan V' },
    { value: 'VI', label: 'Golongan VI' },
  ];
  const handleGlobalChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleRowChange = (type, index, e) => {
    const { name, value } = e.target;
    const list = [...(formData[type] || [])];
    list[index] = { ...list[index], [name]: value };
    setFormData(prev => ({ ...prev, [type]: list }));
  };
  const removeRow = (type, index) => {
    const list = [...formData[type]];
    list.splice(index, 1);
    setFormData(prev => ({ ...prev, [type]: list }));
  };
  const addRow = (listType, itemType) => {
    const jenisPerjalanan = listType === 'barangDatang' ? 'datang' : 'berangkat';
    let newItem;

    if (itemType === 'kendaraan') {
      newItem = { type: 'kendaraan', golongan_kendaraan: '', jumlah_kendaraan: '', jenis_perjalanan: jenisPerjalanan };
    } else {
      newItem = { type: 'barang', id_kategori_muatan: '', satuan_muatan: '', jumlah_muatan: '', jenis_perjalanan: jenisPerjalanan };
    }

    setFormData(prev => ({
      ...prev,
      [listType]: [...(prev[listType] || []), newItem]
    }));
  };
  const renderRow = (item, index, listType) => {
    switch (item.type) {
      case 'kendaraan':
        return (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end">
            <div>
              <Label>Kendaraan</Label>
              <div className="h-11 flex items-center px-3 border rounded-lg bg-gray-100 text-gray-600">Unit Kendaraan</div>
            </div>
            <div>
              <Label>Golongan</Label>
              <Select name="golongan_kendaraan" value={item.golongan_kendaraan || ''} onChange={e => handleRowChange(listType, index, e)} options={golonganOptions} required />
            </div>
            <div>
              <Label>Jumlah</Label>
              <InputField name="jumlah_kendaraan" type="number" value={item.jumlah_kendaraan || ''} onChange={e => handleRowChange(listType, index, e)} required />
            </div>
            <button type="button" onClick={() => removeRow(listType, index)} className="bg-red-500 text-white px-3 py-2 rounded-md h-11">Hapus</button>
          </div>
        );
      default:
        return (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end">
            <div>
              <Label>Nama Muatan</Label>
              <Select name="id_kategori_muatan" value={item.id_kategori_muatan || ''} onChange={e => handleRowChange(listType, index, e)} options={[{value: '', label: 'Pilih Muatan'}, ...muatanOptions.map(k => ({value: k.id, label: k.nama}))]} required />
            </div>
            <div>
              <Label>Satuan</Label>
              <Select name="satuan_muatan" value={item.satuan_muatan || ''} onChange={e => handleRowChange(listType, index, e)} options={satuanOptions} required />
            </div>
            <div>
              <Label>Jumlah</Label>
              <InputField name="jumlah_muatan" type="number" value={item.jumlah_muatan || ''} onChange={e => handleRowChange(listType, index, e)} required />
            </div>
            <button type="button" onClick={() => removeRow(listType, index)} className="bg-red-500 text-white px-3 py-2 rounded-md h-11">Hapus</button>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-800">Data Muatan (Datang)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="penumpang_turun">Jumlah Penumpang Turun</Label>
            <InputField 
              name="penumpang_turun" 
              id="penumpang_turun" 
              type="number" 
              value={formData.penumpang_turun || ''} 
              onChange={handleGlobalChange} 
              placeholder="Jumlah orang" 
            />
          </div>
        </div>
        <h4 className="text-md font-semibold text-gray-700 mt-6">Barang & Kendaraan (Datang)</h4>
        {(formData.barangDatang || []).map((item, index) => renderRow(item, index, 'barangDatang'))}
        <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => addRow('barangDatang', 'barang')} className="text-sm bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
              + Tambah Barang
            </button>
            <button type="button" onClick={() => addRow('barangDatang', 'kendaraan')} className="text-sm bg-green-100 text-green-700 px-4 py-2 rounded-md hover:bg-green-200">
              + Tambah Kendaraan
            </button>
        </div>
      </div>
      {formData.status_muatan_berangkat === 'SESUAI MANIFEST' && (
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-800">Data Muatan (Berangkat)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="penumpang_naik">Jumlah Penumpang Naik</Label>
              <InputField 
                name="penumpang_naik" 
                id="penumpang_naik" 
                type="number" 
                value={formData.penumpang_naik || ''} 
                onChange={handleGlobalChange} 
                placeholder="Jumlah orang" 
              />
            </div>
          </div>
          <h4 className="text-md font-semibold text-gray-700 mt-6">Barang & Kendaraan (Berangkat)</h4>
          {(formData.barangBerangkat || []).map((item, index) => renderRow(item, index, 'barangBerangkat'))}
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => addRow('barangBerangkat', 'barang')} className="text-sm bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
              + Tambah Barang
            </button>
            <button type="button" onClick={() => addRow('barangBerangkat', 'kendaraan')} className="text-sm bg-green-100 text-green-700 px-4 py-2 rounded-md hover:bg-green-200">
              + Tambah Kendaraan
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-between pt-4 border-t mt-6">
        <Button type="button" variant="secondary" onClick={prevStep}>Sebelumnya</Button>
        <Button type="submit">Simpan Clearance</Button>
      </div>
    </div>
  );
};

export default Step2DataMuatan;