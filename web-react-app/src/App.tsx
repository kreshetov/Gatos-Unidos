import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Cambiar a HashRouter
import NavBar from './pages/NavBar';
import Gatos from './pages/Gatos';
import AboutUs from './pages/AboutUs';
import Clinics from './pages/Clinics';
import Colaborate from './pages/Colaborate';
import ContactUs from './pages/ContactUs';
import Footer from './pages/Footer'
import './style.css';

function App() {
  return (
    <div className="app-wrapper">
      <Router basename="/">
        <div className="layout">
          <NavBar />
          <main className="main-content">
            <Routes>
              <Route path="/Gatos" element={<Gatos />} />
              <Route path="/Gatos/:id" element={<Gatos />} />
              <Route path="/Clinics" element={<Clinics />} />
              <Route path="/Clinics/:id" element={<Clinics />} />
              <Route path="/AboutUs" element={<AboutUs />} />
              <Route path="/Colaborate" element={<Colaborate />} />
              <Route path="/ContactUs" element={<ContactUs />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </div>
  );
}


export default App;
