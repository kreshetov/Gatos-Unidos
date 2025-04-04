import react, { useEffect, useState } from 'react';

interface interfazClinicas {
    id: number,
    nombre: string,
    foto: string;
    descripcion: string;
}

const Clinics = () => {

    const[clinicas, setClinicas] = useState<interfazClinicas[]>([]);

    useEffect(() => {
        fetch('https://8b9906b6-52d0-46f4-9ade-8c42fd35b5e6.mock.pstmn.io/Clinics')
        .then((response => response.json()))
        .then((data) => setClinicas(data))
        .then((error) => console.error("Error al obtener el listado de clinicas", error));
    }, []);

    return (
        <div>
            <div className="content">
                <div className="informacionClinicas">
                    {clinicas.map((clinica) => (
                        <div className="clinica" key={clinica.id}>
                            <p>{clinica.nombre}</p>
                            <img src={clinica.foto} alt={clinica.nombre} style={{width:"300px", height:"200px"}} />
                            <p>{clinica.descripcion}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Clinics;