import React from "react";
import { Link } from "react-router-dom";
import GridShape from "../common/GridShape";

export default function AuthLayout({ children }) {
  return (
    <div className="relative z-10 bg-white p-6 sm:p-0">
      <div className="relative flex min-h-screen w-full flex-col justify-center lg:flex-row">
        {children}
        <div className="hidden w-full items-center bg-gray-800 lg:w-1/2 lg:grid">
          <div className="relative z-10 flex items-center justify-center">
            <GridShape />
            <div className="flex max-w-xs flex-col items-center">
              <Link to="/" className="mb-4 block">
                <h1 className="text-3xl font-bold text-white">KSOP-K ARSIP</h1>
              </Link>
              <p className="text-center text-gray-400">
                Sistem Arsip Surat Masuk dan Surat Keluar
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}