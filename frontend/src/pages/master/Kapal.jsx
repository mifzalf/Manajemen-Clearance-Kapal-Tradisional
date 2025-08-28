import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import KapalTable from '../../components/table/KapalTable';
import JenisKapalTable from '../../components/table/JenisKapalTable';
import KapalFormModal from '../../components/modal/KapalFormModal';
import axios from 'axios';

function Kapal() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [activeTab, setActiveTab] = useState('kapal');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [kapalData, setKapalData] = useState([]);
  const [jenisKapalData, setJenisKapalData] = useState([]);
  const [negaraData, setNegaraData] = useState([]);

  const tabs = [
    { id: 'kapal', label: 'Daftar Kapal' },
    { id: 'jenisKapal', label: 'Jenis Kapal' },
  ];

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchBendera = async () => {
    let response = await axios.get(`${API_URL}/negara`);
    setNegaraData(response?.data?.datas);
  };

  const fetchKapal = async () => {
    let response = await axios.get(`${API_URL}/kapal`);
    setKapalData(response?.data?.datas);
  };
  
  const fetchJenisKapal = async () => {
    let response = await axios.get(`${API_URL}/jenis`);
    setJenisKapalData(response?.data?.datas);
  };

  const fetchAll = () => {
    fetchJenisKapal();
    fetchKapal();
    fetchBendera();
  };
  
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

  const handleDelete = (item) => {
    const isKapalTab = activeTab === 'kapal';
    const itemName = isKapalTab ? item.nama_kapal : item.nama_jenis;
    const itemId = isKapalTab ? item.id_kapal : item.id_jenis;
    const endpoint = isKapalTab ? 'kapal' : 'jenis';

    toast((t) => (
      <div className="flex flex-col gap-3">
        <p>Apakah Anda yakin ingin menghapus <strong>{itemName}</strong>?</p>
        <div className="flex gap-2">
          <button 
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                const response = await axios.delete(`${API_URL}/${endpoint}/delete/${itemId}`);
                if (response.status === 200) {
                  toast.success('Data berhasil dihapus!');
                  fetchAll();
                }
              } catch (error) {
                toast.error('Gagal menghapus data.');
              }
            }}
            className="w-full px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Ya, Hapus
          </button>
          <button 
            onClick={() => toast.dismiss(t.id)}
            className="w-full px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Batal
          </button>
        </div>
      </div>
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'kapal':
        return <KapalTable data={kapalData} onEdit={handleEdit} onDelete={handleDelete} jenisList={jenisKapalData} benderaList={negaraData} />;
      case 'jenisKapal':
        return <JenisKapalTable data={jenisKapalData} onEdit={handleEdit} onDelete={handleDelete} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Data Kapal</h1>
          <button onClick={handleOpenModal} className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors">
            + Tambah Data
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-x-6 px-4" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-4">
            {renderContent()}
          </div>
        </div>
      </div>
      
      {isModalOpen && (
        <KapalFormModal
          activeTab={activeTab}
          onClose={handleCloseModal}
          currentItem={editingItem}
          jenisKapalOptions={jenisKapalData}
          negaraOptions={negaraData}
          onSuccess={fetchAll}
        />
      )}
    </>
  );
}

export default Kapal;