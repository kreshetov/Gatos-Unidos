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
    ubicacion: { lat: number, lng: number }; // no lo uso
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
                            <span className="atributoClinica">Especialidad</span> <p className="textoClinica">{clinica.especialidad}</p>
                            <span className="atributoClinica">Descripcion</span> <p className="textoClinica">{clinica.descripcion}</p>
                            <span className="atributoClinica">Dirección</span> <p className="textoClinica">{clinica.direccion}</p>
                            <span className="atributoClinica">Teléfono</span> <p className="textoClinica">{clinica.telefono}</p>
                            <span className="atributoClinica">Email</span> <p className="textoClinica">{clinica.email}</p>
                            <span className="atributoClinica">Web</span> <p className="textoClinica">{clinica.web}</p>
                            <span className="atributoClinica">Horario</span>
                            <ul className="lista-horario">
                                {Object.entries(clinica.horario).map(([dia, horas]) => (
                                <li key={dia}>{dia}: {horas}</li>
                                ))}
                            </ul>
                            <span className="atributoClinica">Servicios</span> 
                            <ul className="lista-servicios">
                                {Object.values(clinica.servicios).map((servicio, index) => (
                                <li key={index}>{servicio}</li>
                                ))}
                            </ul>  
                            <span className="atributoClinica">Valoración</span> <p className="textoClinica">{clinica.valoracion}</p>
                            <span className="atributoClinica">Reseñas</span> <p className="textoClinica">{clinica.reseñas}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clinica;