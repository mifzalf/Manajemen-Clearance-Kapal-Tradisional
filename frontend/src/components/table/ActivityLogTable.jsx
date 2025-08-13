import React from 'react';

const ActivityLogTable = ({ logs = [] }) => (
  <div className="overflow-x-auto rounded-b-2xl border-x border-b border-gray-200 bg-white">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Pengguna</th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Aktivitas</th>
          <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase text-gray-500 md:table-cell">Detail</th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Waktu</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {logs.map((log) => (
          <tr key={log.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={log.user.photo} alt="" />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{log.user.name}</div>
                  <div className="text-sm text-gray-500">{log.user.role}</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                log.action === 'MENAMBAH' ? 'bg-green-100 text-green-800' :
                log.action === 'MENGHAPUS' ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {log.action}
              </span>
            </td>
            <td className="hidden px-6 py-4 text-sm text-gray-600 md:table-cell">{log.details}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ActivityLogTable;