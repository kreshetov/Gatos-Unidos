import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; 
import NavBar from './pages/NavBar';
import Gatos from './pages/Gatos';
import Gato from './pages/Gato';
import AboutUs from './pages/AboutUs';
import Clinics from './pages/Clinics';
import Clinica from './pages/Clinica';
import Colaborate from './pages/Colaborate';
import ContactUs from './pages/ContactUs';
import Footer from './pages/Footer'
import './style.css';

function App() {
  return (
      <Router basename="/">
          <NavBar />
            <Routes>
              <Route path="/Gatos" element={<Gatos />} />
              <Route path="/Gatos/:id" element={<Gato />} />
              <Route path="/Clinics" element={<Clinics />} />
              <Route path="/Clinics/:id" element={<Clinica />} />
              <Route path="/AboutUs" element={<AboutUs />} />
              <Route path="/Colaborate" element={<Colaborate />} />
              <Route path="/ContactUs" element={<ContactUs />} />
            </Routes>
          <Footer />
      </Router>
  );
}


export default App;
