import React from 'react';
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import UserMetaCard from "../../components/UserProfile/UserMetaCard";
import UserInfoCard from "../../components/UserProfile/UserInfoCard";
import PageMeta from "../../components/common/PageMeta";

// Data dummy untuk profil pengguna
const userProfileData = {
  id: 1,
  name: "Budi Santoso",
  email: "budi.santoso@example.com",
  phone: "+62 812 3456 7890",
  bio: "Manajer Tim Arsip Digital",
  photo: "/images/user/owner.jpeg",
};

export default function UserProfiles() {
  return (
    <>
      <PageMeta
        title="Halaman Profil | KSOP Admin"
        description="Ini adalah halaman profil pengguna."
      />
      <PageBreadcrumb pageTitle="Profil" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 lg:mb-7">
          Profil Akun
        </h3>
        <div className="space-y-6">
          <UserMetaCard user={userProfileData} />
          {/* PERBAIKAN: Mengganti user-profileData menjadi userProfileData */}
          <UserInfoCard user={userProfileData} />
        </div>
      </div>
    </>
  );
}