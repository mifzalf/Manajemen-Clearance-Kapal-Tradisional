import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AgenTable from '../../components/table/AgenTable';

const sampleAgenData = [
  { id: 1, nama: 'PT. Laut Biru Nusantara' },
  { id: 2, nama: 'CV. Samudera Jaya' },
  { id: 3, nama: 'PT. Pelayaran Nasional' },
  { id: 4, nama: 'Agen Kapal Sejahtera' },
];

function Agen() {
  const [agenData, setAgenData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAgenData(sampleAgenData);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Data Master Agen</h1>
        <Link 
          to="/master/agen/add" 
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors"
        >
          + Tambah Data
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Memuat data...</p>
      ) : (
        <AgenTable agenItems={agenData} />
      )}
    </div>
  );
}

export default Agen;