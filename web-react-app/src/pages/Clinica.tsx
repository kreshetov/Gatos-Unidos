import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface interfazClinica {
    id : number;
    nombre: string;
    foto: string;
    especialidad: string;
    descripcion: string;
    direccion: string;
    direccionMapa: string;
    telefono: string;
    email: string;
    web: string;
    horario: { [key: string]: string };
    servicios: { [key: string]: string };
    ubicacion: { lat: number, lng: number };
    valoracion: number;
    reseñas: number;
}

const Clinica = () => {
    const { id } = useParams<{ id: string }>();
    const [clinica, setClinica] = useState<interfazClinica | null>(null);

    useEffect(() => {
        fetch(`https://storagegatosunidos.blob.core.windows.net/datos/clinica_${id}`)
            .then((response) => response.json())
            .then((data) => setClinica(data))
            .catch((error) => console.error('Error al obtener la clinica', error));
    }, [id]);

    if (!clinica) {
        return <p>Cargando clinica...</p>;
    }

    return (
        <div>
            <div className="content">
                <div className="contenedorClinica">
                    <div className="nombre_imagen_mapa_Clinica">
                        <p className="clinicaNombre"> {clinica.nombre}</p>
                        <img src={clinica.foto} alt={clinica.nombre} />
                        <p className="clinicaUbicacion"> 📍Ubicación </p>
                        <iframe
                            title="Ubicación"
                            src={clinica.direccionMapa}
                            className="mapa-ubicacion"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div className="fichaClinica">
                        <div className="atributosClinica">
                            <span className="especialidad">Especialidad: </span> {clinica.especialidad}
                        </div>
                        <div className="atributosClinica">
                            <span className="descripcion">Descripcion: </span> {clinica.descripcion}
                        </div>
                        <div className="atributosClinica">
                            <span className="direccion">Dirección: </span> {clinica.direccion}
                        </div>
                        <div className="atributosClinica">
                            <span className="telefono">Teléfono: </span> {clinica.telefono}
                        </div>
                        <div className="atributosClinica">
                            <span className="email">Email: </span> {clinica.email}
                        </div>
                        <div className="atributosClinica">
                            <span className="web">Web: </span> {clinica.web}
                        </div>
                        <div className="atributosClinica">
                            <span className="horario">Horario: </span> 
                            <ul>
                                {Object.entries(clinica.horario).map(([dia, horas]) => (
                                <li key={dia}>{dia}: {horas}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="atributosClinica">
                            <span className="servicios">Servicios: </span> 
                            <ul>
                                {Object.values(clinica.servicios).map((servicio, index) => (
                                <li key={index}>{servicio}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="atributosClinica">
                            <span className="ubicacion">Ubicacion: </span> Lat: {clinica.ubicacion.lat}, Lng: {clinica.ubicacion.lng}
                        </div>
                        <div className="atributosClinica">
                            <span className="valoracion">Valoración: </span> {clinica.valoracion}
                        </div>
                        <div className="atributosClinica">
                            <span className="reseñas">Reseñas: </span> {clinica.reseñas}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clinica;