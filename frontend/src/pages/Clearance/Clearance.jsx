import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import * as XLSX from 'xlsx';
import ClearanceTable from '../../components/table/ClearanceTable';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import InputField from '../../components/form/InputField';
import Pagination from '../../components/ui/Pagination';
import PrintableClearanceList from '../../components/clearance/PrintableClearanceList';

// ... (sampleClearanceData, customStyles, dan rowsPerPageOptions tetap sama) ...
const sampleClearanceData = [
    { id: 1, nomorSpb: 'SPB/08/001', namaKapal: 'KM. Sejahtera Abadi', tujuan: 'Surabaya', tglBerangkat: '2025-08-15', agen: 'PT. Laut Biru', kategoriBarang: 'Umum', muatan: ['Semen', 'Kerupuk'] },
    { id: 2, nomorSpb: 'SPB/08/002', namaKapal: 'KM. Sentosa', tujuan: 'Makassar', tglBerangkat: '2025-08-16', agen: 'CV. Samudera', kategoriBarang: 'Berbahaya', muatan: ['Solar'] },
    { id: 3, nomorSpb: 'SPB/08/003', namaKapal: 'KM. Bahari', tujuan: 'Banjarmasin', tglBerangkat: '2025-08-17', agen: 'PT. Laut Biru', kategoriBarang: 'Cair', muatan: ['Minyak Goreng'] },
    { id: 4, nomorSpb: 'SPB/08/004', namaKapal: 'KM. Pelita Jaya', tujuan: 'Jakarta', tglBerangkat: '2025-08-18', agen: 'PT. Pelita', kategoriBarang: 'Curah', muatan: ['Beras'] },
    { id: 5, nomorSpb: 'SPB/08/005', namaKapal: 'KM. Cahaya Timur', tujuan: 'Ambon', tglBerangkat: '2025-08-19', agen: 'CV. Timur Raya', kategoriBarang: 'Umum', muatan: ['Air Mineral'] },
    { id: 6, nomorSpb: 'SPB/08/006', namaKapal: 'KM. Sentosa', tujuan: 'Bali', tglBerangkat: '2025-08-20', agen: 'CV. Samudera', kategoriBarang: 'Umum', muatan: ['Gula Pasir', 'Kerupuk'] },
    { id: 7, nomorSpb: 'SPB/08/007', namaKapal: 'KM. Sejahtera Abadi', tujuan: 'Surabaya', tglBerangkat: '2025-08-21', agen: 'PT. Laut Biru', kategoriBarang: 'Cair', muatan: ['CPO'] },
    { id: 8, nomorSpb: 'SPB/08/008', namaKapal: 'KM. Bintang Fajar', tujuan: 'Makassar', tglBerangkat: '2025-08-22', agen: 'PT. Bintang', kategoriBarang: 'Berbahaya', muatan: ['Minyak Tanah'] },
    { id: 9, nomorSpb: 'SPB/08/009', namaKapal: 'KM. Bahari', tujuan: 'Banjarmasin', tglBerangkat: '2025-08-23', agen: 'PT. Laut Biru', kategoriBarang: 'Curah', muatan: ['Beras'] },
    { id: 10, nomorSpb: 'SPB/08/010', namaKapal: 'KM. Cahaya Timur', tujuan: 'Ambon', tglBerangkat: '2025-08-24', agen: 'CV. Timur Raya', kategoriBarang: 'Umum', muatan: ['Semen'] },
    { id: 11, nomorSpb: 'SPB/08/011', namaKapal: 'KM. Pelita Jaya', tujuan: 'Jakarta', tglBerangkat: '2025-08-25', agen: 'PT. Pelita', kategoriBarang: 'Umum', muatan: ['Semen'] },
    { id: 12, nomorSpb: 'SPB/08/012', namaKapal: 'KM. Sentosa', tujuan: 'Bali', tglBerangkat: '2025-08-26', agen: 'CV. Samudera', kategoriBarang: 'Berbahaya', muatan: ['Solar'] },
];
const customStyles = {
  multiValue: (styles) => ({ ...styles, backgroundColor: '#E0E7FF' }),
  multiValueLabel: (styles) => ({ ...styles, color: '#374151' }),
  multiValueRemove: (styles) => ({ ...styles, color: '#4F46E5', ':hover': { backgroundColor: '#4F46E5', color: 'white' } }),
};
const rowsPerPageOptions = ['5', '10', '20'];


