import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import axios from 'axios';

import AppLayout from "./components/layout/AppLayout";

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

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

function App() {
  React.useEffect(() => {
    // Redirect jika token dihapus dari localStorage
    const handleStorageChange = () => {
      if (!localStorage.getItem('token')) {
        window.location.href = '/signin';
      }
    };
    window.addEventListener('storage', handleStorageChange);
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/signin';
        }
        return Promise.reject(error);
      }
    );
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />


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