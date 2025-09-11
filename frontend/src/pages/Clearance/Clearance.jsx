import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';
import ClearanceTable from '../../components/table/ClearanceTable';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import InputField from '../../components/form/InputField';
import Pagination from '../../components/ui/Pagination';
import PrintableClearanceList from '../../components/clearance/PrintableClearanceList';
import axiosInstance from '../../api/axiosInstance';
import debounce from 'lodash.debounce';

const customStyles = {
    multiValue: (styles) => ({ ...styles, backgroundColor: '#E0E7FF' }),
    multiValueLabel: (styles) => ({ ...styles, color: '#374151' }),
    multiValueRemove: (styles) => ({ ...styles, color: '#4F46E5', ':hover': { backgroundColor: '#4F46E5', color: 'white' } }),
};

const rowsPerPageOptions = ['5', '10', '20', '50']; // Opsi 'All' dihapus

function Clearance() {
    const [clearanceData, setClearanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    
    const [filterOptions, setFilterOptions] = useState({
        ships: [],
        categories: [],
        goods: [],
    });

    const [filters, setFilters] = useState({
        searchTerm: '',
        selectedShip: '',
        startDate: '',
        endDate: '',
        selectedCategory: '',
        selectedGoods: [],
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isExportOpen, setIsExportOpen] = useState(false);
    const exportRef = useRef(null);

    // Fungsi utama untuk mengambil data dari API, kini mendukung paginasi & filter server-side
    const fetchClearances = useCallback(debounce(async (page, limit, currentFilters) => {
        setLoading(true);
        let endpoint = '/perjalanan';
        let params = {
            page: page,
            limit: limit,
        };

        const hasSpecificFilters = currentFilters.selectedShip || currentFilters.selectedCategory || currentFilters.startDate || currentFilters.endDate || currentFilters.selectedGoods.length > 0;

        // --- INI ADALAH LOGIKA YANG DIPERBAIKI ---
        if (currentFilters.searchTerm) {
            // Jika ada searchTerm, gunakan endpoint search umum
            params.search = currentFilters.searchTerm;
        } else if (hasSpecificFilters) {
            // Jika ada filter spesifik, gunakan endpoint get-filter
            endpoint = '/perjalanan/get-filter';
            Object.assign(params, {
                nama_kapal: currentFilters.selectedShip,
                kategori: currentFilters.selectedCategory,
                tanggal_awal: currentFilters.startDate,
                tanggal_akhir: currentFilters.endDate,
                nama_muatan: currentFilters.selectedGoods.length > 0 ? currentFilters.selectedGoods[0].value : ''
            });
        }
        
        // Hapus parameter yang nilainya kosong
        Object.keys(params).forEach(key => {
            if (!params[key]) delete params[key];
        });

        try {
            const response = await axiosInstance.get(endpoint, { params });
            setClearanceData(response.data.datas);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Gagal mengambil data clearance:', error);
            toast.error("Gagal mengambil data clearance.");
            setClearanceData([]);
            setTotalPages(0);
        } finally {
            setLoading(false);
        }
    }, 500), []);

    // useEffect utama yang memicu pengambilan data setiap kali dependensi berubah
    useEffect(() => {
        fetchClearances(currentPage, rowsPerPage, filters);
    }, [currentPage, rowsPerPage, filters, fetchClearances]);

    // useEffect untuk mengisi opsi filter, hanya berjalan sekali
    useEffect(() => {
        const fetchFilterOptions = async () => {
            try {
                const [shipsRes, muatanRes] = await Promise.all([
                    axiosInstance.get('/kapal/options'),
                    axiosInstance.get('/kategori-muatan/options')
                ]);
                
                setFilterOptions({ 
                    ships: shipsRes.data.datas, 
                    categories: muatanRes.data.datas.categories,
                    goods: muatanRes.data.datas.goods.map(good => ({ value: good, label: good }))
                });
            } catch (error) {
                toast.error("Gagal memuat opsi filter.");
                console.error("Gagal mengambil opsi filter:", error);
            }
        };
        fetchFilterOptions();
    }, []);

    const handleFilterChange = (name, value) => {
        setFilters((prev) => ({ ...prev, [name]: value }));
        setCurrentPage(1);
    };

    const handleRowsPerPageChange = (value) => {
        setRowsPerPage(parseInt(value, 10));
        setCurrentPage(1);
    };
    
    const refreshData = () => {
        fetchClearances(currentPage, rowsPerPage, filters);
    };

    const exportXLSX = () => {
        const worksheet = XLSX.utils.json_to_sheet(clearanceData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Clearance');
        XLSX.writeFile(workbook, `laporan_clearance_${new Date().toISOString().slice(0, 10)}.xlsx`);
        setIsExportOpen(false);
    };

    const handlePrintPDF = () => {
        setIsExportOpen(false);
        setTimeout(() => window.print(), 100);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (exportRef.current && !exportRef.current.contains(event.target)) {
                setIsExportOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <div className="screen-only">
                <div className="p-4 md:p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <h1 className="text-2xl font-bold text-gray-800">Daftar Clearance</h1>
                        <div className="flex items-center gap-3">
                            <div className="relative" ref={exportRef}>
                                <button
                                    onClick={() => setIsExportOpen(!isExportOpen)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 w-full sm:w-auto"
                                >
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
                            <div className="lg:col-span-4">
                                <SearchBar
                                    searchTerm={filters.searchTerm}
                                    setSearchTerm={(value) => handleFilterChange('searchTerm', value)}
                                    placeholder="Cari kapal, agen, tujuan..."
                                />
                            </div>
                            <FilterDropdown
                                options={filterOptions.ships}
                                selectedValue={filters.selectedShip}
                                setSelectedValue={(value) => handleFilterChange('selectedShip', value)}
                                placeholder="Semua Kapal"
                            />
                            <FilterDropdown
                                options={filterOptions.categories}
                                selectedValue={filters.selectedCategory}
                                setSelectedValue={(value) => handleFilterChange('selectedCategory', value)}
                                placeholder="Kategori Barang"
                            />
                            <div className="flex flex-col sm:flex-row items-center gap-2 lg:col-span-2">
                                <InputField
                                    type="date"
                                    name="startDate"
                                    value={filters.startDate}
                                    onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
                                />
                                <span className="text-gray-500 hidden sm:block">-</span>
                                <InputField
                                    type="date"
                                    name="endDate"
                                    value={filters.endDate}
                                    onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
                                />
                            </div>
                            <div className="lg:col-span-4">
                                <Select
                                    isMulti
                                    name="selectedGoods"
                                    options={filterOptions.goods}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    placeholder="Pilih satu atau lebih barang..."
                                    value={filters.selectedGoods}
                                    onChange={(selectedOptions) => handleFilterChange('selectedGoods', selectedOptions || [])}
                                    styles={customStyles}
                                />
                            </div>
                        </div>
                        {loading ? (
                            <p className="text-center text-gray-500 py-10">Memuat data...</p>
                        ) : (
                            <ClearanceTable clearanceItems={clearanceData} onSuccess={refreshData} />
                        )}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4">
                            <div className="flex items-center gap-2 text-sm">
                                <span>Tampilkan</span>
                                <FilterDropdown
                                    direction="up"
                                    selectedValue={String(rowsPerPage)}
                                    setSelectedValue={handleRowsPerPageChange}
                                    options={rowsPerPageOptions}
                                />
                                <span>baris</span>
                            </div>
                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    paginate={setCurrentPage}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="print-only">
                <PrintableClearanceList data={clearanceData} />
            </div>
        </>
    );
}

export default Clearance;