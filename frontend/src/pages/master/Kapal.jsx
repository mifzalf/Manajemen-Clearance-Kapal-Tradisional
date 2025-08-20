import React, { useState } from 'react';
import KapalTable from '../../components/table/KapalTable';
import JenisKapalTable from '../../components/table/JenisKapalTable';
import KapalFormModal from '../../components/modal/KapalFormModal';

const sampleKapalData = [
  { id: 1, nama: 'KM. Sejahtera Abadi', jenis: 'General Cargo', bendera: 'Indonesia', gt: 500, nt: 350, nomorSelar: '123/Abc', tandaSelar: 'GT.500', nomorImo: 'IMO9876543', callSign: 'ABCD' },
  { id: 2, nama: 'MT. Cahaya Bintang', jenis: 'Tanker', bendera: 'Indonesia', gt: 1200, nt: 800, nomorSelar: '456/Def', tandaSelar: 'GT.1200', nomorImo: 'IMO1234567', callSign: 'EFGH' },
  { id: 3, nama: 'KMP. Fajar Sentosa', jenis: 'Ferry (Ro-Ro)', bendera: 'Indonesia', gt: 2500, nt: 1800, nomorSelar: '789/Ghi', tandaSelar: 'GT.2500', nomorImo: 'IMO8765432', callSign: 'IJKL' },
];

const sampleJenisKapalData = [
    { id: 1, nama: 'General Cargo' },
    { id: 2, nama: 'Tanker' },
    { id: 3, nama: 'Ferry (Ro-Ro)' },
    { id: 4, nama: 'Kapal Tunda (Tugboat)'},
    { id: 5, nama: 'Tongkang (Barge)'},
];

function Kapal() {
  const [activeTab, setActiveTab] = useState('kapal');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = [
    { id: 'kapal', label: 'Daftar Kapal' },
    { id: 'jenisKapal', label: 'Jenis Kapal' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'kapal':
        return <KapalTable data={sampleKapalData} />;
      case 'jenisKapal':
        return <JenisKapalTable data={sampleJenisKapalData} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Data Kapal</h1>
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
        <KapalFormModal
          activeTab={activeTab}
          onClose={() => setIsModalOpen(false)}
          jenisKapalOptions={sampleJenisKapalData}
        />
      )}
    </>
  );
}

export default Kapal;