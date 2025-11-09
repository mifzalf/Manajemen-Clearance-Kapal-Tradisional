import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import UserTable from '../components/table/UserTable';
import UserFormModal from '../components/modal/UserFormModal';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';

function ManajemenUser() {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            let response = await axiosInstance.get('/users');
            setUserData(response.data.datas || []);
        } catch (error) {
            toast.error("Gagal memuat data pengguna.");
            console.error("Fetch Users Error:", error);
        } finally {
            setLoading(false);
        }
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
        toast((t) => (
            <div className="flex flex-col gap-3">
                <p>Apakah Anda yakin ingin menghapus pengguna <strong>{item.nama_lengkap}</strong>?</p>
                <div className="flex gap-2">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                await axiosInstance.delete(`/users/delete/${item.id_user}`);
                                toast.success(`Pengguna "${item.nama_lengkap}" berhasil dihapus.`);
                                fetchUsers();
                            } catch (error) {
                                toast.error("Gagal menghapus data.");
                                console.error("Delete User Error:", error);
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

    return (
        <>
            <div className="p-4 md:p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">Manajemen Pengguna</h1>
                    <div className="flex items-center gap-3">
                        <button onClick={handleOpenModal} className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors">
                            + Tambah Pengguna
                        </button>
                    </div>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500">Memuat data...</p>
                ) : (
                    <UserTable userItems={userData} onEdit={handleEdit} onDelete={handleDelete} />
                )}
            </div>

            {isModalOpen && (
                <UserFormModal 
                    onClose={handleCloseModal} 
                    currentItem={editingItem} 
                    onSuccess={fetchUsers} 
                    currentUserRole={user?.role || ''} // <-- 3. DITAMBAHKAN (Kirim role ke modal)
                />
            )}
        </>
    );
}

export default ManajemenUser;