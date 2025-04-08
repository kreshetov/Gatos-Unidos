import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './pages/NavBar';
import Gatos from './pages/Gatos';
import AboutUs from './pages/AboutUs';
import Clinics from './pages/Clinics';
import Colaborate from './pages/Colaborate';
import ContactUs from './pages/ContactUs';
import './style.css';

function App() {
  return (
    <Router basename="/">
      <NavBar />
      <Routes>
        {/* Rutas para Gatos */}
        <Route path="/Gatos" element={<Gatos />} />
        <Route path="/Gatos/:id" element={<Gatos />} />

        {/* Rutas para Clínicas */}
        <Route path="/Clinics" element={<Clinics />} />
        <Route path="/Clinics/:id" element={<Clinics />} />

        {/* Otras rutas */}
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Colaborate" element={<Colaborate />} />
        <Route path="/ContactUs" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;
