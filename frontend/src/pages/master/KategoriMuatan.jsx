import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import MuatanTable from '../../components/table/MuatanTable';
import JenisMuatanTable from '../../components/table/JenisMuatanTable';
import MuatanFormModal from '../../components/modal/MuatanFormModal';
import axiosInstance from '../../api/axiosInstance';

function KategoriMuatan() {
    const [kategoriMuatanData, setKategoriMuatanData] = useState([]);
    const [jenisMuatanData, setJenisMuatanData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [activeTab, setActiveTab] = useState('kategori');

    const tabs = [
        { id: 'kategori', label: 'Kategori Muatan' },
        { id: 'jenisMuatan', label: 'Jenis Muatan' },
    ];

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchKategoriMuatan = async () => {
        try {
            let response = await axiosInstance.get('/kategori-muatan');
            setKategoriMuatanData(response.data.datas || []);
        } catch (error) {
            toast.error("Gagal memuat data Kategori Muatan.");
            console.error("Fetch Kategori Muatan Error:", error);
        }
    };

    const fetchJenisMuatan = async () => {
        try {
            let response = await axiosInstance.get('/jenis-muatan');
            setJenisMuatanData(response.data.datas || []);
        } catch (error) {
            toast.error("Gagal memuat data Jenis Muatan.");
            console.error("Fetch Jenis Muatan Error:", error);
        }
    };

    const fetchAllData = async () => {
        setLoading(true);
        await Promise.all([fetchKategoriMuatan(), fetchJenisMuatan()]);
        setLoading(false);
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
        const isKategoriTab = activeTab === 'kategori';
        const itemName = isKategoriTab ? item.nama_kategori_muatan : item.nama_jenis_muatan;
        const itemId = isKategoriTab ? item.id_kategori_muatan : item.id_jenis_muatan;
        const endpoint = isKategoriTab ? 'kategori-muatan' : 'jenis-muatan';

        toast((t) => (
            <div className="flex flex-col gap-3">
                <p>Apakah Anda yakin ingin menghapus <strong>{itemName}</strong>?</p>
                <div className="flex gap-2">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                const response = await axiosInstance.delete(`/${endpoint}/delete/${itemId}`);
                                if (response.status === 200) {
                                    toast.success('Data berhasil dihapus!');
                                    fetchAllData();
                                }
                            } catch (error) {
                                toast.error('Gagal menghapus data.');
                                console.error("Delete error:", error);
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
        if (loading) {
            return <p className="text-center text-gray-500 py-10">Memuat data...</p>;
        }
        switch (activeTab) {
            case 'kategori':
                return <MuatanTable
                           muatanItems={kategoriMuatanData}
                           jenisList={jenisMuatanData}
                           onEdit={handleEdit}
                           onDelete={handleDelete}
                       />;
            case 'jenisMuatan':
                return <JenisMuatanTable
                           data={jenisMuatanData}
                           onEdit={handleEdit}
                           onDelete={handleDelete}
                       />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className="p-4 md:p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {activeTab === 'kategori' ? 'Data Kategori Muatan' : 'Data Jenis Muatan'}
                    </h1>
                    <button
                        onClick={handleOpenModal}
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

            {isModalOpen &&
                <MuatanFormModal
                    activeTab={activeTab}
                    onClose={handleCloseModal}
                    currentItem={editingItem}
                    jenisMuatanOptions={jenisMuatanData}
                    onSuccess={fetchAllData}
                />
            }
        </>
    );
}

export default KategoriMuatan;