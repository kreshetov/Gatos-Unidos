// Usando react-router para navegar entre componentes
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; 
// Importando componentes
import NavBar from './pages/NavBar';
import Gatos from './pages/Gatos';
import Gato from './pages/Gato';
import AboutUs from './pages/AboutUs';
import Clinics from './pages/Clinics';
import Clinica from './pages/Clinica';
import Colaborate from './pages/Colaborate';
import Footer from './pages/Footer'
import Donar from './pages/Donar';
import LoginAdmin from './pages/LoginAdmin';
import Admin from './pages/Admin';
// Importando estilos css
import './css/AboutUs.css';
import './css/Clinica.css';
import './css/Clinics.css';
import './css/Colaborate.css';  
import './css/Footer.css';
import './css/Gato.css';  
import './css/Gatos.css';
import './css/NavBar.css';
import './css/style.css';
import './css/Donar.css';
import './css/EditarGato.css';
import './css/EliminarGato.css';
import './css/InsertarGato.css';
import './css/EditarClinica.css';
import './css/EliminarClinica.css';
import './css/InsertarClinica.css';
import './css/Admin.css';
import './css/LoginAdmin.css';

function App() {
  return (
      <Router basename="/">
          <NavBar />
            <Routes>
            <Route path="/" element={<Gatos />} />
              <Route path="/Gatos" element={<Gatos />} />
              <Route path="/Gatos/:id" element={<Gato />} />
              <Route path="/Gatos/insertar?modo=insertar" element={<Gato/>} />
              <Route path="/Clinics" element={<Clinics />} />
              <Route path="/Clinics/:id" element={<Clinica />} />
              <Route path="/Clinics/insertar?modo=insertar" element={<Clinica/>} />
              <Route path="/AboutUs" element={<AboutUs />} />
              <Route path="/Colaborate" element={<Colaborate />} />
              <Route path="/Donar" element={<Donar />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          <Footer />
      </Router>
  );
}

export default App;
