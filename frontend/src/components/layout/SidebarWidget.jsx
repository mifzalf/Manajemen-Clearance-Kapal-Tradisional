import React from 'react';

function SidebarWidget() {
  return (
    <div className="mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center">
      <h3 className="mb-2 font-semibold text-gray-900">
        Arsip Surat KSOP
      </h3>
      <p className="mb-4 text-xs text-gray-500">
        Sistem Manajemen Arsip Surat Masuk dan Keluar.
      </p>
      <div className="text-xs text-gray-500">
        © {new Date().getFullYear()} KSOP
      </div>
    </div>
  );
}

export default SidebarWidget;