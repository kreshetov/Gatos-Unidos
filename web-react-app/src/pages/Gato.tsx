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
    const [guardarFicha, setGuardarFicha] = useState(false);
    const [editarGato, setEditarGato] = useState(false);
    const [nombreEditado, setNombreEditado] = useState<string>('');
    const [razaEditada, setRazaEditada] = useState<string>('');
    const [sexoEditado, setSexoEditado] = useState<string>(''); 
    const [fechaNacimientoEditada, setFechaNacimientoEditada] = useState<string>('');
    const [personalidadEditada, setPersonalidadEditada] = useState<string[]>([]);
    const [chipEditado, setChipEditado] = useState<boolean>(false);
    const [vacunadoEditado, setVacunadoEditado] = useState<boolean>(false);
    const [esterilizadoEditado, setEsterilizadoEditado] = useState<boolean>(false);
    const [pesoEditado, setPesoEditado] = useState<number>(0);
    const [disponibilidadEditada, setDisponibilidadEditada] = useState<string[]>([]);
    const [historiaEditada, setHistoriaEditada] = useState<string>('');
    const [fotoEditada, setFotoEditada] = useState<string>('');
    const [descripcionEditada, setDescripcionEditada] = useState<string>('');

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
                {!editarGato ? (<div className="fichaGato"> {/* Si el usuario no está editando la ficha, se muestra la información del gato */}
                        <h2>📋 Mi ficha</h2>
                        <div className="atributos">
                            <span className="nombre">🐱 Nombre:</span> {gato.nombre}
                            <span className="raza">🧬 Raza:</span> {gato.raza}
                            <span className="fechaDeNacimiento">📅 Fecha de Nacimiento:</span>{gato.fechaNacimiento}     
                        </div>
                        <div className="atributos">
                            <span className="sexo">{gato.sexo === "Macho" ? "🚹" : "🚺"} Sexo:</span> {gato.sexo}
                            <span className="personalidad">🤗 Perosnalidad:</span> {gato.personalidad}
                            <span className="peso">⚖️ Peso:</span> {gato.peso}
                        </div>
                        <div className="atributos">
                            <span className="chip">⚙️ Chip:</span> {gato.chip ? "Sí" : "No"}
                            <span className="vacunado">💉 Vacunado:</span> {gato.vacunado ? "Sí" : "No"}
                            <span className="esterilizado">🐾 Esterilizado:</span> {gato.esterilizado ? "Sí" : "No"}
                            <span className="disponibilidad">📅 Disponibilidad:</span> {gato.disponibilidad}
                        </div>
                        <div className="atributos">
                            <span className="historia">📜 Historia:</span> {gato.historia}
                        </div>
                        <div className="atributos">
                            <span className="descripcion">Descripción:</span> {gato.descripcion}
                        </div>
                        <button className="editarFicha" onClick={() => setEditarGato(true)}>✏️ Editar</button>
                    </div>
                    ) : (<div className="fichaGato"> {/* Si el usuario está editando la ficha, se muestra un formulario para editar la información del gato */}
                        <h2>📋 Editado Ficha de {gato.nombre}</h2>
                        <div className="atributos">
                            <span className="nombre">🐱 Nombre:</span>
                            <input                             
                                type="text"
                                className="input"
                                value={nombreEditado}
                                onChange={(e) => setNombreEditado(e.target.value)}
                            />
                            <span className="raza">🧬 Raza:</span>
                            <input
                                type="text"
                                className="input"
                                value={razaEditada}
                                onChange={(e) => setRazaEditada(e.target.value)}
                            />
                            <span className="fechaDeNacimiento">📅 Fecha de Nacimiento:</span>
                            <input
                                type="date"
                                className="input"
                                value={fechaNacimientoEditada}
                                onChange={(e) => setFechaNacimientoEditada(e.target.value)}
                            />   
                        </div>
                        <div className="atributos">
                            <span className="sexo">{gato.sexo === "Macho" ? "🚹" : "🚺"} Sexo:</span>
                            <input
                                type="text"
                                className="input"
                                value={sexoEditado}
                                onChange={(e) => setSexoEditado(e.target.value)}
                            />     
                            <span className="personalidad">🤗 Perosnalidad:</span>
                            <input
                                type="text"
                                className="input"
                                value={personalidadEditada}
                                onChange={(e) => setRazaEditada(e.target.value)}
                            />
                            <span className="chip">⚙️ Chip:</span>
                            <input
                                type="checkbox"
                                checked={chipEditado}
                                onChange={(e) => setChipEditado(e.target.checked)}
                            />
                            <span className="vacunado">💉 Vacunado:</span>
                            <input
                                type="checkbox"
                                checked={vacunadoEditado}
                                onChange={(e) => setVacunadoEditado(e.target.checked)}
                            />
                            <span className="esterilizado">🐾 Esterilizado:</span>
                            <input
                                type="checkbox"
                                checked={esterilizadoEditado}
                                onChange={(e) => setEsterilizadoEditado(e.target.checked)}
                            />
                            <span className="peso">⚖️ Peso:</span> {gato.peso}
                            <input
                                type="number"
                                className="input"
                                value={pesoEditado}
                                onChange={(e) => setPesoEditado(parseFloat(e.target.value))}
                            />
                        </div>
                        <div className="atributos">
                            <span className="historia">📜 Historia:</span>
                            <input
                                type="text"
                                className="inputHistoriayDescripcion"
                                value={historiaEditada}
                                onChange={(e) => setHistoriaEditada(e.target.value)}
                            />
                        </div>
                        <div className="atributos">
                            <span className="descripcion">Descripción:</span>
                            <input
                                type="text"
                                className="inputHistoriayDescripcion"
                                value={descripcionEditada}
                                onChange={(e) => setDescripcionEditada(e.target.value)}
                            />
                        </div>
                        <button className="guardarFicha" onClick={() => setGuardarFicha(!guardarFicha)}>✏️ Guardar ficha</button>
                    </div>)}
                    
                <div className="gato" key={gato.id}>
                    <img src={gato.foto} alt={gato.nombre} className="fotoGato" />
                    <img src={gato.foto} alt={gato.nombre} className="fotoGato" />
                    <img src={gato.foto} alt={gato.nombre} className="fotoGato" />
                    <img src={gato.foto} alt={gato.nombre} className="fotoGato" />
                    <img src={gato.foto} alt={gato.nombre} className="fotoGato" />
                    <img src={gato.foto} alt={gato.nombre} className="fotoGato" />
                </div>
            </div>
        </div>
    );
};

export default Gato;
