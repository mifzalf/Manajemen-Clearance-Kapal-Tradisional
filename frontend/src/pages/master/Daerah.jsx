import React, { useEffect, useState } from 'react';
import NegaraTable from '../../components/table/NegaraTable';
import ProvinsiTable from '../../components/table/ProvinsiTable';
import KabupatenTable from '../../components/table/KabupatenTable';
import KecamatanTable from '../../components/table/KecamatanTable';
import DaerahFormModal from '../../components/modal/DaerahFormModal';
import axios from 'axios';

const sampleKabupatenData = [ { id: 1, nama: 'Kabupaten Sumenep', provinsiId: 1 }, { id: 2, nama: 'Kota Surabaya', provinsiId: 1 }, { id: 3, nama: 'Kota Semarang', provinsiId: 2 } ];
const sampleKecamatanData = [ { id: 1, nama: 'Kalianget', kabupatenId: 1 }, { id: 2, nama: 'Kota Sumenep', kabupatenId: 1 }, { id: 3, nama: 'Gayam', kabupatenId: 1 } ];

function Daerah() {
  const API_URL = import.meta.env.VITE_API_URL
  const [activeTab, setActiveTab] = useState('negara');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [negaraData, setNegaraData] = useState([])
  const [provinsiData, setProvinsiData] = useState([])
  const [kabupatenData, setKabupatenData] = useState([])

  const tabs = [
    { id: 'negara', label: 'Negara' },
    { id: 'provinsi', label: 'Provinsi' },
    { id: 'kabupaten', label: 'Kabupaten/Kota' },
    { id: 'kecamatan', label: 'Kecamatan' },
  ];

  useEffect(() => {
    fetchAll()
  }, [])
  
  const fetchNegara = async () => {
    let response = await axios.get(`${API_URL}/negara`)
    console.log(response)
    setNegaraData(response.data.datas)
  }

  const fetchProvinsi = async () => {
    let response = await axios.get(`${API_URL}/provinsi`)
    console.log(response)
    setProvinsiData(response.data.datas)
  }

  const fetchKabupaten = async () => {
    let response = await axios.get(`${API_URL}/kabupaten`)
    console.log(response)
    setKabupatenData(response.data.datas)
  }

  const fetchAll = () => {
    fetchNegara()
    fetchProvinsi()
    fetchKabupaten()
  }

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

  const renderContent = () => {
    switch (activeTab) {
      case 'negara': 
        return <NegaraTable data={negaraData} onEdit={handleEdit} onSuccess={fetchNegara} />;
      case 'provinsi': 
        return <ProvinsiTable data={provinsiData} onEdit={handleEdit} negaraList={negaraData} onSuccess={fetchProvinsi} />;
      case 'kabupaten': 
        return <KabupatenTable data={kabupatenData} onEdit={handleEdit} provinsiList={provinsiData} onSuccess={fetchKabupaten} />;
      case 'kecamatan': 
        return <KecamatanTable data={sampleKecamatanData} onEdit={handleEdit} kabupatenList={sampleKabupatenData} />;
      default: 
        return null;
    }
  };

  return (
    <>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Data Master Daerah</h1>
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
          allKabupaten={sampleKabupatenData}
          onSuccess={fetchAll}
        />
      )}
    </>
  );
}

export default Daerah;