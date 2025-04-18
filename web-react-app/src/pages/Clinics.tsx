import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

    useEffect(() => {
        fetch('https://d4bc0a96-96f3-438e-9801-5a3937946062.mock.pstmn.io/Clincs')
            .then((response) => response.json())
            .then((data) => setClinicas(data))
            .catch((error) => console.error('Error al obtener el listado de clínicas', error));
    }, []);

    return (
        <div>
            <div className="content">
                <p className="tituloClinicas">Clínicas que Apoyan Nuestra Causa</p>
                <div className="informacionClinicas">
                    {clinicas.map((clinica) => (
                        <div className="clinicas" key={clinica.id}>
                            <h3>{clinica.nombre}</h3>
                            <Link to={`/Clinics/${clinica.id}`}><img src={clinica.foto}alt={clinica.nombre}/></Link>
                            <p>{clinica.descripcion}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Clinics;