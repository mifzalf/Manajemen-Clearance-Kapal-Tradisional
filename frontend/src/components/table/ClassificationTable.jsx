import React, { useState, useRef } from 'react';
import { Dropdown } from '../ui/dropdown/Dropdown';
import { DropdownItem } from '../ui/dropdown/DropdownItem';
import { MoreDotIcon } from '../../icons';

const ActionDropdown = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  return (
    <div className="relative">
      <button 
        ref={triggerRef} 
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-20 flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
      >
        <MoreDotIcon className="h-5 w-5 text-gray-500" />
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        triggerRef={triggerRef}
        className="absolute right-0 top-full z-10 mt-1 flex w-40 flex-col rounded-lg border bg-white p-2 shadow-lg"
      >
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

const ClassificationTable = ({ classifications = [] }) => (
  <div className="overflow-x-auto rounded-b-2xl border-x border-b border-gray-200 bg-white">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Kode Klasifikasi</th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Klasifikasi</th>
          <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">Aksi</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {classifications.map((item) => (
          <tr key={item.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.kode}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{item.klasifikasi}</td>
            <td className="px-6 py-4 flex justify-end">
              <ActionDropdown 
                onEdit={() => alert(`Edit item ${item.id}`)}
                onDelete={() => alert(`Delete item ${item.id}`)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ClassificationTable;