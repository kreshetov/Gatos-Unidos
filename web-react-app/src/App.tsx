import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './pages/NavBar';
import Gatos from './pages/Gatos';
import AboutUs from './pages/AboutUs';
import Clinics from './pages/Clinics';
import Colaborate from './pages/Colaborate';
import ContactUs from './pages/ContactUs';
import './style.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Ruta principal de Gatos */}
        <Route path="/" element={<Gatos />} />
        <Route path="/Gatos" element={<Gatos />} />
        <Route path="/Gatos/:id" element={<Gatos />} />
        
        {/* Rutas de otras páginas */}
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Clinics" element={<Clinics />} />
        <Route path="/Clinics/:id" element={<Clinics />} />
        <Route path="/Colaborate" element={<Colaborate />} />
        <Route path="/ContactUs" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;
