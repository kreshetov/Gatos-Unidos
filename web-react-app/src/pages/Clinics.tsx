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
        fetch('https://18ac713d-df52-4e1c-9094-6b8cd5ec4016.mock.pstmn.io/Clnics')
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