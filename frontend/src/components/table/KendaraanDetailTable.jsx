import React from 'react';

const KendaraanDetailTable = ({ data = [] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Golongan</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length > 0 ? data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Golongan {item.golongan}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{item.jumlah?.toLocaleString('id-ID')} Unit</td>
            </tr>
          )) : (
            <tr>
              <td colSpan="2" className="px-6 py-4 text-center text-sm text-gray-500">Tidak ada data kendaraan.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default KendaraanDetailTable;