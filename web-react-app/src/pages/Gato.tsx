import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface ingerfazGato {
    id : number;
    nombre: string;
    raza: string;
    edad: string;
    sexo: string;
    foto: string;
    descripcion: string;
}

const Gato = () => {
    const { id } = useParams<{ id: string }>();
    const [gato, setGato] = useState<ingerfazGato | null>(null);

    useEffect(() => {
        fetch(`https://d4bc0a96-96f3-438e-9801-5a3937946062.mock.pstmn.io/Gatos/${id}`)
            .then((response) => response.json())
            .then((data) => setGato(data))
            .catch((error) => console.error('Error al obtener el gato', error));
    }, [id]);

    if (!gato) {
        return <p>Cargando gato...</p>;
    }

    return (
        <div>
            <div className="content">
                <div className="informacionGato">
                    <div className="gato" key={gato.id}>
                        <img src={gato.foto} alt={gato.nombre} />
                    </div>
                    <div className="textoGato">
                            <p>Conoce a {gato.nombre}</p>
                            <p>{gato.raza}</p>
                            <p>{gato.edad}</p>
                            <p>{gato.sexo}</p>
                            <p>{gato.descripcion}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gato;