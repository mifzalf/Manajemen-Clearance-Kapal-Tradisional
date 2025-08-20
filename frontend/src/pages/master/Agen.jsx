import React, { useState, useEffect } from 'react';
import AgenTable from '../../components/table/AgenTable';
import AgenFormModal from '../../components/modal/AgenFormModal';

const sampleAgenData = [
  { id: 1, nama: 'PT. Laut Biru Nusantara' },
  { id: 2, nama: 'CV. Samudera Jaya' },
  { id: 3, nama: 'PT. Pelayaran Nasional' },
];

function Agen() {
  const [agenData, setAgenData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    setAgenData(sampleAgenData);
    setLoading(false);
  }, []);

  const handleOpenModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Data Master Agen</h1>
          <button 
            onClick={handleOpenModal}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors"
          >
            + Tambah Data
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Memuat data...</p>
        ) : (
          <AgenTable agenItems={agenData} onEdit={handleEdit} />
        )}
      </div>

      {isModalOpen && <AgenFormModal onClose={handleCloseModal} currentItem={editingItem} />}
    </>
  );
}

export default Agen;