function Clearance() {
  const [clearanceData, setClearanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ searchTerm: '', selectedShip: '', startDate: '', endDate: '', selectedCategory: '', selectedGoods: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const exportRef = useRef(null);
  
  // ... (semua fungsi useEffect, handler, dan useMemo Anda tetap sama) ...
  useEffect(() => {
    setClearanceData(sampleClearanceData);
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportRef.current && !exportRef.current.contains(event.target)) {
        setIsExportOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [exportRef]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };
  
  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(parseInt(value, 10));
    setCurrentPage(1);
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
      const searchMatch = !searchTerm || item.nomorSpb.toLowerCase().includes(searchTerm) || item.namaKapal.toLowerCase().includes(searchTerm) || item.tujuan.toLowerCase().includes(searchTerm) || item.agen.toLowerCase().includes(searchTerm);
      const shipMatch = !filters.selectedShip || item.namaKapal === filters.selectedShip;
      const dateMatch = (!filters.startDate || item.tglBerangkat >= filters.startDate) && (!filters.endDate || item.tglBerangkat <= filters.endDate);
      const categoryMatch = !filters.selectedCategory || item.kategoriBarang === filters.selectedCategory;
      const goodsMatch = filters.selectedGoods.length === 0 || filters.selectedGoods.some(selected => item.muatan.includes(selected.value));
      return searchMatch && shipMatch && dateMatch && categoryMatch && goodsMatch;
    });
  }, [filters, clearanceData]);
  
  const exportXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Clearance");
    XLSX.writeFile(workbook, `laporan_clearance_${new Date().toISOString().slice(0,10)}.xlsx`);
    setIsExportOpen(false);
  };

  const handlePrintPDF = () => {
    setIsExportOpen(false);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="screen-only">
        <div className="p-4 md:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">Daftar Clearance</h1>
            <div className="flex items-center gap-3">
              <div className="relative" ref={exportRef}>
                <button onClick={() => setIsExportOpen(!isExportOpen)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 w-full sm:w-auto">
                  Ekspor
                </button>
                {isExportOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border z-20">
                    <ul className="p-1">
                      <li onClick={exportXLSX} className="rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        Ekspor ke Excel (XLSX)
                      </li>
                      <li onClick={handlePrintPDF} className="rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        Ekspor ke PDF
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <Link to="/clearance/add" className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors whitespace-nowrap">
                + Tambah Data
              </Link>
            </div>
          </div>
          
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="grid grid-cols-1 items-end gap-4 border-b border-gray-200 p-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="lg:col-span-4"><SearchBar searchTerm={filters.searchTerm} setSearchTerm={(value) => handleFilterChange('searchTerm', value)} placeholder="Cari no. SPB, kapal, tujuan, agen..." /></div>
              <FilterDropdown options={uniqueShips} selectedValue={filters.selectedShip} setSelectedValue={(value) => handleFilterChange('selectedShip', value)} placeholder="Semua Kapal" />
              <FilterDropdown options={uniqueCategories} selectedValue={filters.selectedCategory} setSelectedValue={(value) => handleFilterChange('selectedCategory', value)} placeholder="Kategori Barang" />
              <div className="flex flex-col sm:flex-row items-center gap-2 lg:col-span-2">
                <InputField type="date" name="startDate" value={filters.startDate} onChange={(e) => handleFilterChange(e.target.name, e.target.value)} />
                <span className="text-gray-500 hidden sm:block">-</span>
                <InputField type="date" name="endDate" value={filters.endDate} onChange={(e) => handleFilterChange(e.target.name, e.target.value)} />
              </div>
              <div className="lg:col-span-4"><Select isMulti name="selectedGoods" options={uniqueGoodsOptions} className="basic-multi-select" classNamePrefix="select" placeholder="Pilih satu atau lebih barang..." value={filters.selectedGoods} onChange={(selectedOptions) => handleFilterChange('selectedGoods', selectedOptions)} styles={customStyles} /></div>
            </div>
            
            {loading ? <p className="text-center text-gray-500 py-10">Memuat data...</p> : <ClearanceTable clearanceItems={currentRows} />}
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4">
              <div className="flex items-center gap-2 text-sm">
                <span>Tampilkan</span>
                <FilterDropdown direction="up" selectedValue={String(rowsPerPage)} setSelectedValue={handleRowsPerPageChange} options={rowsPerPageOptions} />
                <span>baris</span>
              </div>
              {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="print-only">
        <PrintableClearanceList data={filteredData} />
      </div>
    </>
  );
}

export default Clearance;