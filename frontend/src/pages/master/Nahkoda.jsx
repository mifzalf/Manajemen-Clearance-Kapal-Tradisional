import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NahkodaTable from '../../components/table/NahkodaTable';

const sampleNahkodaData = [
  { id: 1, nama: 'Capt. Budi Santoso' },
  { id: 2, nama: 'Capt. Agus Wijaya' },
  { id: 3, nama: 'Capt. Iwan Setiawan' },
  { id: 4, nama: 'Capt. Dedi Susanto' },
];

function Nahkoda() {
  const [nahkodaData, setNahkodaData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setNahkodaData(sampleNahkodaData);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Data Master Nahkoda</h1>
        <Link 
          to="/master/nahkoda/add" 
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors"
        >
          + Tambah Data
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Memuat data...</p>
      ) : (
        <NahkodaTable nahkodaItems={nahkodaData} />
      )}
    </div>
  );
}

export default Nahkoda;