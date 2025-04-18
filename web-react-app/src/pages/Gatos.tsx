import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

    useEffect(() => {
        fetch('https://d4bc0a96-96f3-438e-9801-5a3937946062.mock.pstmn.io/Gatos')
            .then((response) => response.json())
            .then((data) => setGatos(data))
            .catch((error) => console.error('Error al obtener listado de gatos', error));
    }, []);

    return (
        <div>
            <div className="content">
                <p className="tituloGatos">Conoce a Nuestros Gatos en Adopción</p>
                <div className="informacionGatos">
                    {gatos.map((gato) => (
                        <div className="gatos" key={gato.id}>
                            <h3>{gato.nombre}</h3>
                            <Link to={`/Gatos/${gato.id}`}> <img src={gato.foto}alt={gato.nombre} /> </Link>
                            <p>{gato.descripcion}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gatos;

