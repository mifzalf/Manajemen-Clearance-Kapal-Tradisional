import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

// Layouts
import AppLayout from "./components/layout/AppLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/AuthPages/SignIn";
import Clearance from "./pages/Clearance/Clearance";
import FormClearance from "./pages/Clearance/FormClearance";
import DetailClearance from "./pages/Clearance/DetailClearance";
import UserProfiles from "./pages/profile/UserProfiles";
import Settings from "./pages/profile/Settings";
import Kapal from "./pages/master/Kapal";
import Nahkoda from "./pages/master/Nahkoda";
import Agen from "./pages/master/Agen";
import KategoriMuatan from "./pages/master/KategoriMuatan";
import Daerah from "./pages/master/Daerah";
import LogAktivitas from "./pages/LogAktivitas"; 
import ManajemenUser from "./pages/ManajemenUser";

/**
 * Komponen ProtectedRoute
 * Komponen ini bertindak sebagai penjaga untuk rute-rute yang memerlukan login.
 * Ia memeriksa apakah ada 'token' di localStorage.
 * - Jika ada token, ia akan menampilkan halaman yang diminta (melalui <Outlet />).
 * - Jika tidak ada token, ia akan mengarahkan (redirect) pengguna ke halaman /signin.
 */
const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Pengguna tidak login, arahkan ke halaman signin
    return <Navigate to="/signin" replace />;
  }

  // Pengguna sudah login, tampilkan halaman yang seharusnya
  return <Outlet />;
};

function App() {
  React.useEffect(() => {
    const handleStorageChange = () => {
      if (!localStorage.getItem('token')) {
        window.location.href = '/signin';
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Rute publik yang bisa diakses siapa saja */}
        <Route path="/signin" element={<SignIn />} />

        {/* --- RUTE YANG DILINDUNGI --- */}
        {/* Semua rute di dalam <ProtectedRoute> hanya bisa diakses setelah login */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clearance" element={<Clearance />} />
            <Route path="/clearance/add" element={<FormClearance />} />
            <Route path="/clearance/edit/:id" element={<FormClearance />} />
            <Route path="/clearance/:id" element={<DetailClearance />} />
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/master/kapal" element={<Kapal />} />
            <Route path="/master/nahkoda" element={<Nahkoda />} />
            <Route path="/master/agen" element={<Agen />} />
            <Route path="/master/muatan" element={<KategoriMuatan />} />
            <Route path="/master/daerah" element={<Daerah />} />
            <Route path="/log-aktivitas" element={<LogAktivitas />} />
            <Route path="/manajemen-user" element={<ManajemenUser />} />
          </Route>
        </Route>

        {/* Opsional: Rute untuk halaman "Not Found" jika path tidak cocok */}
        <Route path="*" element={<h1>404: Halaman Tidak Ditemukan</h1>} />
      </Routes>
    </Router>
  );
}

export default App;