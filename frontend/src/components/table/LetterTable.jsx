import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from '../ui/dropdown/Dropdown';
import { DropdownItem } from '../ui/dropdown/DropdownItem';
import { MoreDotIcon } from '../../icons';

const ActionDropdown = ({ letter, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  const detailPagePath = letter.type === 'Surat Masuk' ? '/incoming-letters' : '/outgoing-letters';

  return (
    <div className="relative">
      <button 
        ref={triggerRef} 
        onClick={() => setIsOpen(!isOpen)}
        className=" border-gray-200 bg-white shadow-sm hover:bg-gray-50"
      >
        <MoreDotIcon className="h-5 w-5 text-gray-500" />
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        triggerRef={triggerRef}
        className="absolute right-0 top-full z-10 mt-1 flex w-40 flex-col rounded-lg border bg-white p-2 shadow-lg"
      >
        <Link to={`${detailPagePath}/${letter.id}`} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100">
          Lihat Detail
        </Link>
        <DropdownItem onItemClick={() => { onEdit(); setIsOpen(false); }} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100">
          Edit
        </DropdownItem>
        <DropdownItem onItemClick={() => { onDelete(); setIsOpen(false); }} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50">
          Hapus
        </DropdownItem>
      </Dropdown>
    </div>
  );
};

const LetterTable = ({ letters = [], pageType }) => (
  <div className="overflow-x-auto rounded-b-2xl border-x border-b border-gray-200 bg-white">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Nomor Surat</th>
          {pageType === 'archive' && <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Tipe</th>}
          <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
            {pageType === 'incoming' ? 'Pengirim' : pageType === 'outgoing' ? 'Tujuan' : 'Pengirim / Tujuan'}
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Ringkasan Isi</th>
          <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase text-gray-500 md:table-cell">Tanggal Surat</th>
          <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase text-gray-500 lg:table-cell">Klasifikasi</th>
          <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">Aksi</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {letters.map((letter) => (
          <tr key={letter.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{letter.letterNumber}</td>
            {pageType === 'archive' && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{letter.type}</td>}
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{letter.sender || letter.recipient}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{letter.summary}</td>
            <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-600 md:table-cell">{letter.letterDate}</td>
            <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-600 lg:table-cell">{letter.classification}</td>
            <td className="px-6 py-4 flex justify-end">
              <ActionDropdown 
                letter={letter}
                onEdit={() => alert(`Edit item ${letter.id}`)}
                onDelete={() => alert(`Delete item ${letter.id}`)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default LetterTable;