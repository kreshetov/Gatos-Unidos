import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Interfaz que define la estructura de los datos de los gatos
interface interfazGatos {
    id: number;
    nombre: string;
    foto: string;
    descripcion: string;
}

const Gatos = () => {
    // Definir el estado para los gatos
    const [gatos, setGatos] = useState<interfazGatos[]>([]);
    const { id } = useParams<{ id: string }>(); // Extraemos el id de la URL

    useEffect(() => {
        fetch('https://18ac713d-df52-4e1c-9094-6b8cd5ec4016.mock.pstmn.io/Gatos')
            .then((response) => response.json())
            .then((data) => setGatos(data))
            .catch((error) => console.error('Error al obtener listado de gatos', error));
    }, []);

    // Si hay un id en la URL, filtra el gato correspondiente
    let gatoSeleccionado = null;
    if (id) {
        gatoSeleccionado = gatos.find((gato) => gato.id === parseInt(id));
    } else {
        gatoSeleccionado = null;
    }

    return (
        <div>
            <div className="content">
                <div className="informacionGatos">
                    {(() => {
                        if (gatoSeleccionado) {
                            // Si existe un id, mostrar solo el gato seleccionado
                            return (
                                <div className="gato">
                                    <h3>{gatoSeleccionado.nombre}</h3>
                                    <img
                                        src={gatoSeleccionado.foto}
                                        alt={gatoSeleccionado.nombre}
                                        style={{ width: '300px', height: '200px' }}
                                    />
                                    <p>{gatoSeleccionado.descripcion}</p>
                                </div>
                            );
                        } else {
                            // Si no hay id, mostrar todos los gatos directamente dentro de informacionGatos
                            return gatos.map((gato) => (
                                <div className="gato" key={gato.id}>
                                    <h3>{gato.nombre}</h3>
                                    <img
                                        src={gato.foto}
                                        alt={gato.nombre}
                                        style={{ width: '300px', height: '200px' }}
                                    />
                                    <p>{gato.descripcion}</p>
                                </div>
                            ));
                        }
                    })()}
                </div>
            </div>
        </div>
    );
};

export default Gatos;

