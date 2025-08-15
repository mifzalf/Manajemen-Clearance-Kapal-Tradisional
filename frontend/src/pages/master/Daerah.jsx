import React, { useState } from 'react';
import NegaraTable from '../../components/table/NegaraTable';
import ProvinsiTable from '../../components/table/ProvinsiTable';
import KabupatenTable from '../../components/table/KabupatenTable';
import KecamatanTable from '../../components/table/KecamatanTable';
import DaerahFormModal from '../../components/modal/DaerahFormModal';

const sampleNegaraData = [
  { id: 1, kode: 'RI', nama: 'Indonesia' },
  { id: 2, kode: 'MY', nama: 'Malaysia' },
  { id: 3, kode: 'SG', nama: 'Singapura' },
];

const sampleProvinsiData = [
  { id: 1, nama: 'Jawa Timur' },
  { id: 2, nama: 'Jawa Tengah' },
  { id: 3, nama: 'DKI Jakarta' },
];

const sampleKabupatenData = [
    { id: 1, nama: 'Kabupaten Sumenep' },
    { id: 2, nama: 'Kota Surabaya' },
    { id: 3, nama: 'Kabupaten Sidoarjo' },
];

const sampleKecamatanData = [
    { id: 1, nama: 'Kalianget' },
    { id: 2, nama: 'Kota Sumenep' },
    { id: 3, nama: 'Gayam' },
];

function Daerah() {
  const [activeTab, setActiveTab] = useState('negara');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = [
    { id: 'negara', label: 'Negara' },
    { id: 'provinsi', label: 'Provinsi' },
    { id: 'kabupaten', label: 'Kabupaten/Kota' },
    { id: 'kecamatan', label: 'Kecamatan' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'negara':
        return <NegaraTable data={sampleNegaraData} />;
      case 'provinsi':
        return <ProvinsiTable data={sampleProvinsiData} />;
      case 'kabupaten':
        return <KabupatenTable data={sampleKabupatenData} />;
      case 'kecamatan':
        return <KecamatanTable data={sampleKecamatanData} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Data Master Daerah</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors"
          >
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
        <DaerahFormModal 
          activeTab={activeTab} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
}

export default Daerah;