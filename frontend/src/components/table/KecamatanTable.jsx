import React, { useState, useRef } from 'react';
import { Dropdown } from '../ui/dropdown/Dropdown';
import { DropdownItem } from '../ui/dropdown/DropdownItem';
import { MoreDotIcon } from '../../icons';
import axios from 'axios';

const ActionDropdown = ({ item, onEdit, onSuccess }) => {
  const API_URL = import.meta.env.VITE_API_URL
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  const onDelete = async () => {
    setIsOpen(!isOpen)
    if (confirm(`Hapus item ${item.nama_kecamatan}?`)) {
      let response = await axios.delete(`${API_URL}/kecamatan/delete/${item.id_kecamatan}`)
      if (response?.status == 200) {
        alert("Berhasil menghapus data")
        onSuccess()
      } else {
        alert("Terjadi kesalahan saat menghapus data")
      }
    }
  }

  return (
    <div className="relative">
      <button ref={triggerRef} onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-gray-100 focus:outline-none">
        <MoreDotIcon className="h-5 w-5 text-gray-500" />
      </button>
      <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)} triggerRef={triggerRef} className="absolute right-0 top-full z-10 mt-1 flex w-40 flex-col rounded-lg border bg-white p-2 shadow-lg">
        <DropdownItem onItemClick={() => onEdit(item)} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</DropdownItem>
        <DropdownItem onItemClick={onDelete} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50">Hapus</DropdownItem>
      </Dropdown>
    </div>
  );
};

const kabupatenTable = ({ data = [], onEdit, kabupatenList = [], onSuccess }) => {
  const getKabupatenName = (kabupatenId) => {
    const kabupaten = kabupatenList.find(k => k.id_kabupaten === kabupatenId);
    return kabupaten ? kabupaten.nama_kabupaten : 'Tidak diketahui';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">No.</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama kabupaten</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">kabupaten/Kota</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={item.id}>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{index + 1}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{item.nama_kecamatan}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{getKabupatenName(item.id_kabupaten)}</td>
              <td className="px-6 py-4 flex justify-end">
                <ActionDropdown item={item} onEdit={onEdit} onSuccess={onSuccess} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default kabupatenTable;