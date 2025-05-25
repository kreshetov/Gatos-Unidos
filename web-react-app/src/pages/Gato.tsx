import React, { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';

// Estructura de datos del gato ----------------------------------------------------------------------------------------------------------------------------------------------------
interface InterfazGato {
    id: number;
    nombre: string;
    raza: string;
    fechaNacimiento: string;
    sexo: string;
    personalidad: string[];
    peso: number;
    chip: boolean;
    vacunado: boolean;
    esterilizado: boolean;
    disponibilidad: string[];
    historia: string;
    foto: string;
    descripcion: string;
}

// Componente Gato  ----------------------------------------------------------------------------------------------------------------------------------------------------------------
const Gato = () => {
    const [gato, setGato] = useState<InterfazGato | null>(null); // Estado para almacenar los datos del gato
    const [searchParams] = useSearchParams(); // Obtiene los parametros de buslqueda de la URL
    const modo = searchParams.get('modo'); // Obtiene el modo de la URL (lectura, editar, crear, eliminar)
    const { id } = useParams<{ id: string }>(); // Obtiene el id del gato desde la URL
    
    // Estados para editar/insertar gato -------------------------------------------------------------------------------------------------------------------------------------------
    const [nombreEdit, setNombreEdit] = useState<string>('');
    const [razaEdit, setRazaEdit] = useState<string>('');
    const [fechaNacimientoEdit, setFechaNacimientoEdit] = useState<string>('');
    const [sexoEdit, setSexoEdit] = useState<string>(''); 
    const [personalidadEdit, setPersonalidadEdit] = useState<string[]>([]);
    const [pesoEdit, setPesoEdit] = useState<number>(0);
    const [chipEdit, setChipEdit] = useState<boolean>(false);
    const [vacunadoEdit, setVacunadoEdit] = useState<boolean>(false);
    const [esterilizadoEdit, setEsterilizadoEdit] = useState<boolean>(false);
    const [disponibilidadEdit, setDisponibilidadEdit] = useState<string[]>([]);
    const [historiaEdit, setHistoriaEdit] = useState<string>('');
    // const [fotoEditada, setFotoEditada] = useState<string>('');
    const [descripcionEdit, setDescripcionEdit] = useState<string>('');

    // Hooks ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 1 Obtencion datos del gato. Estos se obtienen de la API. Solo se ejecuta cuando los modos son: lectura, editar, eliminar.
    useEffect(() => { // useEffect se ejecuta una vez al cargar el componente y cada vez que cambia el id del gato
        if (modo !== "insertar") { // Si el modo no es insertar, hace fetch para trear a los gatos
            fetch(`https://storagegatosunidos.blob.core.windows.net/datos/gato_${id}`) // fetch se utiliza para hacer una solicitud HTTP a la API y obtener los datos del gato
            .then((response) => response.json()) // then se utiliza para manejar la respuesta de la API y convertirla a JSON como un objeto de TypeScript
            .then((data) => setGato(data))
            .catch((error) => console.error('Error al obtener el gato', error)); // catch se utiliza para manejar cualquier error que ocurra durante la solicitud
        } 
    }, [modo, id]); // id solo se ejecuta si cambia el id del gato (es el segundo argumento de useEffect)

    // 2 Carga los datos actuales del gato en los inputs de la ficha editada
    useEffect(() => {
        if (modo === "editar" && gato) {
            setNombreEdit(gato.nombre);
            setRazaEdit(gato.raza);
            setFechaNacimientoEdit(gato.fechaNacimiento);
            setSexoEdit(gato.sexo);
            setPersonalidadEdit(gato.personalidad);
            setPesoEdit(gato.peso);
            setChipEdit(gato.chip);
            setVacunadoEdit(gato.vacunado);
            setEsterilizadoEdit(gato.esterilizado);
            setDisponibilidadEdit(gato.disponibilidad);
            setHistoriaEdit(gato.historia);
            setDescripcionEdit(gato.descripcion);
        }
    }, [modo, gato]);

    // Metodos ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 1 Editar gato existente  
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
            id: gato.id,
            nombre: nombreEdit,
            raza: razaEdit, 
            fechaNacimientoEdit,
            sexo: sexoEdit, 
            personalidad: personalidadEdit, 
            peso: pesoEdit, 
            chip: chipEdit, 
            vacinaod: vacunadoEdit, 
            esterilizado: esterilizadoEdit, 
            disponibilidad: disponibilidadEdit, 
            historia: historiaEdit, 
            descripcion: descripcionEdit})
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



    // 2 Insertar gato nuevo
    const postGato = () => {
        // Se envía una solicitud POST a la API para crear un nuevo gato
        fetch('https://30f6ed45-fb84-480e-8cb7-5dc79fe76a6d.mock.pstmn.io/Gatos', {
            method: 'POST', // Usar POST para agregar un nuevo gato
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                nombre: nombreEdit,
                raza: razaEdit,
                sexo: sexoEdit,
                fechaNacimiento: fechaNacimientoEdit,
                chip: chipEdit,
                vacunado: vacunadoEdit,
                esterilizado: esterilizadoEdit,
                peso: pesoEdit,
                personalidad: personalidadEdit,
                disponibilidad: disponibilidadEdit,
                historia: historiaEdit,
                descripcion: descripcionEdit
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

    // 3 Eliminar un gato existente


    // Return del componente Gato. Aqui se manejan 4 modos: Leer, editar, insertar y eliminar --------------------------------------------------------------------------------------
    return (
        <div className="content">
            {/* Modo lectura. Mostrar datos del gato */}
            {modo ==="lectura" && gato &&(
                <>
                <div className="contenedorGatoLectura">
                    <div className="fichaGato">
                        <div className="divAtributosGato"><span className="atributoGato">🐱 Nombre</span><span className="valorGato">{gato.nombre}</span></div>   
                        <div className="divAtributosGato"><span className="atributoGato">🧬 Raza</span><span className="valorGato">{gato.raza}</span></div>  
                        <div className="divAtributosGato"><span className="atributoGato">📅 Fecha de Nacimiento</span><span className="valorGato">{gato.fechaNacimiento}</span></div>  
                        <div className="divAtributosGato"><span className="atributoGato">{gato.sexo === "Macho" ? "🚹" : "🚺"} Sexo</span><span className="valorGato">{gato.sexo}</span></div>  
                        <div className="divAtributosGato"><span className="atributoGato">🤗 Personalidad</span><span className="valorGato">{gato.personalidad.join(", ")}</span></div>  
                        <div className="divAtributosGato"><span className="atributoGato">⚖️ Peso</span><span className="valorGato">{gato.peso} KG</span></div>  
                        <div className="divAtributosGato"><span className="atributoGato">⚙️ Chip</span><span className="valorGato">{gato.chip ? "Sí" : "No"}</span></div>  
                        <div className="divAtributosGato"><span className="atributoGato">💉 Vacunado</span><span className="valorGato">{gato.vacunado ? "Sí" : "No"}</span></div>
                        <div className="divAtributosGato"><span className="atributoGato">🐾 Esterilizado</span><span className="valorGato">{gato.esterilizado ? "Sí" : "No"}</span></div>  
                        <div className="divAtributosGato"><span className="atributoGato">📅 Disponibilidad</span><span className="valorGato">{gato.disponibilidad.join(", ")}</span></div> 
                        <div className="divAtributosGato"><span className="atributoGato">📜 Historia</span><span className="valorGato">{gato.historia}</span></div>  
                        <div className="divAtributosGato"><span className="atributoGato">🗒️ Descripción</span><span className="valorGato">{gato.descripcion}</span></div>
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
 
            
            {/* Modo editar. Modificar ficha de un gato existente */}
            {modo ==="editar" && gato &&(
                <>
                <div className="contenedorGatoEditar">
                    <p className="tituloGatoEditar">📋 Editar Ficha de {gato.nombre}</p>
                    <div className="fichaGatoEditar">
                        <div className="divAtributosGatoEditar"><span className="atributoGatoEditar">🐱 Nombre</span><input type="text" className="input" value={nombreEdit} onChange={(e) => setNombreEdit(e.target.value)}/></div>
                        <div className="divAtributosGatoEditar"><span className="atributoGatoEditar">🧬 Raza</span><input type="text" className="input" value={razaEdit} onChange={(e) => setRazaEdit(e.target.value)}/></div>
                        <div className="divAtributosGatoEditar"><span className="atributoGatoEditar">📅 Fecha de Nacimiento</span><input type="date" className="input" value={fechaNacimientoEdit} onChange={(e) => setFechaNacimientoEdit(e.target.value)}/>   </div>
                        <div className="divAtributosGatoEditar"><span className="atributoGatoEditar">{gato.sexo === "Macho" ? "🚹" : "🚺"} Sexo</span><input type="text" className="input" value={sexoEdit} onChange={(e) => setSexoEdit(e.target.value)}/>     </div>
                        <div className="divAtributosGatoEditar"><span className="atributoGatoEditar">🤗 Personalidad</span><input type="text" className="input" value={personalidadEdit} onChange={(e) => setPersonalidadEdit(e.target.value.split(','))}/></div>
                        <div className="divAtributosGatoEditar"><span className="atributoGatoEditar">⚖️ Peso</span><input type="number" className="input" value={pesoEdit} onChange={(e) => setPesoEdit(parseFloat(e.target.value))}/>  </div>
                        <div className="divAtributosGatoEditar"><span className="atributoGatoEditar">⚙️ Chip</span><input type="checkbox" checked={chipEdit} onChange={(e) => setChipEdit(e.target.checked)}/></div>  
                        <div className="divAtributosGatoEditar"><span className="atributoGatoEditar">💉 Vacunado</span><input type="checkbox" checked={vacunadoEdit} onChange={(e) => setVacunadoEdit(e.target.checked)}/></div>
                        <div className="divAtributosGatoEditar"><span className="atributoGatoEditar">🐾 Esterilizado</span><input type="checkbox" checked={esterilizadoEdit} onChange={(e) => setEsterilizadoEdit(e.target.checked)}/></div>
                        <div className="divAtributosGatoEditar"><span className="atributoGatoEditar">📅 Disponibilidad</span><input type="text" className="input" value={disponibilidadEdit} onChange={(e) => setDisponibilidadEdit(e.target.value.split(','))}/></div>
                        <div className="divAtributosGatoEditar"><span className="atributoGatoEditar">📜 Historia</span><input type="text" className="inputHistoriayDescripcion" value={historiaEdit} onChange={(e) => setHistoriaEdit(e.target.value)}/></div>
                        <div className="divAtributosGatoEditar"><span className="atributoGatoEditar">🗒️ Descripción</span><input type="text" className="inputHistoriayDescripcion" value={descripcionEdit} onChange={(e) => setDescripcionEdit(e.target.value)}/></div>
                    </div>
                    <button className="botonEditarGato" onClick={putGato}>✏️ Guardar</button>
                </div>
                </>
            )}  


            {/* Modo insertar. Crear un gato nuevo */}
            {modo ==="insertar" && (
                <>
                <div className="contenedorGatoInsertar">
                    <p className="tituloGatoInsertar">📋 Insertando un gato nuevo</p>
                    <div className="fichaGatoInsertar"> 
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">🐱 Nombre</span><input type="text" className="input" value={nombreEdit} onChange={(e) => setNombreEdit(e.target.value)}/></div>
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">🧬 Raza</span><input type="text" className="input" value={razaEdit} onChange={(e) => setRazaEdit(e.target.value)}/></div>
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">📅 Fecha de Nacimiento</span><input type="date" className="input" value={fechaNacimientoEdit} onChange={(e) => setFechaNacimientoEdit(e.target.value)}/>   </div>
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">🚹🚺 Sexo</span><input type="text" className="input" value={sexoEdit} onChange={(e) => setSexoEdit(e.target.value)}/>     </div>
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">🤗 Personalidad</span><input type="text" className="input" value={personalidadEdit} onChange={(e) => setPersonalidadEdit(e.target.value.split(','))}/></div>
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">⚖️ Peso</span><input type="number" className="input" value={pesoEdit} onChange={(e) => setPesoEdit(parseFloat(e.target.value))}/>  </div>
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">⚙️ Chip</span> <input type="checkbox" checked={chipEdit} onChange={(e) => setChipEdit(e.target.checked)}/></div>
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">💉 Vacunado</span><input type="checkbox" checked={vacunadoEdit} onChange={(e) => setVacunadoEdit(e.target.checked)}/></div>
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">🐾 Esterilizado</span> <input type="checkbox" checked={esterilizadoEdit} onChange={(e) => setEsterilizadoEdit(e.target.checked)}/></div>
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">📅 Disponibilidad</span><input type="text" className="input" value={disponibilidadEdit} onChange={(e) => setDisponibilidadEdit(e.target.value.split(','))}/></div>
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">📜 Historia</span><input type="text" className="inputHistoriayDescripcion" value={historiaEdit} onChange={(e) => setHistoriaEdit(e.target.value)}/></div>
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">🗒️ Descripción</span><input type="text" className="inputHistoriayDescripcion" value={descripcionEdit} onChange={(e) => setDescripcionEdit(e.target.value)}/></div>
                    </div>
                    <button className="botonInsertarGato" onClick={postGato}>✏️ Crear</button>
                </div>
                </>
            )}


            {/* Modo eliminar. Borrar un gato existente */}
            {modo ==="eliminar" && gato &&(
                <>
                <div className="contenedorGatoEliminar">
                    <p className="tituloGatoEliminar">📋 MENU ELIMINAR GATO</p>
                    <div className="fichaGatoEliminar"> 
                        <div className="divAtributosGatoEliminar">
                            <span className="atributoGatoEliminar">🐱 ID:</span><span className="valorGato">{gato.id}</span>
                            <span className="atributoGatoEliminar">🐱 Nombre:</span><span className="valorGato">{gato.nombre}</span>
                        </div>
                        <div className="gatoEliminar" key={gato.id}><img src={gato.foto} alt={gato.nombre} className="fotoGatoEliminar" /></div>
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