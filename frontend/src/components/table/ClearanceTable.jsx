import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from '../ui/dropdown/Dropdown';
import { DropdownItem } from '../ui/dropdown/DropdownItem';
import { MoreDotIcon } from '../../icons';

const ActionDropdown = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button 
        ref={triggerRef} 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <MoreDotIcon className="h-5 w-5 text-gray-500" />
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        triggerRef={triggerRef}
        className="absolute right-0 top-full z-10 mt-1 flex w-40 flex-col rounded-lg border bg-white p-2 shadow-lg"
      >
        <Link to={`/clearance/${item.id}`} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
          Lihat Detail
        </Link>
        <DropdownItem onItemClick={() => navigate(`/clearance/edit/${item.id}`)} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
          Edit
        </DropdownItem>
        <DropdownItem onItemClick={() => confirm(`Hapus item ${item.id}?`)} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50">
          Hapus
        </DropdownItem>
      </Dropdown>
    </div>
  );
};

const ClearanceTable = ({ clearanceItems = [] }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nomor SPB</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Kapal</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tujuan</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tgl Berangkat</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agen</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clearanceItems.length > 0 ? (
            clearanceItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.nomorSpb}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.namaKapal}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tujuan}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(item.tglBerangkat).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.agen}</td>
                <td className="px-6 py-4 flex justify-end">
                  <ActionDropdown item={item} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                Tidak ada data clearance yang tersedia.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClearanceTable;