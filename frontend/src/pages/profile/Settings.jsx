import React, { useState } from 'react';
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import PageMeta from "../../components/common/PageMeta";
import Label from '../../components/form/Label';
import InputField from '../../components/form/InputField';
import Button from '../../components/ui/Button';
import FileInput from '../../components/form/FileInput';

const Settings = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Budi Santoso',
    username: 'budisan',
    email: 'budi.santoso@example.com',
    phone: '+62 812 3456 7890',
    photo: null,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const handleInfoChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setUserInfo({ ...userInfo, photo: e.target.files[0] });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleInfoSubmit = (e) => {
    e.preventDefault();
    alert('Informasi pribadi diperbarui!');
    console.log(userInfo);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    alert('Password diperbarui!');
    console.log(passwords);
  };

  return (
    <>
      <PageMeta title="Pengaturan Akun" />
      <PageBreadcrumb pageTitle="Pengaturan" />

      <div className="grid grid-cols-1 gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-5 text-lg font-semibold text-gray-800">
            Informasi Pribadi
          </h3>
          <form onSubmit={handleInfoSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <InputField id="name" name="name" type="text" value={userInfo.name} onChange={handleInfoChange} />
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <InputField id="username" name="username" type="text" value={userInfo.username} onChange={handleInfoChange} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <InputField id="email" name="email" type="email" value={userInfo.email} onChange={handleInfoChange} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <InputField id="phone" name="phone" type="tel" value={userInfo.phone} onChange={handleInfoChange} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="photo">Foto Profil</Label>
                <FileInput id="photo" name="photo" onChange={handleFileChange} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Simpan Perubahan</Button>
            </div>
          </form>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-5 text-lg font-semibold text-gray-800">
            Ubah Password
          </h3>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Password Saat Ini</Label>
              <InputField id="currentPassword" name="currentPassword" type="password" value={passwords.currentPassword} onChange={handlePasswordChange} />
            </div>
            <div>
              <Label htmlFor="newPassword">Password Baru</Label>
              <InputField id="newPassword" name="newPassword" type="password" value={passwords.newPassword} onChange={handlePasswordChange} />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Ubah Password</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Settings;