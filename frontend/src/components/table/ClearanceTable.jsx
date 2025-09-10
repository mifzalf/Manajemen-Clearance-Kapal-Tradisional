import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Dropdown } from '../ui/dropdown/Dropdown';
import { DropdownItem } from '../ui/dropdown/DropdownItem';
import { MoreDotIcon } from '../../icons';
import axios from 'axios';

const ActionDropdown = ({ item, onSuccess }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const navigate = useNavigate();

  const handleDelete = (item) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p>
          Apakah Anda yakin ingin menghapus <strong>{item.spb.no_spb}</strong>?
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              axios
                .delete(`${API_URL}/perjalanan/delete/${item.id_perjalanan}`, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
                })
                .then(() => {
                  toast.dismiss(t.id);
                  toast.success('Data berhasil dihapus!');
                  onSuccess(); // refresh tabel, bukan reload halaman
                })
                .catch((err) => {
                  console.error('Gagal menghapus data:', err);
                  toast.error('Gagal menghapus data');
                });
            }}
            className="w-full px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Ya, Hapus
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Batal
          </button>
        </div>
      </div>
    ), {
      duration: 6000,
    });
  };

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
        <Link
          to={`/clearance/${item.id_perjalanan}`}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Lihat Detail
        </Link>
        <Link
          to={`/clearance/edit/${item.id_perjalanan}`}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Edit
        </Link>
        <DropdownItem
          onItemClick={() => handleDelete(item)}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          Hapus
        </DropdownItem>
      </Dropdown>
    </div>
  );
};

const ClearanceTable = ({ clearanceItems = [], onSuccess }) => {
  return (
    <div className="overflow-x-auto">
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
          {clearanceItems?.length > 0 ? (
            clearanceItems.map((item) => (
              <tr key={item.id_perjalanan} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.spb.no_spb}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.kapal.nama_kapal}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tujuan_akhir.nama_kecamatan}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(item.tanggal_berangkat).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.agen.nama_agen}</td>
                <td className="px-6 py-4 flex justify-end">
                  <ActionDropdown item={item} onSuccess={onSuccess} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                Tidak ada data clearance yang cocok dengan filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClearanceTable;
