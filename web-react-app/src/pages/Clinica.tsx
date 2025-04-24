import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface interfazClinica {
    id : number;
    nombre: string;
    foto: string;
    descripcion: string;
}

const Clinica = () => {
    const { id } = useParams<{ id: string }>();
    const [clinica, setClinica] = useState<interfazClinica | null>(null);

    useEffect(() => {
        fetch(`https://storagegatosunidos.blob.core.windows.net/datos/clinica_${id}.json`)
            .then((response) => response.json())
            .then((data) => setClinica(data))
            .catch((error) => console.error('Error al obtener la clinica', error));
    }, [id]);

    if (!clinica) {
        return <p>Cargando clinica...</p>;
    }

    return (
        <div>
            <div className="informacionClinica">
                <div className="clinica" key={clinica.id}>
                    <img src={clinica.foto} alt={clinica.nombre} />
                    <p>{clinica.nombre}</p>
                    <p>{clinica.descripcion}</p>
                </div>
            </div>
        </div>
    );
};

export default Clinica;