import React, { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';

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
    const [searchParams] = useSearchParams(); // Obtener los parámetros de búsqueda de la URL
    const modo = searchParams.get('modo'); // Obtener el modo de la URL (lectura, editar, crear, eliminar)
    const { id } = useParams<{ id: string }>(); // Obtener el id del gato desde la URL
    const [gato, setGato] = useState<InterfazGato | null>(null); // Estado para almacenar los datos del gato
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

    // Metodo para MODIFICAR un gato    
    // De momento estamos realizando pruebas en Postman, por lo que no se guardan los cambios en la API
    const putGato = () => {
        if (!gato) { // Si no hay gato, no se puede editar
            return;
        } 
        // Se envia una solicitud PUT a la API para actualizar la información del gato
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

    // Metodo para INSERTAR un gato nuevo
    const postGato = () => {
        // Se envía una solicitud POST a la API para crear un nuevo gato
        fetch('https://30f6ed45-fb84-480e-8cb7-5dc79fe76a6d.mock.pstmn.io/Gatos', {
            method: 'POST', // Usar POST para agregar un nuevo gato
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                nombre: nombreEditado,
                raza: razaEditada,
                sexo: sexoEditado,
                fechaNacimiento: fechaNacimientoEditada,
                chip: chipEditado,
                vacunado: vacunadoEditado,
                esterilizado: esterilizadoEditado,
                peso: pesoEditado,
                personalidad: personalidadEditada,
                disponibilidad: disponibilidadEditada,
                historia: historiaEditada,
                descripcion: descripcionEditada
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log('Gato insertado:', data);
            alert('Gato insertado con éxito');
        })
        .catch((err) => {
            console.error('Error al insertar el gato:', err);
            alert('Error al insertar el gato');
        });
    };


    // Obtener el gato desde la API al cargar el componente (Azure Storage)
    // useEffect se ejecuta una vez al cargar el componente y cada vez que cambia el id del gato
    // fetch se utiliza para hacer una solicitud HTTP a la API y obtener los datos del gato
    // then se utiliza para manejar la respuesta de la API y convertirla a JSON como un objeto de TypeScript
    // catch se utiliza para manejar cualquier error que ocurra durante la solicitud
    // Si el modo no es insertar, hace fetch para trear a los gatos
    useEffect(() => {
        if (modo !== "insertar") {
            fetch(`https://storagegatosunidos.blob.core.windows.net/datos/gato_${id}`)
            .then((response) => response.json())
            .then((data) => setGato(data))
            .catch((error) => console.error('Error al obtener el gato', error));
        } 
    }, [modo, id]); // id solo se ejecuta si cambia el id del gato (es el segundo argumento de useEffect)

    return (
        <div className="content">
            {modo ==="lectura" && gato &&(
                <>
                <div className="contenedorGato">
                    <div className="fichaGato"> {/* Si el usuario solo esta viendo la ficha */}
                        <div className="atributosGato">       
                            <span className="nombre">😺 Nombre:</span> {gato.nombre}     
                        </div>
                        <div className="atributosGato">       
                            <span className="raza">🧬 Raza:</span> {gato.raza}     
                        </div>
                        <div className="atributosGato">
                            <span className="fechaDeNacimiento">📅 Fecha de Nacimiento:</span>{gato.fechaNacimiento}
                        </div>
                        <div className="atributosGato">
                            <span className="sexo">{gato.sexo === "Macho" ? "🚹" : "🚺"} Sexo:</span> {gato.sexo}
                        </div>
                        <div className="atributosGato">
                            <span className="personalidad">🤗 Perosnalidad:</span> {gato.personalidad.join(", ")}
                        </div>
                        <div className="atributosGato">
                            <span className="peso">⚖️ Peso:</span> {gato.peso} KG
                        </div>
                        <div className="atributosGato">
                            <span className="chip">⚙️ Chip:</span> {gato.chip ? "Sí" : "No"}
                        </div>
                        <div className="atributosGato">
                        <span className="vacunado">💉 Vacunado:</span> {gato.vacunado ? "Sí" : "No"}
                        </div>
                        <div className="atributosGato">
                            <span className="esterilizado">🐾 Esterilizado:</span> {gato.esterilizado ? "Sí" : "No"}
                        </div>
                        <div className="atributosGato">
                            <span className="disponibilidad">📅 Disponibilidad:</span> {gato.disponibilidad.join(", ")}
                        </div>
                        <div className="atributosGato">
                            <span className="historia">📜 Historia:</span> {gato.historia}
                        </div>
                        <div className="atributosGato">
                            <span className="descripcion">Descripción:</span> {gato.descripcion}
                        </div>
                    </div>
                    <div className="gato" key={gato.id}>
                        <img src={gato.foto} alt={gato.nombre} className="fotoGato" />
                        <img src={gato.foto} alt={gato.nombre} className="fotoGato" />
                        <img src={gato.foto} alt={gato.nombre} className="fotoGato" />
                        <img src={gato.foto} alt={gato.nombre} className="fotoGato" />
                        <img src={gato.foto} alt={gato.nombre} className="fotoGato" />
                        <img src={gato.foto} alt={gato.nombre} className="fotoGato" />
                    </div>
                </div>
            </>
            )}

            {modo ==="editar" && gato &&(
                <>
                <div className="contenedorGatoEditar">
                    <p className="tituloGato">📋 Editar Ficha de {gato.nombre}</p>
                    <div className="fichaGato"> {/* Si el usuario está editando la ficha */}
                        <div className="atributosGato">
                            <span className="nombre">🐱 Nombre:</span>
                            <input                             
                                type="text"
                                className="input"
                                value={nombreEditado}
                                onChange={(e) => setNombreEditado(e.target.value)}
                            />
                        </div>
                        <div className="atributosGato">
                            <span className="raza">🧬 Raza:</span>
                            <input
                                type="text"
                                className="input"
                                value={razaEditada}
                                onChange={(e) => setRazaEditada(e.target.value)}
                            />
                        </div>
                        <div className="atributosGato">
                            <span className="fechaDeNacimiento">📅 Fecha de Nacimiento:</span>
                            <input
                                type="date"
                                className="input"
                                value={fechaNacimientoEditada}
                                onChange={(e) => setFechaNacimientoEditada(e.target.value)}
                            />   
                        </div>
                        <div className="atributosGato">
                            <span className="sexo">{gato.sexo === "Macho" ? "🚹" : "🚺"} Sexo:</span>
                            <input
                                type="text"
                                className="input"
                                value={sexoEditado}
                                onChange={(e) => setSexoEditado(e.target.value)}
                            />     
                        </div>
                        <div className="atributosGato">
                            <span className="personalidad">🤗 Perosnalidad:</span>
                            <input
                                type="text"
                                className="input"
                                value={personalidadEditada}
                                onChange={(e) => setPersonalidadEditada(e.target.value.split(','))}
                            />
                        </div>
                        <div className="atributosGato">
                            <span className="disponibilidad">📅 Disponibilidad:</span>
                            <input
                                type="text"
                                className="input"
                                value={disponibilidadEditada}
                                onChange={(e) => setDisponibilidadEditada(e.target.value.split(','))}
                            />
                        </div>
                        <div className="atributosGato">
                            <span className="chip">⚙️ Chip:</span>
                            <input
                                type="checkbox"
                                checked={chipEditado}
                                onChange={(e) => setChipEditado(e.target.checked)}
                            />
                        </div>
                        <div className="atributosGato">
                            <span className="vacunado">💉 Vacunado:</span>
                            <input
                                type="checkbox"
                                checked={vacunadoEditado}
                                onChange={(e) => setVacunadoEditado(e.target.checked)}
                            />
                        </div>
                        <div className="atributosGato">
                            <span className="esterilizado">🐾 Esterilizado:</span>
                            <input
                                type="checkbox"
                                checked={esterilizadoEditado}
                                onChange={(e) => setEsterilizadoEditado(e.target.checked)}
                            />
                        </div>
                        <div className="atributosGato">
                            <span className="peso">⚖️ Peso:</span>
                            <input
                                type="number"
                                className="input"
                                value={pesoEditado}
                                onChange={(e) => setPesoEditado(parseFloat(e.target.value))}
                            />  
                        </div>
                        <div className="atributosGato">
                            <span className="historia">📜 Historia:</span>
                            <input
                                type="text"
                                className="inputHistoriayDescripcion"
                                value={historiaEditada}
                                onChange={(e) => setHistoriaEditada(e.target.value)}
                            />
                        </div>
                        <div className="atributosGato">
                            <span className="descripcion">Descripción:</span>
                            <input
                                type="text"
                                className="inputHistoriayDescripcion"
                                value={descripcionEditada}
                                onChange={(e) => setDescripcionEditada(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="botonEditarGato" onClick={putGato}>✏️ Guardar</button>
                </div>
                </>
            )}  

            {modo ==="insertar" && (
                <>
                <div className="contenedorGatoInsertar">
                    <p className="tituloGato">📋 Insertando un gato nuevo</p>
                    <div className="fichaGato"> {/* Si el usuario insertando un gato nuevo */}
                        <div className="atributosGato">
                            <span className="nombre">🐱 Nombre:</span>
                            <input                             
                                type="text"
                                className="input"
                                value={nombreEditado}
                                onChange={(e) => setNombreEditado(e.target.value)}
                            />
                        </div>
                        <div className="atributosGato">
                            <span className="raza">🧬 Raza:</span>
                            <input
                                type="text"
                                className="input"
                                value={razaEditada}
                                onChange={(e) => setRazaEditada(e.target.value)}
                            />
                        </div>
                        <div className="atributosGato">
                            <span className="fechaDeNacimiento">📅 Fecha de Nacimiento:</span>
                            <input
                                type="date"
                                className="input"
                                value={fechaNacimientoEditada}
                                onChange={(e) => setFechaNacimientoEditada(e.target.value)}
                            />   
                        </div>
                        <div className="atributosGato">
                            <span className="sexo">Sexo:</span>
                            <input
                                type="text"
                                className="input"
                                value={sexoEditado}
                                onChange={(e) => setSexoEditado(e.target.value)}
                            />     
                        </div>
                        <div className="atributosGato">
                            <span className="personalidad">🤗 Perosnalidad:</span>
                            <input
                                type="text"
                                className="input"
                                value={personalidadEditada}
                                onChange={(e) => setPersonalidadEditada(e.target.value.split(','))}
                            />
                        </div>
                        <div className="atributosGato">
                            <span className="disponibilidad">📅 Disponibilidad:</span>
                            <input
                                type="text"
                                className="input"
                                value={disponibilidadEditada}
                                onChange={(e) => setDisponibilidadEditada(e.target.value.split(','))}
                            />
                        </div>
                        <div className="atributosGato">
                            <span className="chip">⚙️ Chip:</span>
                            <input
                                type="checkbox"
                                checked={chipEditado}
                                onChange={(e) => setChipEditado(e.target.checked)}
                            />
                        </div>
                        <div className="atributosGato">
                            <span className="vacunado">💉 Vacunado:</span>
                            <input
                                type="checkbox"
                                checked={vacunadoEditado}
                                onChange={(e) => setVacunadoEditado(e.target.checked)}
                            />
                        </div>
                        <div className="atributosGato">
                            <span className="esterilizado">🐾 Esterilizado:</span>
                            <input
                                type="checkbox"
                                checked={esterilizadoEditado}
                                onChange={(e) => setEsterilizadoEditado(e.target.checked)}
                            />
                        </div>
                        <div className="atributosGato">
                            <span className="peso">⚖️ Peso:</span>
                            <input
                                type="number"
                                className="input"
                                value={pesoEditado}
                                onChange={(e) => setPesoEditado(parseFloat(e.target.value))}
                            />  
                        </div>
                        <div className="atributosGato">
                            <span className="historia">📜 Historia:</span>
                            <input
                                type="text"
                                className="inputHistoriayDescripcion"
                                value={historiaEditada}
                                onChange={(e) => setHistoriaEditada(e.target.value)}
                            />
                        </div>
                        <div className="atributosGato">
                            <span className="descripcion">Descripción:</span>
                            <input
                                type="text"
                                className="inputHistoriayDescripcion"
                                value={descripcionEditada}
                                onChange={(e) => setDescripcionEditada(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="botonInsertarGato" onClick={postGato}>✏️ Crear</button>
                </div>
                </>
            )}

            {modo ==="eliminar" && gato &&(
                <>
                <div className="contenedorGatoEliminar">
                    <p className="tituloGato">📋 MENU ELIMINAR GATO</p>
                    <div className="fichaGato"> {/* Si el usuario insertando un gato nuevo */}
                        <div className="atributosGato">
                            <span className="id">🐱 ID:</span> {gato.id}
                            <span className="nombre">🐱 Nombre:</span> {gato.nombre}
                        </div>
                        <div className="gato" key={gato.id}>
                        <img src={gato.foto} alt={gato.nombre} className="fotoGato" />
                    </div>
                    </div>
                    <button className="botonEliminarGato" onClick={() => {
                        if (window.confirm("¿Estás seguro de que quieres eliminar este gato?")) {
                        alert("Eliminando gato...");
                            // Aqui poner el codigo para enviar delelte a azure
                        }
                    }}> ❌ Eliminar
                    </button>
                </div>
                </>
            )}
        </div>
    );
};

export default Gato;