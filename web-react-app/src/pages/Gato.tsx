import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface InterfazGato {
    id: number;
    nombre: string;
    raza: string;
    sexo: string;
    fechaNacimiento: string;
    chip: boolean;
    vacunado: boolean;
    esterilizado: boolean;
    peso: number;
    personalidad: string[];
    disponibilidad: string[];
    historia: string;
    foto: string;
    descripcion: string;
}

const Gato = () => {
    const { id } = useParams<{ id: string }>();
    const [gato, setGato] = useState<InterfazGato | null>(null);

    useEffect(() => {
        fetch(`https://storagegatosunidos.blob.core.windows.net/datos/gato_${id}.json`)
            .then((response) => response.json())
            .then((data) => setGato(data))
            .catch((error) => console.error('Error al obtener el gato', error));
    }, [id]);

    if (!gato) {
        return <p>Cargando gato...</p>;
    }

    return (
        <div className="content">
            <div className="informacionGato">
                <div className="fichaGato">
                    <h2>📋 Mi ficha</h2>
                    <p>🐱 <span className="nombre">Nombre:</span> {gato.nombre}</p>
                    <p>🧬 <span className="raza">Raza:</span> {gato.raza}</p>
                    <p>📅 <span className="fechaDeNacimiento">Fecha de Nacimiento:</span> {gato.fechaNacimiento}</p>
                    <p>{gato.sexo === "Macho" ? "🚹" : "🚺"} <span className="sexo">Sexo:</span> {gato.sexo}</p>
                    <p>⚙️ <span className="chip">Chip:</span> {gato.chip}</p>
                    <p>💉 <span className="vacunado">Vacunado:</span> {gato.vacunado}</p>
                    <p>🐾 <span className="esterilizado">Esterilizado:</span> {gato.esterilizado}</p>
                    <p>⚖️ <span className="peso">Peso:</span> {gato.peso}</p>
                    <p>🤗 <span className="personalidad">Perosnalidad:</span> {gato.personalidad}</p>
                    <p>🤝 <span className="disponibilidad">Disponibilidad:</span> {gato.disponibilidad}</p>
                    <p>📜 <span className="historia">Historia:</span> {gato.historia}</p>
                    <p>📝 <span className="descripcion">Descripción:</span> {gato.descripcion}</p>
                    
                </div>
                <div className="gato" key={gato.id}>
                    <img src={gato.foto} alt={gato.nombre} className="fotoGato" />
                </div>
            </div>
        </div>
    );
};

export default Gato;
