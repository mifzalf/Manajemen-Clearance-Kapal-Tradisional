import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import NegaraTable from '../../components/table/NegaraTable';
import ProvinsiTable from '../../components/table/ProvinsiTable';
import KabupatenTable from '../../components/table/KabupatenTable';
import KecamatanTable from '../../components/table/KecamatanTable';
import DaerahFormModal from '../../components/modal/DaerahFormModal';
import axios from 'axios';

function Daerah() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [activeTab, setActiveTab] = useState('negara');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [negaraData, setNegaraData] = useState([]);
  const [provinsiData, setProvinsiData] = useState([]);
  const [kabupatenData, setKabupatenData] = useState([]);
  const [kecamatanData, setKecamatanData] = useState([]);

  const tabs = [
    { id: 'negara', label: 'Negara' },
    { id: 'provinsi', label: 'Provinsi' },
    { id: 'kabupaten', label: 'Kabupaten/Kota' },
    { id: 'kecamatan', label: 'Kecamatan' },
  ];

  useEffect(() => {
    fetchAll();
  }, []);
  
  const fetchNegara = async () => {
    let response = await axios.get(`${API_URL}/negara`);
    setNegaraData(response.data.datas);
  };

  const fetchProvinsi = async () => {
    let response = await axios.get(`${API_URL}/provinsi`);
    setProvinsiData(response.data.datas);
  };

  const fetchKabupaten = async () => {
    let response = await axios.get(`${API_URL}/kabupaten`);
    setKabupatenData(response.data.datas);
  };

  const fetchKecamatan = async () => {
    let response = await axios.get(`${API_URL}/kecamatan`);
    setKecamatanData(response.data.datas);
  };

  const fetchAll = () => {
    fetchNegara();
    fetchProvinsi();
    fetchKabupaten();
    fetchKecamatan();
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
    const itemName = item[`nama_${activeTab}`] || item.kode_negara;
    const itemId = item[`id_${activeTab}`];
    
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p>Apakah Anda yakin ingin menghapus <strong>{itemName}</strong>?</p>
        <div className="flex gap-2">
          <button 
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                const response = await axios.delete(`${API_URL}/${activeTab}/delete/${itemId}`);
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
      case 'negara': 
        return <NegaraTable data={negaraData} onEdit={handleEdit} onDelete={handleDelete} />;
      case 'provinsi': 
        return <ProvinsiTable data={provinsiData} onEdit={handleEdit} onDelete={handleDelete} negaraList={negaraData} />;
      case 'kabupaten': 
        return <KabupatenTable data={kabupatenData} onEdit={handleEdit} onDelete={handleDelete} provinsiList={provinsiData} />;
      case 'kecamatan': 
        return <KecamatanTable data={kecamatanData} onEdit={handleEdit} onDelete={handleDelete} kabupatenList={kabupatenData} />;
      default: 
        return null;
    }
  };

  return (
    <>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Data Daerah</h1>
          <button onClick={handleOpenModal} className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors">
            + Tambah Data
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-x-6 px-4 overflow-x-auto" aria-label="Tabs">
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
          <div className="p-4">{renderContent()}</div>
        </div>
      </div>
      {isModalOpen && (
        <DaerahFormModal 
          activeTab={activeTab} 
          onClose={handleCloseModal} 
          currentItem={editingItem}
          allNegara={negaraData}
          allProvinsi={provinsiData}
          allKabupaten={kabupatenData}
          onSuccess={fetchAll}
        />
      )}
    </>
  );
}

export default Daerah;