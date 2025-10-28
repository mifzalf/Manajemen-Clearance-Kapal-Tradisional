import React, { useState, useRef } from 'react';
import { Dropdown } from '../ui/dropdown/Dropdown';
import { DropdownItem } from '../ui/dropdown/DropdownItem';
import { MoreDotIcon } from '../../icons';

const ActionDropdown = ({ item, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  
  return (
    <div className="relative">
      <button ref={triggerRef} onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-gray-100 focus:outline-none">
        <MoreDotIcon className="h-5 w-5 text-gray-500" />
      </button>
      <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)} triggerRef={triggerRef} className="absolute right-0 top-full z-10 mt-1 flex w-40 flex-col rounded-lg border bg-white p-2 shadow-lg">
        
        <DropdownItem 
          onItemClick={() => { 
            onEdit(item); 
            setIsOpen(false);
          }} 
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Edit
        </DropdownItem>
        
        <DropdownItem 
          onItemClick={() => {
            onDelete(item);
            setIsOpen(false);
          }} 
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          Hapus
        </DropdownItem>
      </Dropdown>
    </div>
  );
};

const PelabuhanTable = ({ items = [], onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pelabuhan</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id_pelabuhan}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.nama_pelabuhan}</td>
                <td className="px-6 py-4 flex justify-end">
                  <ActionDropdown item={item} onEdit={onEdit} onDelete={onDelete} />
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="2" className="px-6 py-4 text-center text-sm text-gray-500">Tidak ada data pelabuhan.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PelabuhanTable;