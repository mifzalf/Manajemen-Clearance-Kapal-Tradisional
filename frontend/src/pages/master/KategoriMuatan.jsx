import React, { useState, useEffect } from 'react';
import MuatanTable from '../../components/table/MuatanTable';
import MuatanFormModal from '../../components/modal/MuatanFormModal';

const sampleMuatanData = [
  { id: 1, nama: 'LPG (Liquefied Petroleum Gas)', status: 'Berbahaya' },
  { id: 2, nama: 'Semen Curah', status: 'Umum' },
  { id: 3, nama: 'Bahan Kimia Cair (Amonia)', status: 'Berbahaya' },
  { id: 4, nama: 'Batu Bara', status: 'Umum' },
];

function KategoriMuatan() {
  const [muatanData, setMuatanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMuatanData(sampleMuatanData);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Data Master Muatan</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors"
          >
            + Tambah Data
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Memuat data...</p>
        ) : (
          <MuatanTable muatanItems={muatanData} />
        )}
      </div>
      {isModalOpen && <MuatanFormModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

export default KategoriMuatan;