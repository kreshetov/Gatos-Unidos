import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Estructura de datos del gato
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

// Componente Gato
const Gato = () => {
    const { id } = useParams<{ id: string }>();
    const [gato, setGato] = useState<InterfazGato | null>(null);
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
    //const [fotoEditada, setFotoEditada] = useState<string>('');
    const [descripcionEditada, setDescripcionEditada] = useState<string>('');

    // Obtener el gato desde la API al cargar el componente (Azure Storage)
    // useEffect se ejecuta una vez al cargar el componente y cada vez que cambia el id del gato
    // fetch se utiliza para hacer una solicitud HTTP a la API y obtener los datos del gato
    // then se utiliza para manejar la respuesta de la API y convertirla a JSON como un objeto de TypeScript
    // catch se utiliza para manejar cualquier error que ocurra durante la solicitud
    useEffect(() => {
        fetch(`https://storagegatosunidos.blob.core.windows.net/datos/gato_${id}.json`)
            .then((response) => response.json())
            .then((data) => setGato(data))
            .catch((error) => console.error('Error al obtener el gato', error));
    }, [id]); // id solo se ejecuta si cambia el id del gato (es el segundo argumento de useEffect)

    // Al montarse el componente gato vale null, por lo que no se puede acceder a sus propiedades
    // Cuando se ejecuta fetch y se obtiene el gato, se actualiza el estado del gato con los datos obtenidos
    if (!gato) {
        return <p>Cargando gato...</p>;
    }

    // Metodo para MODIFICAR un gato    
    // Al editar la ficha, se copian los valores del gato a los campos de edición
    // De momento estamos realizando pruebas en Postman, por lo que no se guardan los cambios en la API
    const putGato = () => {
        // Se envuçia una solicitud PUT a la API para actualizar la información del gato
         fetch(`https://30f6ed45-fb84-480e-8cb7-5dc79fe76a6d.mock.pstmn.io/Gatos/${gato.id}`, {
            method: 'PUT', // Método PUT para actualizar el gato
            headers: {
                'Content-Type': 'application/json', // Especifica que el cuerpo se envia como JSON
            },
            body: JSON.stringify({ // stringify convierte el objeto Typescript a JSON y contiene los campos editados
                nombreEditado,
                razaEditada, 
                sexoEditado, 
                fechaNacimientoEditada, 
                chipEditado, 
                vacunadoEditado, 
                esterilizadoEditado, 
                pesoEditado, 
                personalidadEditada, 
                disponibilidadEditada, 
                historiaEditada, 
                descripcionEditada})
        })
        .then((res) => res.json())
        .then((data) => {
            console.log('Gato actualizado:', data); // Prueba de que se ha actualizado el gato
            alert('Ficha guardada con éxito (simulado)'); // Mensaje de éxito al guardar la ficha
        })
        .catch((err) => {
            console.error('Error al guardar la ficha:', err); // Manejo de errores al guardar la ficha
            alert('Error al guardar la ficha'); // Mensaje de error al guardar la ficha
        }); 
    };

    return (
        <div className="content">
            <div className="informacionGato">
                {!editarGato ? (
                    <>
                    <div className="fichaGato"> {/* Si el usuario no está editando la ficha, se muestra la información del gato */}
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
                    <div className="gato" key={gato.id}>
                        <img src={gato.foto} alt={gato.nombre} className="fotoGato" />
                        <img src={gato.foto} alt={gato.nombre} className="fotoGato" />
                        <img src={gato.foto} alt={gato.nombre} className="fotoGato" />
                        <img src={gato.foto} alt={gato.nombre} className="fotoGato" />
                        <img src={gato.foto} alt={gato.nombre} className="fotoGato" />
                        <img src={gato.foto} alt={gato.nombre} className="fotoGato" />
                    </div>
                </>     
                    ) : (
                    <div className="fichaGato"> {/* Si el usuario está editando la ficha, se muestra un formulario para editar la información del gato */}
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
                                onChange={(e) => setPersonalidadEditada(e.target.value.split(','))}
                            />
                            <span className="disponibilidad">📅 Disponibilidad:</span>
                            <input
                                type="text"
                                className="input"
                                value={disponibilidadEditada}
                                onChange={(e) => setDisponibilidadEditada(e.target.value.split(','))}
                            />
                        </div>
                        <div className="atributos">
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
                            <span className="peso">⚖️ Peso:</span>
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
                        <button className="guardarFicha" onClick={putGato}>✏️ Guardar ficha</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gato;
