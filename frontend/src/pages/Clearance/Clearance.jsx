import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import ClearanceTable from '../../components/table/ClearanceTable';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import InputField from '../../components/form/InputField';

const sampleClearanceData = [
  { id: 1, nomorSpb: 'SPB/2025/08/001', namaKapal: 'KM. Sejahtera Abadi', tujuan: 'Pelabuhan Surabaya', tglBerangkat: '2025-08-15', agen: 'PT. Laut Biru Nusantara', kategoriBarang: 'Umum', muatan: ['Semen', 'Kerupuk', 'Air Mineral'] },
  { id: 2, nomorSpb: 'SPB/2025/08/002', namaKapal: 'KM. Cahaya Timur', tujuan: 'Pelabuhan Makassar', tglBerangkat: '2025-08-16', agen: 'CV. Samudera Jaya', kategoriBarang: 'Berbahaya', muatan: ['Solar', 'Minyak Tanah'] },
  { id: 3, nomorSpb: 'SPB/2025/08/003', namaKapal: 'KM. Bintang Fajar', tujuan: 'Pelabuhan Banjarmasin', tglBerangkat: '2025-08-17', agen: 'PT. Laut Biru Nusantara', kategoriBarang: 'Cair', muatan: ['Minyak Goreng', 'CPO'] },
  { id: 4, nomorSpb: 'SPB/2025/08/004', namaKapal: 'KM. Sejahtera Abadi', tujuan: 'Pelabuhan Jakarta', tglBerangkat: '2025-08-18', agen: 'PT. Laut Biru Nusantara', kategoriBarang: 'Curah', muatan: ['Beras', 'Gula Pasir', 'Kerupuk'] },
];

const customStyles = {
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: '#E0E7FF', // Warna biru muda (mirip indigo-100 di Tailwind)
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: '#374151', // Warna teks (mirip gray-700 di Tailwind)
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: '#4F46E5', // Warna ikon 'x' (mirip indigo-600 di Tailwind)
    ':hover': {
      backgroundColor: '#4F46E5',
      color: 'white',
    },
  }),
};

function Clearance() {
  const [clearanceData, setClearanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    searchTerm: '',
    selectedShip: '',
    startDate: '',
    endDate: '',
    selectedCategory: '',
    selectedGoods: [],
  });

  useEffect(() => {
    setTimeout(() => {
      setClearanceData(sampleClearanceData);
      setLoading(false);
    }, 500);
  }, []);
  
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const uniqueShips = useMemo(() => [...new Set(clearanceData.map(item => item.namaKapal))], [clearanceData]);
  const uniqueCategories = useMemo(() => [...new Set(clearanceData.map(item => item.kategoriBarang))], [clearanceData]);
  const uniqueGoodsOptions = useMemo(() => {
    const allGoods = new Set(clearanceData.flatMap(item => item.muatan));
    return [...allGoods].map(good => ({ value: good, label: good }));
  }, [clearanceData]);

  const filteredData = useMemo(() => {
    return clearanceData.filter(item => {
      const searchTerm = filters.searchTerm.toLowerCase();
      const searchMatch = !searchTerm ||
        item.nomorSpb.toLowerCase().includes(searchTerm) ||
        item.namaKapal.toLowerCase().includes(searchTerm) ||
        item.tujuan.toLowerCase().includes(searchTerm) ||
        item.agen.toLowerCase().includes(searchTerm);

      const shipMatch = !filters.selectedShip || item.namaKapal === filters.selectedShip;
      
      const dateMatch = (!filters.startDate || item.tglBerangkat >= filters.startDate) && 
                        (!filters.endDate || item.tglBerangkat <= filters.endDate);
      
      const categoryMatch = !filters.selectedCategory || item.kategoriBarang === filters.selectedCategory;

      const goodsMatch = filters.selectedGoods.length === 0 || 
                         filters.selectedGoods.some(selected => item.muatan.includes(selected.value));

      return searchMatch && shipMatch && dateMatch && categoryMatch && goodsMatch;
    });
  }, [filters, clearanceData]);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Clearance</h1>
        <Link 
          to="/clearance/add" 
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors"
        >
          + Tambah Data
        </Link>
      </div>
      
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-1 items-end gap-4 border-b border-gray-200 p-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-4">
            <SearchBar 
              searchTerm={filters.searchTerm}
              setSearchTerm={(value) => handleFilterChange('searchTerm', value)}
              placeholder="Cari no. SPB, kapal, tujuan, agen..."
            />
          </div>
          <FilterDropdown
            options={uniqueShips}
            selectedValue={filters.selectedShip}
            setSelectedValue={(value) => handleFilterChange('selectedShip', value)}
            placeholder="Semua Kapal"
          />
          <FilterDropdown
            options={uniqueCategories}
            selectedValue={filters.selectedCategory}
            setSelectedValue={(value) => handleFilterChange('selectedCategory', value)}
            placeholder="Kategori Barang"
          />
          <div className="flex items-center gap-2 lg:col-span-2">
            <InputField type="date" name="startDate" value={filters.startDate} onChange={(e) => handleFilterChange(e.target.name, e.target.value)} />
            <span className="text-gray-500">-</span>
            <InputField type="date" name="endDate" value={filters.endDate} onChange={(e) => handleFilterChange(e.target.name, e.target.value)} />
          </div>
          <div className="lg:col-span-4">
             <Select
                isMulti
                name="selectedGoods"
                options={uniqueGoodsOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Pilih satu atau lebih barang..."
                value={filters.selectedGoods}
                onChange={(selectedOptions) => handleFilterChange('selectedGoods', selectedOptions)}
                styles={customStyles}
              />
          </div>
        </div>
        {loading ? (
          <p className="text-center text-gray-500 py-10">Memuat data...</p>
        ) : (
          <ClearanceTable clearanceItems={filteredData} />
        )}
      </div>
    </div>
  );
}

export default Clearance;