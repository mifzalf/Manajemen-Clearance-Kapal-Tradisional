import React from 'react';

const PrintableClearanceList = ({ data = [] }) => {
  return (
    <div className="p-8 font-sans text-black">
      <h1 className="text-2xl font-bold mb-4">Laporan Data Clearance</h1>
      <p className="text-sm mb-6">Tanggal Cetak: {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
      <table className="min-w-full divide-y divide-gray-300 border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-800">No. SPB</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-800">Nama Kapal</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-800">Tujuan</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-800">Tgl Berangkat</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-800">Agen</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2 text-sm text-gray-700">{item.spb.nomor_spb}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{item.kapal.nama_kapal}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{item.tujuan_akhir.nama_kecamatan}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{new Date(item.tanggal_berangkat).toLocaleDateString('id-ID')}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{item.agen.nama_agen}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrintableClearanceList;