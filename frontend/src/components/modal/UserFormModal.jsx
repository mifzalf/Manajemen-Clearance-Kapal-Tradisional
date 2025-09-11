import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Label from '../form/Label';
import InputField from '../form/InputField';
import Select from '../form/Select';
import Button from '../ui/Button';
import axiosInstance from '../../api/axiosInstance'; 

const roleOptions = [
    { value: '', label: 'Pilih Role', disabled: true },
    { value: 'superuser', label: 'Superuser' },
    { value: 'user', label: 'User' },
];

const UserFormModal = ({ onClose, currentItem, onSuccess }) => {
    const [formData, setFormData] = useState({});
    const isEditMode = Boolean(currentItem);

    useEffect(() => {
        if (isEditMode && currentItem) {
            setFormData({
                nama_lengkap: currentItem.nama_lengkap || '',
                username: currentItem.username || '',
                jabatan: currentItem.jabatan || '',
                role: currentItem.role || '',
            });
        } else {
            setFormData({ nama_lengkap: '', username: '', password: '', jabatan: '', role: '' });
        }
    }, [currentItem, isEditMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = isEditMode ? 'patch' : 'post';
            const url = isEditMode
                ? `/users/update/${currentItem.id_user}`
                : '/users/store';
            
            const response = await axiosInstance({
                method: method,
                url: url,
                data: formData
            });

            if (response.status === 200) {
                toast.success(`Data pengguna berhasil ${isEditMode ? 'diperbarui' : 'disimpan'}!`);
                onSuccess();
                onClose();
            }
        } catch (error) {
            const errorMessage = error.response?.data?.msg || "Terjadi kesalahan saat menyimpan data.";
            toast.error(errorMessage);
            console.error("Save User Error:", error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg mx-4">
                <form onSubmit={handleSubmit}>
                    <div className="p-5 border-b"><h2 className="text-xl font-bold text-gray-800">{isEditMode ? 'Edit Data Pengguna' : 'Tambah Pengguna Baru'}</h2></div>
                    <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><Label htmlFor="nama_lengkap">Nama Lengkap</Label><InputField name="nama_lengkap" id="nama_lengkap" value={formData.nama_lengkap || ''} onChange={handleChange} required /></div>
                            <div><Label htmlFor="username">Username</Label><InputField name="username" id="username" value={formData.username || ''} onChange={handleChange} required /></div>
                            
                            {!isEditMode && (
                                <div><Label htmlFor="password">Password</Label><InputField type="password" name="password" id="password" onChange={handleChange} required /></div>
                            )}

                            <div><Label htmlFor="jabatan">Jabatan</Label><InputField name="jabatan" id="jabatan" value={formData.jabatan || ''} onChange={handleChange} required /></div>
                            
                            <div>
                                <Label htmlFor="role">Role</Label>
                                <Select 
                                    name="role" 
                                    id="role" 
                                    value={formData.role || ''} 
                                    onChange={handleChange} 
                                    options={roleOptions} 
                                    direction="up" 
                                    required 
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-5 border-t flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
                        <Button type="button" variant="secondary" onClick={onClose}>Batal</Button>
                        <Button type="submit">{isEditMode ? 'Simpan Perubahan' : 'Simpan'}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserFormModal;