import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Clearance from "./pages/Clearance/Clearance";
import FormClearance from "./pages/Clearance/FormClearance";
import DetailClearance from "./pages/Clearance/DetailClearance";
import Laporan from "./pages/Laporan";
import UserProfiles from "./pages/profile/UserProfiles";
import SignIn from "./pages/AuthPages/SignIn";
import Settings from "./pages/profile/Settings";
import Kapal from "./pages/master/Kapal";
import Nahkoda from "./pages/master/Nahkoda";
import Agen from "./pages/master/Agen";
import Pelabuhan from "./pages/master/Pelabuhan";
import KategoriMuatan from "./pages/master/KategoriMuatan";
import FormMuatan from "./pages/master/FormMuatan";
import FormAgen from "./pages/master/FormAgen";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clearance" element={<Clearance />} />
          <Route path="/clearance/add" element={<FormClearance />} />
          <Route path="/clearance/:id" element={<DetailClearance />} />
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/master/kapal" element={<Kapal />} />
          <Route path="/master/nahkoda" element={<Nahkoda />} />
          <Route path="/master/agen" element={<Agen />} />
          <Route path="/master/pelabuhan" element={<Pelabuhan />} />
          <Route path="/master/muatan" element={<KategoriMuatan />} />
          <Route path="/master/muatan/add" element={<FormMuatan />} />
          <Route path="/master/agen/add" element={<FormAgen />} />
        </Route>
        
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;