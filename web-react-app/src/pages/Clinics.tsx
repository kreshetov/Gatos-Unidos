import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Interfaz que define la estructura de los datos resumidos de las clínicas
interface interfazClinicas {
    id: number;
    nombre: string;
    foto: string;
    especialidad: string;
    direccion: string;
}

const Clinics = () => {
    const [clinicas, setClinicas] = useState<interfazClinicas[]>([]); // Definir el estado para las clínicas
    const [modo, setModo] = useState("lectura"); // Definir el estado para el modo (lectura por defecto)
    const navegar = useNavigate();

    // Function para cambiar de modo
    const cambiarModo = (nuevoModo: string) => {
        setModo(nuevoModo);
    };

    useEffect(() => {
        fetch('https://storagegatosunidos.blob.core.windows.net/datos/clinicas_resumen')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setClinicas(data);
            })
            .catch((error) => console.error('Error al obtener el listado de clínicas', error));
    }, []);

    // Redireccionar a una clinica directamente si el modo es insertar
    useEffect(() => {
        if (modo === "insertar") {
            navegar("/Clinics/insertar?modo=insertar");
        }
    }, [modo, navegar]);

    return (
        <div>
            <div className="content">
                {/* Botones para cambiar de modo */}
                <div className="crud">
                    <button className="botonCRUD" onClick={() => cambiarModo('lectura')}>Modo Lectura</button>
                    <button className="botonCRUD" onClick={() => cambiarModo('editar')}>Editar Clinica</button>
                    <button className="botonCRUD" onClick={() => cambiarModo('insertar')}>Insertar Clinica</button>
                    <button className="botonCRUD" onClick={() => cambiarModo('eliminar')}>Eliminar Clinica</button>
                </div>
                {modo !=="insertar" ? (
                    <>
                    {modo ==="lectura" ? (
                        <p className="tituloClinicas">Clínicas que Apoyan Nuestra Causa.</p>
                    ) : modo ==="editar" ? (
                        <p className="tituloClinicas">Selecciona una clinica para editarla.</p>
                    ) : (
                        <p className="tituloClinicas">Selecciona una clinica para eliminarla.</p>
                    )}
                    <div className="contenedorClinicas">
                        {clinicas.map((clinica) => (
                            <Link to={`/Clinics/${clinica.id}?modo=${modo}`} key={clinica.id}>
                                <div className="clinicas">
                                    <div className="clinicasFoto">
                                        <img src={clinica.foto}alt={clinica.nombre}/>
                                    </div>
                                    <div className="informacionClinica">
                                        <p className="nombreClinica">{clinica.nombre}</p>
                                        <p className="especialidadClinica">⭐{clinica.especialidad}</p>
                                        <p className="direccionClinica">📍{clinica.direccion}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    </>
                ) : (
                    null
                )}
            </div>
        </div>
    );
};

export default Clinics;