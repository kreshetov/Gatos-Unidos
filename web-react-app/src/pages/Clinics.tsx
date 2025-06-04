import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Interfaz que define la estructura de los datos resumidos de las clínicas
interface InterfazClinicas {
  id: number;
  nombre: string;
  foto: string;
  especialidad: string;
  direccion: string;
}

const Clinics = () => {
  const [clinicas, setClinicas] = useState<InterfazClinicas[]>([]);
  const [modo, setModo] = useState('lectura');
  const [esAdmin, setEsAdmin] = useState(false);
  const navegar = useNavigate();

  // Comprobar si hay sesión admin activa en sessionStorage al montar
  useEffect(() => {
    const adminActivo = sessionStorage.getItem('esAdmin');
    if (adminActivo === 'true') {
      setEsAdmin(true);
    }
  }, []);

  // Función para activar modo admin con contraseña
  const desbloquearAdmin = () => {
    const contraseña = prompt('Introduce la contraseña de administrador:');
    if (contraseña === 'gatosunidos123') {
      setEsAdmin(true);
      sessionStorage.setItem('esAdmin', 'true');
      alert('Modo administrador activado.');
    } else {
      alert('Contraseña incorrecta.');
    }
  };

  // Función para cerrar sesión admin y limpiar sessionStorage
  const cerrarSesionAdmin = () => {
    setEsAdmin(false);
    sessionStorage.removeItem('esAdmin');
    alert('Has cerrado sesión de administrador.');
  };

  // Cambiar modo (lectura, editar, insertar, eliminar)
  const cambiarModo = (nuevoModo: string) => {
    setModo(nuevoModo);
  };

  // Obtener listado de clínicas desde la fuente de datos
  useEffect(() => {
    fetch(`https://storagegatosunidos.blob.core.windows.net/datos/clinicas_resumen?nocache=${Date.now()}`)
      .then((response) => response.json())
      .then((data) => setClinicas(data))
      .catch((error) => console.error('Error al obtener listado de clínicas', error));
  }, []);

  // Navegar a insertar si modo es insertar
  useEffect(() => {
    if (modo === 'insertar') {
      navegar('/Clinics/insertar?modo=insertar');
    }
  }, [modo, navegar]);

  return (
    <div>
      <div className="content">
        {/* Botones CRUD solo para admin */}
        <div className="crud">
          {esAdmin && (
            <>
              <button className="botonCRUD" onClick={() => cambiarModo('lectura')}>
                Modo Lectura
              </button>
              <button className="botonCRUD" onClick={() => cambiarModo('editar')}>
                Editar Clínica
              </button>
              <button className="botonCRUD" onClick={() => cambiarModo('insertar')}>
                Insertar Clínica
              </button>
              <button className="botonCRUD" onClick={() => cambiarModo('eliminar')}>
                Eliminar Clínica
              </button>
              <button className="botonCRUD" onClick={cerrarSesionAdmin}>
                Cerrar sesión admin
              </button>
            </>
          )}
        </div>

        {/* Mostrar listado de clínicas excepto en modo insertar */}
        {modo !== 'insertar' && (
          <>
            {modo === 'lectura' ? (
              <p className="tituloClinicas">Clínicas que Apoyan Nuestra Causa.</p>
            ) : modo === 'editar' ? (
              <p className="tituloClinicas">Selecciona una clínica para editarla.</p>
            ) : (
              <p className="tituloClinicas">Selecciona una clínica para eliminarla.</p>
            )}

            <div className="contenedorClinicas">
              {clinicas.map((clinica) => (
                <Link to={`/Clinics/${clinica.id}?modo=${modo}`} key={clinica.id}>
                  <div className="clinicas">
                    <div className="clinicasFoto">
                      <img src={clinica.foto} alt={clinica.nombre} />
                    </div>
                    <div className="informacionClinica">
                      <p className="nombreClinica">{clinica.nombre}</p>
                      <p className="especialidadClinica">⭐ {clinica.especialidad}</p>
                      <p className="direccionClinica">📍 {clinica.direccion}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Texto oculto para activar modo admin */}
      </div>
    </div>
  );
};

export default Clinics;
