import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './pages/NavBar';
import Index from './pages/Index';
import AboutUs from './pages/AboutUs';
import Clinics from './pages/Clinics';
import Colaborate from './pages/Colaborate';
import ContactUs from './pages/ContactUs';
import favicon from './img/logo-gatos-unidos.png';
import './style.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="Index" element={<Index />} />
        <Route path="AboutUs" element={<AboutUs />} />
        <Route path="Clinics" element={<Clinics />} />
        <Route path="Colaborate" element={<Colaborate />} />
        <Route path="ContactUs" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;
