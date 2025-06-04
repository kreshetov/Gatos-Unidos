import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface interfazGatos {
  id: number;
  nombre: string;
  foto: string;
  raza: string;
  fechaNacimiento: string;
}

const calcularEdadGato = (fechaNacimiento: string): string => {
  const fechaNac = new Date(fechaNacimiento);
  const fechaActual = new Date();
  let años = fechaActual.getFullYear() - fechaNac.getFullYear();
  let meses = fechaActual.getMonth() - fechaNac.getMonth();

  if (fechaActual.getDate() < fechaNac.getDate()) {
    meses--;
  }
  if (meses < 0) {
    años--;
    meses += 12;
  }
  if (años <= 0) {
    return `${meses} mes${meses === 1 ? '' : 'es'}`;
  } else {
    return `${años} año${años === 1 ? '' : 's'}`;
  }
};

const Gatos = () => {
  const [gatos, setGatos] = useState<interfazGatos[]>([]);
  const [modo, setModo] = useState('lectura');
  const [esAdmin, setEsAdmin] = useState(false);
  const navegar = useNavigate();

  useEffect(() => {
    const adminActivo = sessionStorage.getItem("esAdmin");
    if (adminActivo === "true") {
      setEsAdmin(true);
    }
  }, []);

  // Función para cerrar sesión admin y limpiar sessionStorage
  const cerrarSesionAdmin = () => {
    setEsAdmin(false);
    sessionStorage.removeItem("esAdmin");
    alert("Has cerrado sesión de administrador.");
  };

  // Cambiar modo (lectura, editar, insertar, eliminar)
  const cambiarModo = (nuevoModo: string) => {
    setModo(nuevoModo);
  };

  useEffect(() => {
    fetch(`https://storagegatosunidos.blob.core.windows.net/datos/gatos_resumen?nocache=${Date.now()}`)
      .then((response) => response.json())
      .then((data) => setGatos(data))
      .catch((error) => console.error('Error al obtener listado de gatos', error));
  }, []);

  useEffect(() => {
    if (modo === 'insertar') {
      navegar('/Gatos/insertar?modo=insertar');
    }
  }, [modo, navegar]);

  return (
    <div>
      <div className="content">
        {/* Botones CRUD solo para admin */}
        {esAdmin && (
          <div className="crud">
            <button className="botonCRUD" onClick={() => cambiarModo('lectura')}>Modo Lectura</button>
            <button className="botonCRUD" onClick={() => cambiarModo('editar')}>Editar Gato</button>
            <button className="botonCRUD" onClick={() => cambiarModo('insertar')}>Insertar Gato</button>
            <button className="botonCRUD" onClick={() => cambiarModo('eliminar')}>Eliminar Gato</button>
            <button className="botonCRUD" onClick={cerrarSesionAdmin}>Cerrar sesión admin</button>
          </div>
        )}

        {/* Título y listado de gatos */}
        {modo !== "insertar" && (
          <>
            {modo === "lectura" ? (
              <p className="tituloGatos">Sé Parte del Cambio: Adopta, Acoge o Apadrina un Gato!</p>
            ) : modo === "editar" ? (
              <p className="tituloGatos">Selecciona al Gato para editarlo.</p>
            ) : (
              <p className="tituloGatos">Selecciona al Gato que se desee eliminar.</p>
            )}

            <div className="contenedorGatos">
              {gatos.map((gato) => (
                <Link to={`/Gatos/${gato.id}?modo=${modo}`} key={gato.id}>
                  <div className="gatos">
                    <div className="gatosFoto">
                      <img src={gato.foto} alt={gato.nombre} />
                    </div>
                    <div className="informacionGato">
                      <p className="nombreGato">{gato.nombre}</p>
                      <p className="razaGato">🐈 Raza: {gato.raza}</p>
                      <p className="edadGato">🎂 Edad: {calcularEdadGato(gato.fechaNacimiento)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Gatos;
