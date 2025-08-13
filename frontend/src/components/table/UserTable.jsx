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

const UserTable = ({ users = [] }) => (
  <div className="overflow-x-auto rounded-b-2xl border-x border-b border-gray-200 bg-white">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Nama</th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Email</th>
          <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase text-gray-500 md:table-cell">Telepon</th>
          <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase text-gray-500 lg:table-cell">Jabatan</th>
          <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase text-gray-500 xl:table-cell">Role</th>
          <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">Aksi</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {users.map((user) => (
          <tr key={user.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={user.photo} alt="" />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.username}</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
            <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-600 md:table-cell">{user.phone}</td>
            <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-600 lg:table-cell">{user.jabatan}</td>
            <td className="hidden px-6 py-4 whitespace-nowrap xl:table-cell">
              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                user.role === 'Admin' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {user.role}
              </span>
            </td>
            <td className="px-6 py-4 flex justify-end">
              <ActionDropdown 
                onEdit={() => alert(`Edit user ${user.id}`)}
                onDelete={() => alert(`Delete user ${user.id}`)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default UserTable;