import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Interfaz que define la estructura de los datos de las clínicas
interface interfazClinicas {
    id: number;
    nombre: string;
    foto: string;
    descripcion: string;
}

const Clinics = () => {
    // Definir el estado para las clínicas
    const [clinicas, setClinicas] = useState<interfazClinicas[]>([]);
    const { id } = useParams<{ id: string }>(); // Extraemos el id de la URL

    useEffect(() => {
        fetch('https://18ac713d-df52-4e1c-9094-6b8cd5ec4016.mock.pstmn.io/Clnics')
            .then((response) => response.json())
            .then((data) => setClinicas(data))
            .catch((error) => console.error('Error al obtener el listado de clínicas', error));
    }, []);

    // Si hay un id en la URL, filtra la clínica correspondiente
    let clinicaSeleccionada = null;
    if (id) {
        clinicaSeleccionada = clinicas.find((clinica) => clinica.id === parseInt(id));
    } else {
        clinicaSeleccionada = null;
    }

    return (
        <div>
            <div className="content">
                <div className="informacionClinicas">
                    {(() => {
                        if (clinicaSeleccionada) {
                            // Si existe un id, mostrar solo la clínica seleccionada
                            return (
                                <div className="clinica">
                                    <h3>{clinicaSeleccionada.nombre}</h3>
                                    <img
                                        src={clinicaSeleccionada.foto}
                                        alt={clinicaSeleccionada.nombre}
                                        style={{ width: '300px', height: '200px' }}
                                    />
                                    <p>{clinicaSeleccionada.descripcion}</p>
                                </div>
                            );
                        } else {
                            // Si no hay id, mostrar todas las clínicas directamente dentro de informacionClinicas
                            return clinicas.map((clinica) => (
                                <div className="clinica" key={clinica.id}>
                                    <h3>{clinica.nombre}</h3>
                                    <img
                                        src={clinica.foto}
                                        alt={clinica.nombre}
                                        style={{ width: '300px', height: '200px' }}
                                    />
                                    <p>{clinica.descripcion}</p>
                                </div>
                            ));
                        }
                    })()}
                </div>
            </div>
        </div>
    );
};

export default Clinics;