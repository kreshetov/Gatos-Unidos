import React, { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate(); // Hook para navegar entre rutas (para redirigir a la lista de Gatos despues de editar, insertar o eliminar)
    const [gato, setGato] = useState<InterfazGato | null>(null); // Estado para almacenar los datos del gato
    const [searchParams] = useSearchParams(); // Obtiene los parametros de busqueda de la URL
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
    const [fotoEdit, setFotoEdit] = useState<string>('');
    const [descripcionEdit, setDescripcionEdit] = useState<string>('');

    // Hooks ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 1 Obtencion datos del gato. Estos se obtienen de la API. Solo se ejecuta cuando los modos son: lectura, editar, eliminar.
    useEffect(() => { // useEffect se ejecuta una vez al cargar el componente y cada vez que cambia el id del gato
        if (modo !== "insertar") { // Si el modo no es insertar, hace fetch para trear a los gatos
            fetch(`https://storagegatosunidos.blob.core.windows.net/datos/gato_${id}?nocache=${Date.now()}`) // fetch se utiliza para hacer una solicitud HTTP a la API y obtener los datos del gato
            .then((response) => response.json()) // then se utiliza para manejar la respuesta de la API y convertirla a JSON como un objeto de TypeScript
            .then((data) => setGato(data))
            .catch((error) => console.error('Error al obtener el gato', error)); // catch se utiliza para manejar cualquier error que ocurra durante la solicitud
        } 
    }, [modo, id]); // id solo se ejecuta si cambia el id del gato (es el segundo argumento de useEffect)

    // 2 Carga los datos actuales del gato en los inputs de la ficha editada
    useEffect(() => {
        if (modo === "editar" && gato) {
            setNombreEdit(gato.nombre);
            setFotoEdit(gato.foto);
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

    // 1 Validar campos del formulario del gato
    const validarCamposGato = (gato: InterfazGato): string[] => {
        const errores: string[] = [];
        const letrasYespacios =  /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        const letrasNumerosSimbolos = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,¡!?:;-]+$/;
        const hoy = new Date().toISOString().split("T")[0];

        if (gato.nombre === "" || !letrasYespacios.test(gato.nombre)) {
            errores.push("Nombre invalido: Solo se permiten letrasy  espacios");
        }
        if (gato.raza === "" || !letrasYespacios.test(gato.raza)) {
            errores.push("Raza inválida: Solo se permiten letras");
        }
        if (!gato.fechaNacimiento || gato.fechaNacimiento.trim() === "") {
            errores.push("Fecha de nacimiento inválida: Debes seleccionar una fecha");
        } else if (gato.fechaNacimiento > hoy) {
            errores.push("Fecha de nacimiento inválida: No puede ser futura");
        }
        if (!gato.sexo || gato.sexo.trim() === "") {
        errores.push("Sexo inválido: Debes seleccionar el sexo del gato");
}
        if (gato.personalidad.length === 0 || gato.personalidad.some(personalidad => !letrasYespacios.test(personalidad))) {
            errores.push("Personalidad inválida: Debe contener al menos una opción y solo letras, puedes separar las opciones con comas o espacios");
        }
        if (gato.peso <= 0) {
            errores.push("Peso inválido: Tiene que pesar mas de 0 KG");
        }
        if (gato.disponibilidad.length === 0) {
            errores.push("Disponibilidad inválida: Tienes que elegir al menos una opción (Adoptar, Acoger o Apadrinar)");
        }
        if (gato.historia === "" || !letrasNumerosSimbolos.test(gato.historia)) {
            errores.push("Historia inválida");
        }
        if (gato.descripcion === "" || !letrasNumerosSimbolos.test(gato.descripcion)) {
            errores.push("Descripción inválida");
    }

        return errores;
        };


    // 2 Editar gato existente  
    const putGato = async () => {
        if (!gato) return;
        // Validar y obtener lista de errores
        const errores = validarCamposGato({
            id: gato.id,
            nombre: nombreEdit,
            raza: razaEdit,
            fechaNacimiento: fechaNacimientoEdit,
            sexo: sexoEdit,
            personalidad: personalidadEdit,
            peso: pesoEdit,
            chip: chipEdit,
            vacunado: vacunadoEdit,
            esterilizado: esterilizadoEdit,
            disponibilidad: disponibilidadEdit,
            historia: historiaEdit,
            foto: fotoEdit,
            descripcion: descripcionEdit
        });

        if (errores.length > 0) {
            alert("Corrige los siguientes errores:\n" + errores.join("\n"));
            return; // No enviar el formulario si hay errores
        }
        try {
            const res = await fetch('https://funcionesgato.azurewebsites.net/api/EditarGato', {
            method: 'PUT',
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: gato.id,
                nombre: nombreEdit,
                raza: razaEdit,
                fechaNacimiento: fechaNacimientoEdit,
                sexo: sexoEdit,
                personalidad: personalidadEdit,
                peso: pesoEdit,
                chip: chipEdit,
                vacunado: vacunadoEdit,
                esterilizado: esterilizadoEdit,
                disponibilidad: disponibilidadEdit,
                historia: historiaEdit,
                foto: fotoEdit,
                descripcion: descripcionEdit
            }),
            });
            const data = await res.text();
            console.log('Gato actualizado:', data);
            alert('Ficha guardada con éxito');
            navigate('/Gatos');
        } catch (err) {
            console.error('Error al guardar la ficha:', err);
            alert('Error al guardar la ficha');
        }
        };

    // 3 Insertar gato nuevo
    const postGato = () => {
        const errores = validarCamposGato({
            id: 0, // Se ignora en el POST
            nombre: nombreEdit,
            raza: razaEdit,
            fechaNacimiento: fechaNacimientoEdit,
            sexo: sexoEdit,
            personalidad: personalidadEdit,
            peso: pesoEdit,
            chip: chipEdit,
            vacunado: vacunadoEdit,
            esterilizado: esterilizadoEdit,
            disponibilidad: disponibilidadEdit,
            historia: historiaEdit,
            foto: fotoEdit,
            descripcion: descripcionEdit
        });

        if (errores.length > 0) {
            alert("Errores en el formulario:\n\n" + errores.join("\n"));
            return;
        }

        // Si todo es válido, hacemos el POST
        fetch('https://funcionesgato.azurewebsites.net/api/InsertarGato', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombreEdit,
                raza: razaEdit,
                fechaNacimiento: fechaNacimientoEdit,
                sexo: sexoEdit,
                personalidad: personalidadEdit,
                peso: pesoEdit,
                chip: chipEdit,
                vacunado: vacunadoEdit,
                esterilizado: esterilizadoEdit,
                disponibilidad: disponibilidadEdit,
                historia: historiaEdit,
                foto: (!fotoEdit || fotoEdit.trim() === "") 
                    ? "https://storagegatosunidos.blob.core.windows.net/imagenes/creando_gato.png" 
                    : fotoEdit,
                descripcion: descripcionEdit
            })
        })
        .then(async (res) => {
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText);
            }
            const texto = await res.text();
            return texto;
        })
        .then((data) => {
            console.log('Gato insertado:', data);
            alert('Gato insertado con éxito');
            navigate('/Gatos');
        })
        .catch((err) => {
            console.error('Error al insertar al gato:', err);
            alert('Error al insertar al gato: ' + err.message);
        });
    };

    // 4 Eliminar un gato existente
    const eliminarGato = () => {
        if (!gato) {
            alert('No hay gato para eliminar');
            return;
        }
        const confirmar = window.confirm("¿Estás seguro de que quieres eliminar este gato?");
        if (!confirmar) { // Si el usuario cancela la eliminación, no se hace nada
            return;
        }
        fetch(`https://funcionesgato.azurewebsites.net/api/EliminarGato?id=${gato.id}`, {
            method: 'DELETE',
        })
        .then(async (res) => {
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText);
            }
            return res.text();
        })
        .then((data) => {
            console.log('Gato eliminado:', data);
            alert('Gato eliminado con éxito');
            navigate('/Gatos');
        })
        .catch((err) => {
            console.error('Error al eliminar el gato:', err);
            alert('Error al eliminar el gato: ' + err.message);
        });
    };

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
                        <div className="divAtributosGato"><span className="atributoGato">🚹🚺Sexo</span><span className="valorGato">{gato.sexo}</span></div>  
                        <div className="divAtributosGato"><span className="atributoGato">🤗 Personalidad</span><span className="valorGato">{gato.personalidad.join(", ")}</span></div>  
                        <div className="divAtributosGato"><span className="atributoGato">⚖️ Peso</span><span className="valorGato">{gato.peso} KG</span></div>  
                        <div className="divAtributosGato"><span className="atributoGato">⚙️ Chip</span><span className="valorGato">{gato.chip ? "Sí" : "No"}</span></div>  
                        <div className="divAtributosGato"><span className="atributoGato">💉 Vacunado</span><span className="valorGato">{gato.vacunado ? "Sí" : "No"}</span></div>
                        <div className="divAtributosGato"><span className="atributoGato">🐾 Esterilizado</span><span className="valorGato">{gato.esterilizado ? "Sí" : "No"}</span></div>  
                        <div className="divAtributosGato"><span className="atributoGato">📅 Disponibilidad</span><span className="valorGato">{gato.disponibilidad.join(", ")}</span></div> 
                        <div className="divAtributosGato columna"><span className="atributoGato">📜 Historia</span><span className="valorGatoHistoria">{gato.historia}</span></div>  
                        <div className="divAtributosGato columna"><span className="atributoGato">🗒️ Descripción</span><span className="valorGatoDescripcion">{gato.descripcion}</span></div>
                    </div>
                    <div className="gato" key={gato.id}>
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
                        <div className="divAtributosGatoEditar"><span className="atributoGatoEditar">📸 Foto</span><input type="text" className="input" value={fotoEdit} onChange={(e) => setFotoEdit(e.target.value)}/></div>
                        <div className="divAtributosGatoEditar"><span className="atributoGatoEditar">🧬 Raza</span><input type="text" className="input" value={razaEdit} onChange={(e) => setRazaEdit(e.target.value)}/></div>
                        <div className="divAtributosGatoEditar"><span className="atributoGatoEditar">📅 Fecha de Nacimiento</span><input type="date" className="input" value={fechaNacimientoEdit} onChange={(e) => setFechaNacimientoEdit(e.target.value)}/></div>
                        <div className="divAtributosGatoEditar"><span className="atributoGatoEditar">🚹🚺 Sexo</span>
                            <label style={{ marginRight: "1rem" }}><input type="radio" name="sexo" value="Macho" checked={sexoEdit === "Macho"} onChange={(e) => setSexoEdit(e.target.value)} />{" "} 🚹 Macho </label>
                            <label> <input type="radio" name="sexo" value="Hembra" checked={sexoEdit === "Hembra"}onChange={(e) => setSexoEdit(e.target.value)}/>{" "}🚺 Hembra</label>
                        </div>
                        <div className="divAtributosGatoEditar"><span className="atributoGatoEditar">🤗 Personalidad</span><input type="text" className="input" value={personalidadEdit} onChange={(e) => setPersonalidadEdit(e.target.value.split(','))}/></div>   
                        <div className="divAtributosGatoEditar"><span className="atributoGatoEditar">⚖️ Peso</span><input type="number" className="input" value={pesoEdit} onChange={(e) => setPesoEdit(e.target.value ? parseFloat(e.target.value) : 0)}/>  </div>
                        <div className="divAtributosGatoEditar"><span className="atributoGatoEditar">⚙️ Chip</span><input type="checkbox" checked={chipEdit} onChange={(e) => setChipEdit(e.target.checked)}/></div>  
                        <div className="divAtributosGatoEditar"><span className="atributoGatoEditar">💉 Vacunado</span><input type="checkbox" checked={vacunadoEdit} onChange={(e) => setVacunadoEdit(e.target.checked)}/></div>
                        <div className="divAtributosGatoEditar"><span className="atributoGatoEditar">🐾 Esterilizado</span><input type="checkbox" checked={esterilizadoEdit} onChange={(e) => setEsterilizadoEdit(e.target.checked)}/></div>
                        <div className="divAtributosGatoEditar"><span className="atributoGatoEditar">📅 Disponibilidad</span>{['Adoptar', 'Acoger', 'Apadrinar'].map((opcion) => (
                            <label key={opcion} style={{ marginRight: '1rem' }}>
                                <input type="checkbox" value={opcion} checked={disponibilidadEdit.includes(opcion)} onChange={(e) => {
                                    const valor = e.target.value;
                                    if (e.target.checked) {
                                    // Agregar la opción seleccionada al array
                                    setDisponibilidadEdit([...disponibilidadEdit, valor]);
                                    } else {
                                    // Quitar la opción deseleccionada del array
                                    setDisponibilidadEdit(disponibilidadEdit.filter((d) => d !== valor));
                                    }
                                }}/>{' '}{opcion}
                            </label>
                            ))}
                        </div>
                        <div className="divAtributosGatoEditar"><span className="atributoGatoEditar">📜 Historia</span><textarea className="inputHistoriaEditar" value={historiaEdit} onChange={(e) => setHistoriaEdit(e.target.value)}/></div>
                        <div className="divAtributosGatoEditar"><span className="atributoGatoEditar">🗒️ Descripción</span><textarea className="inputDescripcionEditar" value={descripcionEdit} onChange={(e) => setDescripcionEdit(e.target.value)}/></div>
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
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">🐱 Nombre</span><input type="text" className="input" placeholder="Colita Feliz..." value={nombreEdit} onChange={(e) => setNombreEdit(e.target.value)}/></div>
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">📸 Foto</span><input type="text" className="input" placeholder="URL de una foto o deja el campo en blanco..." value={fotoEdit} onChange={(e) => setFotoEdit(e.target.value)}/></div>
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">🧬 Raza</span><input type="text" className="input" placeholder="Persa..." value={razaEdit} onChange={(e) => setRazaEdit(e.target.value)}/></div>
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">📅 Fecha de Nacimiento</span><input type="date" className="input" value={fechaNacimientoEdit} onChange={(e) => setFechaNacimientoEdit(e.target.value)}/></div>
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">🚹🚺 Sexo</span>
                            <label style={{ marginRight: "1rem" }}><input type="radio" name="sexo" value="Macho" checked={sexoEdit === "Macho"} onChange={(e) => setSexoEdit(e.target.value)} />{" "} 🚹 Macho </label>
                            <label> <input type="radio" name="sexo" value="Hembra" checked={sexoEdit === "Hembra"}onChange={(e) => setSexoEdit(e.target.value)}/>{" "}🚺 Hembra</label>
                        </div>
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">🤗 Personalidad</span><input type="text" className="input" placeholder="Cariñoso, Jugeton, Cursioso..." value={personalidadEdit} onChange={(e) => setPersonalidadEdit(e.target.value.split(','))}/></div>
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">⚖️ Peso</span><input type="number" className="input" value={pesoEdit} onChange={(e) => setPesoEdit(e.target.value ? parseFloat(e.target.value) : 0)}/>  </div>
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">⚙️ Chip</span> <input type="checkbox" checked={chipEdit} onChange={(e) => setChipEdit(e.target.checked)}/></div>
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">💉 Vacunado</span><input type="checkbox" checked={vacunadoEdit} onChange={(e) => setVacunadoEdit(e.target.checked)}/></div>
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">🐾 Esterilizado</span> <input type="checkbox" checked={esterilizadoEdit} onChange={(e) => setEsterilizadoEdit(e.target.checked)}/></div>
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">📅 Disponibilidad</span>{['Adoptar', 'Acoger', 'Apadrinar'].map((opcion) => (
                            <label key={opcion} style={{ marginRight: '1rem' }}><input type="checkbox" value={opcion} checked={disponibilidadEdit.includes(opcion)} onChange={(e) => {
                                const valor = e.target.value;
                                if (e.target.checked) {
                                // Agregar la opción seleccionada al array
                                setDisponibilidadEdit([...disponibilidadEdit, valor]);
                                } else {
                                // Quitar la opción deseleccionada del array
                                setDisponibilidadEdit(disponibilidadEdit.filter((tipoDisponibilidad) => tipoDisponibilidad !== valor));
                                }}}/>{' '}{opcion}
                                </label>))}
                        </div>
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">📜 Historia</span><textarea className="inputHistoriaInsertar" placeholder="Gatito rescatado de una casa abandonada en Málaga..." value={historiaEdit} onChange={(e) => setHistoriaEdit(e.target.value)}/></div>
                        <div className="divAtributosGatoInsertar"><span className="atributoGatoInsertar">🗒️ Descripción</span><textarea className="inputDescripcionInsertar" placeholder="Es un gato increible! Sera el nuevo dueño de tu sofa y tranquilo, casi no suelta pelo!..." value={descripcionEdit} onChange={(e) => setDescripcionEdit(e.target.value)}/></div>
                    </div>
                    <button className="botonInsertarGato" onClick={postGato}>💾 Insertar</button>
                </div>  
                </>
            )}


            {/* Modo eliminar. Borrar un gato existente */}
            {modo ==="eliminar" && gato &&(
                <>
                <div className="contenedorGatoEliminar">
                    <p className="tituloGatoEliminar">📋 Eliminar a {gato.nombre}</p>
                    <div className="fichaGatoEliminar"> 
                        <div className="divAtributosGatoEliminar">
                            <span className="atributoGatoEliminar">🐱 ID:</span><span className="valorGato">{gato.id}</span>
                            <span className="atributoGatoEliminar">🐱 Nombre:</span><span className="valorGato">{gato.nombre}</span>
                        </div>
                        <div className="gatoEliminar" key={gato.id}><img src={gato.foto} alt={gato.nombre} className="fotoGatoEliminar" /></div>
                    </div>
                    <button className="botonEliminarGato" onClick={eliminarGato}> ❌ Eliminar </button>
                </div>
                </>
            )}
        </div>
    );
};

export default Gato;