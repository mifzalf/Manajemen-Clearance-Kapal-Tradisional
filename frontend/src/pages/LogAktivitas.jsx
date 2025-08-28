import React, { useState, useEffect, useMemo } from 'react';
import LogAktivitasTable from '../components/table/LogAktivitasTable';
import Pagination from '../components/ui/Pagination';
import SearchBar from '../components/common/SearchBar';
import FilterDropdown from '../components/common/FilterDropdown';
import InputField from '../components/form/InputField';

const sampleLogData = [
  { id: 1, timestamp: '2025-08-28T10:30:00', user: 'Budi Santoso', action: 'CREATE', dataType: 'Clearance', changedData: 'SPB/08/001 untuk KM. Sejahtera Abadi' },
  { id: 2, timestamp: '2025-08-28T09:15:00', user: 'Admin', action: 'UPDATE', dataType: 'Master Agen', changedData: "'PT. Laut Biru' -> 'PT. Laut Biru Nusantara'" },
  { id: 3, timestamp: '2025-08-27T16:45:00', user: 'Admin', action: 'DELETE', dataType: 'Master Nahkoda', changedData: "Menghapus 'Capt. Iwan'" },
  { id: 4, timestamp: '2025-08-27T14:20:00', user: 'Budi Santoso', action: 'LOGIN', dataType: 'Sistem', changedData: "Login berhasil" },
  { id: 5, timestamp: '2025-08-26T11:05:00', user: 'Admin', action: 'CREATE', dataType: 'Master Kapal', changedData: "Menambahkan 'KM. Pelita Jaya'" },
  { id: 5, timestamp: '2025-08-26T11:05:00', user: 'Admin', action: 'CREATE', dataType: 'Master Kapal', changedData: "Menambahkan 'KM. Pelita Jaya'" },
  { id: 5, timestamp: '2025-08-26T11:05:00', user: 'Admin', action: 'CREATE', dataType: 'Master Kapal', changedData: "Menambahkan 'KM. Pelita Jaya'" },
  { id: 5, timestamp: '2025-08-26T11:05:00', user: 'Admin', action: 'CREATE', dataType: 'Master Kapal', changedData: "Menambahkan 'KM. Pelita Jaya'" },
  { id: 5, timestamp: '2025-08-26T11:05:00', user: 'Admin', action: 'CREATE', dataType: 'Master Kapal', changedData: "Menambahkan 'KM. Pelita Jaya'" },
  { id: 5, timestamp: '2025-08-26T11:05:00', user: 'Admin', action: 'CREATE', dataType: 'Master Kapal', changedData: "Menambahkan 'KM. Pelita Jaya'" },
  { id: 5, timestamp: '2025-08-26T11:05:00', user: 'Admin', action: 'CREATE', dataType: 'Master Kapal', changedData: "Menambahkan 'KM. Pelita Jaya'" },
  { id: 5, timestamp: '2025-08-26T11:05:00', user: 'Admin', action: 'CREATE', dataType: 'Master Kapal', changedData: "Menambahkan 'KM. Pelita Jaya'" },
  { id: 5, timestamp: '2025-08-26T11:05:00', user: 'Admin', action: 'CREATE', dataType: 'Master Kapal', changedData: "Menambahkan 'KM. Pelita Jaya'" },
  { id: 5, timestamp: '2025-08-26T11:05:00', user: 'Admin', action: 'CREATE', dataType: 'Master Kapal', changedData: "Menambahkan 'KM. Pelita Jaya'" },
];

const rowsPerPageOptions = ['5', '10', '20', 'All'];

function LogAktivitas() {
  const [logData, setLogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ searchTerm: '', startDate: '', endDate: '', selectedUser: '', selectedAction: '', selectedDataType: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setLogData(sampleLogData);
    setLoading(false);
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };
  
  const handleRowsPerPageChange = (value) => {
    if (value === 'Semua') {
      setRowsPerPage(filteredData.length);
    } else {
      setRowsPerPage(parseInt(value, 10));
    }
    setCurrentPage(1);
  };

  const uniqueUsers = useMemo(() => [...new Set(logData.map(item => item.user))], [logData]);
  const uniqueActions = useMemo(() => [...new Set(logData.map(item => item.action))], [logData]);
  const uniqueDataTypes = useMemo(() => [...new Set(logData.map(item => item.dataType))], [logData]);

  const filteredData = useMemo(() => {
    return logData.filter(item => {
      const searchTerm = filters.searchTerm.toLowerCase();
      const searchMatch = !searchTerm || item.user.toLowerCase().includes(searchTerm) || item.changedData.toLowerCase().includes(searchTerm);
      const userMatch = !filters.selectedUser || item.user === filters.selectedUser;
      const actionMatch = !filters.selectedAction || item.action === filters.selectedAction;
      const dataTypeMatch = !filters.selectedDataType || item.dataType === filters.selectedDataType;
      const startDateMatch = !filters.startDate || new Date(item.timestamp) >= new Date(filters.startDate);
      const endDateMatch = !filters.endDate || new Date(item.timestamp) <= new Date(filters.endDate + 'T23:59:59');
      return searchMatch && userMatch && actionMatch && dataTypeMatch && startDateMatch && endDateMatch;
    });
  }, [filters, logData]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const selectedRowsPerPage = rowsPerPageOptions.includes(String(rowsPerPage)) ? String(rowsPerPage) : 'Semua';

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Log Aktivitas</h1>
      
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="space-y-4 border-b border-gray-200 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <SearchBar searchTerm={filters.searchTerm} setSearchTerm={(value) => handleFilterChange('searchTerm', value)} placeholder="Cari pengguna atau data..." />
            </div>
            <div className="w-full md:w-auto md:min-w-[200px]">
              <FilterDropdown options={uniqueUsers} selectedValue={filters.selectedUser} setSelectedValue={(value) => handleFilterChange('selectedUser', value)} placeholder="Semua Pengguna" />
            </div>
          </div>
          <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 md:grid-cols-3">
            <FilterDropdown options={uniqueActions} selectedValue={filters.selectedAction} setSelectedValue={(value) => handleFilterChange('selectedAction', value)} placeholder="Semua Aksi" />
            <FilterDropdown options={uniqueDataTypes} selectedValue={filters.selectedDataType} setSelectedValue={(value) => handleFilterChange('selectedDataType', value)} placeholder="Semua Jenis Data" />
            <div className="flex items-center gap-2">
              <InputField className="w-full" type="date" name="startDate" value={filters.startDate} onChange={(e) => handleFilterChange(e.target.name, e.target.value)} />
              <span className="text-gray-500">-</span>
              <InputField className="w-full" type="date" name="endDate" value={filters.endDate} onChange={(e) => handleFilterChange(e.target.name, e.target.value)} />
            </div>
          </div>
        </div>
        
        {loading ? <p className="text-center text-gray-500 py-10">Memuat data...</p> : <LogAktivitasTable logItems={currentRows} />}
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4">
          <div className="flex items-center gap-2 text-sm">
            <span>Tampilkan</span>
            <FilterDropdown direction="up" selectedValue={selectedRowsPerPage} setSelectedValue={handleRowsPerPageChange} options={rowsPerPageOptions} />
            <span>baris</span>
          </div>
          {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
      </div>
    </div>
  );
}

export default LogAktivitas;