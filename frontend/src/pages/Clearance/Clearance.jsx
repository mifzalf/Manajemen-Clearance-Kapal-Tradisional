import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
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

const rowsPerPageOptions = ['5', '10', '20', '50', 'Semua'];

function Clearance() {
    const [masterData, setMasterData] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get('/perjalanan');
                setMasterData(response.data.datas);
            } catch (error) {
                console.error("Gagal mengambil data awal:", error);
                toast.error("Gagal mengambil data awal.");
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    const filterOptions = useMemo(() => {
        const ships = [...new Set(masterData.map(item => item.kapal?.nama_kapal).filter(Boolean))];
        const categories = [...new Set(masterData.flatMap(item => (item.muatans || []).map(muatan => muatan.kategori_muatan?.status_kategori_muatan)).filter(Boolean))];
        const goods = [...new Set(masterData.flatMap(item => (item.muatans || []).map(muatan => muatan.kategori_muatan?.nama_kategori_muatan)).filter(Boolean))].map(g => ({ value: g, label: g }));
        return { ships, categories, goods };
    }, [masterData]);

    const filteredData = useMemo(() => {
        return masterData.filter(item => {
            const searchTerm = filters.searchTerm.toLowerCase();

            const searchMatch = !searchTerm ||
                (item.kapal?.nama_kapal && item.kapal.nama_kapal.toLowerCase().includes(searchTerm)) ||
                (item.agen?.nama_agen && item.agen.nama_agen.toLowerCase().includes(searchTerm)) ||
                (item.tujuan_akhir?.nama_kecamatan && item.tujuan_akhir.nama_kecamatan.toLowerCase().includes(searchTerm)) ||
                (item.spb?.no_spb && item.spb.no_spb.toLowerCase().includes(searchTerm));

            const shipMatch = !filters.selectedShip || item.kapal?.nama_kapal === filters.selectedShip;
            const categoryMatch = !filters.selectedCategory || item.muatans?.some(m => m.kategori_muatan?.status_kategori_muatan === filters.selectedCategory);
            const goodsMatch = filters.selectedGoods.length === 0 || filters.selectedGoods.every(sg => item.muatans?.some(m => m.kategori_muatan?.nama_kategori_muatan === sg.value));
            const startDateMatch = !filters.startDate || new Date(item.tanggal_berangkat) >= new Date(filters.startDate);
            const endDateMatch = !filters.endDate || new Date(item.tanggal_berangkat) <= new Date(filters.endDate + 'T23:59:59');

            return searchMatch && shipMatch && categoryMatch && goodsMatch && startDateMatch && endDateMatch;
        });
    }, [filters, masterData]);

    const handleFilterChange = (name, value) => {
        setFilters((prev) => ({ ...prev, [name]: value }));
        setCurrentPage(1);
    };

    const handleRowsPerPageChange = (value) => {
        if (value === 'Semua') {
            setRowsPerPage(filteredData.length > 0 ? filteredData.length : 1);
        } else {
            setRowsPerPage(parseInt(value, 10));
        }
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const refreshData = () => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get('/perjalanan');
                setMasterData(response.data.datas);
            } catch (error) {
                console.error("Gagal mengambil data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    };

    function angkaKeHuruf(n) {
        const angka = ["", "satu", "dua", "tiga", "empat", "lima",
            "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];

        if (n < 12) return angka[n];
        if (n < 20) return angka[n - 10] + " belas";
        if (n < 100) return angka[Math.floor(n / 10)] + " puluh " + angkaKeHuruf(n % 10);
        if (n < 200) return "seratus " + angkaKeHuruf(n - 100);
        if (n < 1000) return angka[Math.floor(n / 100)] + " ratus " + angkaKeHuruf(n % 100);
        if (n < 2000) return "seribu " + angkaKeHuruf(n - 1000);
        if (n < 1000000) return angkaKeHuruf(Math.floor(n / 1000)) + " ribu " + angkaKeHuruf(n % 1000);

        return n.toString();
    }

    const exportXLSX = () => {
        let data = filteredData.map(d => {
            const {
                tanggal_clearance,
                ppk,
                spb,
                no_urut,
                kapal,
                nahkoda,
                jumlah_crew,
                kedudukan_kapal,
                tanggal_datang,
                datang_dari,
                tanggal_berangkat,
                tempat_singgah,
                tujuan_akhir,
                agen,
                pukul_agen_clearance,
                pukul_kapal_berangkat,
                status_muatan_berangkat
            } = d

            const tanggalClearance = new Date(tanggal_clearance)
            const tanggalOnlyClearance = tanggalClearance.getDate()
            const bulanClearance = new Intl.DateTimeFormat('id-ID', { month: "long" }).format(tanggalClearance)
            const angkaBulan = tanggalClearance.getMonth() + 1
            const angkaHuruf = angkaKeHuruf(jumlah_crew)
            const tanggalDatang = new Date(tanggal_datang)
            const tanggalOnlyDatang = tanggalDatang.getDate()
            const bulanDatang = new Intl.DateTimeFormat("id-ID", {month: "long"}).format(tanggalDatang)
            const tahunDatang = tanggalDatang.getFullYear()
            const tanggalBerangkat = new Date(tanggal_berangkat)
            const tanggalOnlyBerangkat = tanggalBerangkat.getDate()
            const bulanBerangkat = tanggalBerangkat.getMonth() + 1
            const tahunBerangkat = tanggalBerangkat.getFullYear()

            return {
                "REGISTER BULAN": bulanClearance,
                "ANGKA BULAN": angkaBulan,
                "PPK": ppk,
                "No. SPB Asal": spb.no_spb_asal,
                "No. SPB": spb.no_spb,
                "No. Urut": no_urut,
                "Nama Kapal": kapal.nama_kapal,
                "Jenis": kapal.jeni.nama_jenis,
                "bendera": kapal.bendera.kode_negara,
                "nahkoda": nahkoda.nama_nahkoda,
                "CREW": jumlah_crew,
                "TERBILANG": `(${angkaHuruf.toUpperCase()})`,
                "GT": kapal.gt,
                "NT": kapal.nt,
                "NO": "NO. ",
                "Selar": kapal.nomor_selar,
                "Tanda Selar": kapal.tanda_selar,
                "Nomor IMO": kapal.nomor_imo || '-',
                "Call Sign": kapal.call_sign || '-',
                "Kedudukan Kapal": kedudukan_kapal.nama_kabupaten,
                "Tgl Dtg": tanggalOnlyDatang,
                "Bln Dtg": bulanDatang,
                "Thn Dtg": tahunDatang,
                "Datang Dari": datang_dari.nama_kecamatan,
                "Tgl brkt": tanggalOnlyBerangkat,
                "Bln brkt": bulanBerangkat,
                "Thn brkt": tahunBerangkat,
                "Tempat Yang Pertama Disinggahi": tempat_singgah.nama_kecamatan,
                "Tujuan Terakhir": tujuan_akhir.nama_kecamatan,
                "Agen": agen.nama_agen,
                "TANGGAL CLEARANCE": tanggalOnlyClearance,
                "PUKUL AGEN CLEARANCE": pukul_agen_clearance,
                "TANGGAL BERANGKAT": tanggalBerangkat,
                "PUKUL KAPAL BERANGKAT": pukul_kapal_berangkat,
                "MUATAN BERANGKAT": status_muatan_berangkat
            }
        })

        console.log(data)
        const worksheet = XLSX.utils.json_to_sheet(data);
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
                                    placeholder="Cari SPB, kapal, agen, tujuan..."
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
                                <InputField type="date" name="startDate" value={filters.startDate} onChange={(e) => handleFilterChange(e.target.name, e.target.value)} />
                                <span className="text-gray-500 hidden sm:block">-</span>
                                <InputField type="date" name="endDate" value={filters.endDate} onChange={(e) => handleFilterChange(e.target.name, e.target.value)} />
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
                            <ClearanceTable clearanceItems={currentRows} onSuccess={refreshData} />
                        )}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4">
                            <div className="flex items-center gap-2 text-sm">
                                <span>Tampilkan</span>
                                <FilterDropdown
                                    direction="up"
                                    selectedValue={rowsPerPage === filteredData.length && filteredData.length > 0 ? 'Semua' : String(rowsPerPage)}
                                    setSelectedValue={handleRowsPerPageChange}
                                    options={rowsPerPageOptions}
                                />
                                <span>baris</span>
                            </div>
                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    paginate={paginate}
                                />
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