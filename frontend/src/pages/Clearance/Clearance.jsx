import React, { useState, useMemo } from 'react';
import Button from '../../components/ui/Button';
import LetterTable from '../../components/table/LetterTable';
import SearchBar from '../../components/common/SearchBar';

const dummyClearance = [
  { id: 1, agendaId: 'AGD-001', sender: 'PT. Sejahtera Abadi', letterNumber: '123/SA/VI/2024', letterDate: '2024-06-01', receivedDate: '2024-06-02', summary: 'Pengajuan clearance kapal tongkang', classification: 'Penting', remarks: 'Segera proses'},
  { id: 2, agendaId: 'AGD-002', sender: 'Agen Pelayaran Nasional', letterNumber: 'APN/L/VI/2024', letterDate: '2024-06-03', receivedDate: '2024-06-03', summary: 'Clearance kapal nelayan tradisional', classification: 'Biasa', remarks: '-'},
];

const Clearance = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClearance = useMemo(() => {
    return dummyClearance.filter(item => 
      item.letterNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sender.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Clearance Kapal</h1>
        <Button to="/clearance/add">Tambah Clearance</Button>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Cari nomor surat, pengirim, ringkasan..." />
        </div>
        <LetterTable letters={filteredClearance} pageType="clearance" />
      </div>
    </div>
  );
};

export default Clearance;