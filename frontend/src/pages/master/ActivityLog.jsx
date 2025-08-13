import React, { useState, useMemo } from 'react';
import SearchBar from '../../components/common/SearchBar';
import ActivityLogTable from '../../components/table/ActivityLogTable';
import InputField from '../../components/form/InputField';

const dummyLogs = [
  { id: 1, user: { name: 'Budi Santoso', role: 'Admin', photo: '/images/user/owner.jpg' }, action: 'MENAMBAH', details: 'Surat Masuk No. 001/IN/2024', timestamp: '2025-08-07 10:30:15' },
  { id: 2, user: { name: 'Citra Lestari', role: 'User', photo: '/images/user/user-02.jpg' }, action: 'MENGHAPUS', details: 'Surat Keluar No. 005/OUT/2024', timestamp: '2025-08-07 09:15:45' },
  { id: 3, user: { name: 'Budi Santoso', role: 'Admin', photo: '/images/user/owner.jpg' }, action: 'MENGEDIT', details: 'Profil Pengguna: Agus Wijaya', timestamp: '2025-08-06 15:05:10' },
  { id: 4, user: { name: 'Agus Wijaya', role: 'User', photo: '/images/user/user-03.jpg' }, action: 'MENAMBAH', details: 'Surat Keluar No. 010/OUT/2024', timestamp: '2025-08-06 11:20:30' },
];

const ActivityLog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredLogs = useMemo(() => {
    return dummyLogs
      .filter(log =>
        log.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(log =>
        startDate && endDate ? log.timestamp >= startDate && log.timestamp <= `${endDate} 23:59:59` : true
      );
  }, [searchTerm, startDate, endDate]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Pemantauan Kegiatan</h1>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-1 items-end gap-4 border-b border-gray-200 p-4 md:grid-cols-2">
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            placeholder="Cari pengguna atau detail..." 
          />
          <div className="flex items-center gap-2">
            <InputField 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
            />
            <span className="text-gray-500">-</span>
            <InputField 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
            />
          </div>
        </div>
        <ActivityLogTable logs={filteredLogs} />
      </div>
    </div>
  );
};

export default ActivityLog;