import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Estructura de datos de la clinica-----------------------------------------------------------------------------------------------------------------------------------------------
interface interfazClinica {
    id : number;
    nombre: string;
    foto: string;
    especialidad: string;
    descripcion: string;
    direccion: string;
    direccionMapa: string;
    telefono: string;
    email: string;
    web: string;
    horario: string;
    servicios: string;
    valoracion: number;
    reseñas: number;
}

// Componente Clinica ------------------------------------------------------------------------------------------------------------------------------------------------------------
const Clinica = () => {
    const navigate = useNavigate(); // Hook para navegar entre rutas (para redirigr a la lista de Clinicas despues de editar, insertar o eliminar)
    const [clinica, setClinica] = useState<interfazClinica | null>(null);
    const [searchParams] = useSearchParams(); // Obtiene los parametros de busqueda de la URL
    const modo = searchParams.get("modo"); // Obtiene el modo de la URL (lectura, editar, insertar, eliminar)
    const { id } = useParams<{ id: string }>(); // Obtiene el id de la clinica desde la URL

    // Estados para editar/insertar clinica --------------------------------------------------------------------------------------------------------------------------------------
    const [nombreEdit, setNombreEdit] = useState<string>('');
    const [fotoEdit, setFotoEdit] = useState<string>('');
    const [especialidadEdit, setEspecialidadEdit] = useState<string>('');
    const [descripcionEdit, setDescripcionEdit] = useState<string>('');
    const [direccionEdit, setDireccionEdit] = useState<string>('');
    const [direccionMapaEdit, setDireccionMapaEdit] = useState<string>('');
    const [telefonoEdit, setTelefonoEdit] = useState<string>('');
    const [emailEdit, setEmailEdit] = useState<string>('');
    const [webEdit, setWebEdit] = useState<string>('');
    const [horarioEdit, setHorarioEdit] = useState<string>('');
    const [serviciosEdit, setServiciosEdit] = useState<string>('');
    const [valoracionEdit, setValoracionEdit] = useState<number>(0);
    const [reseñasEdit, setReseñasEdit] = useState<number>(0);


    // Hooks ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 1 Obtencion de datos de la clinica. Estos se obtienen de ka API. Solo se ejecuta cuando los modos son: lectura, editar, eliminar.
    useEffect(() => { // useEffect se ejecuta una vez al cargar el componente y cada vez que cambia el id de la clinica
        if (modo !=="insertar") { // Si el modo no es insertar, hace fetch para trear a los clinicas
            fetch(`https://storagegatosunidos.blob.core.windows.net/datos/clinica_${id}?nocache=${Date.now()}`) // fetch se utiliza para hacer una solicitud HTTP a la API y obtener los datos de la clinica
            .then((response) => response.json()) // then se utiliza para manejar la respuesta de la API y convertirla a JSON como un objeto de TypeScript
            .then((data) => setClinica(data))
            .catch((error) => console.error('Error al obtener la clinica', error)); // catch se utiliza para manejar cualquier error que ocurra durante la solicitud
            }
        }, [modo, id]); // id solo se ejecuta si cambia el id de la clinica (es el segundo argumento)
    
    // 2 Carga los datos actuales de la clinica en los inputs de la ficha editada
    useEffect(() => {
        if (modo ==="editar" && clinica) {
            setNombreEdit(clinica.nombre);
            setEspecialidadEdit(clinica.especialidad);
            setDescripcionEdit(clinica.descripcion);
            setDireccionEdit(clinica.direccion)
            setDireccionMapaEdit(clinica.direccionMapa);
            setTelefonoEdit(clinica.telefono);
            setEmailEdit(clinica.email);
            setWebEdit(clinica.web);
            setHorarioEdit(clinica.horario);
            setServiciosEdit(clinica.servicios);
            setValoracionEdit(clinica.valoracion);
            setReseñasEdit(clinica.reseñas);
        }
    }, [modo, clinica]);

    // Metodos --------------------------------------------------------------------------------------------------------------------------------------------------------------------

    // 1 Validar campos el formulario de la clinica
    const validarCamposClinica = (clinica: interfazClinica): string[] => {
        const errores: string[] = [];
        const letrasYespacios =  /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Nombre y Especialidad
        const validarEspecialidad = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s,]+$/;
        const soloDireccion = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,ªº°#\-\/\\]+$/; // Direccion
        const urlMapa = /^https:\/\/www\.google\.com\/maps\/embed\?[^ ]*!.*$/; // URL Mapa
        const numerosEspaciosGuiones = /^(\d{9}|\d{3}-\d{3}-\d{3}|\d{3} \d{3} \d{3})$/; // Telefono
        const validarEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email
        const urlWeb = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=%]*)?$/; // Web
        const validarServicios = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+(,\s[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+)*$/; // Servicios
        const validarHorario = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ,._:\-]+$/;  // Horario
        const descripcionValida = /^.*\S.*$/; // Descripcion

        if (!clinica.nombre || !letrasYespacios.test(clinica.nombre.trim())) {
            errores.push("Nombre invalido: Solo se permiten letras y espacios, y no puede estar vacío.");
        }
        if (!clinica.especialidad || !validarEspecialidad.test(clinica.especialidad.trim())) {
            errores.push("Especialidad invalida: Solo se permiten letras y espacios, y no puede estar vacía.");
        }
        if (!clinica.direccion || clinica.direccion.trim() === "" || !soloDireccion.test(clinica.direccion.trim())) {
            errores.push("Dirección invalida: Solo se permiten letras, numeros y signos de puntuación básicos, y no puede estar vacía.");
        }
        if (clinica.direccionMapa !== "" && (!clinica.direccionMapa.trim() || !urlMapa.test(clinica.direccionMapa.trim()))) {
            errores.push("URL de mapa invalida.");
        }
        if (!clinica.telefono?.trim() || !numerosEspaciosGuiones.test(clinica.telefono.trim())) {
            errores.push("Teléfono invalido: No puede estar vacío ni contener solo espacios. Formato valido: 123456789, 123-456-789 o 123 456 789.");
        }
        if (!clinica.email?.trim() || !validarEmail.test(clinica.email.trim())) {
            errores.push("Email invalido: No puede estar vacío, contener solo espacios y debe tener un formato valido.");
        }
        if (!clinica.web?.trim() || !urlWeb.test(clinica.web.trim())) {
            errores.push("URL de la web invalida: Debe tener un formato válido como ejemplo.com o https://ejemplo.com.");
        }
        if (serviciosEdit.trim() === "" || !validarServicios.test(serviciosEdit.trim())) {
            errores.push("Servicios inválidos: Escríbelos separados por comas, usando solo letras y espacios.");
        }
        if (clinica.valoracion < 0) {
            errores.push("Valoración invalida: No puede ser negativa.");
        }
        if (clinica.reseñas < 0) {
            errores.push("Cantidad de reseñas invalida: No puede ser menor que 0.");
        }
        if (horarioEdit.trim() === "" || !validarHorario.test(horarioEdit)) {
            errores.push("Horario inválido: Debe contener letras, números, espacios y signos de puntuación básicos.");
        }
        if (!descripcionValida.test(clinica.descripcion || "")) {
            errores.push("Descripción invalida: No puede estar vacía ni contener solo espacios.");
        }
        return errores;
    };

    // 2 Editar clinica existente
    const putClinica = () => {
        if (!clinica) { // Si no hay clinica, no se puede editar
            return;
        }
        // Validar campos antes de enviar
        const errores = validarCamposClinica({
            id: clinica.id,
            nombre: nombreEdit,
            foto: clinica.foto,
            especialidad: especialidadEdit,
            descripcion: descripcionEdit,
            direccion: direccionEdit,
            direccionMapa: direccionMapaEdit,
            telefono: telefonoEdit,
            email: emailEdit,
            web: webEdit,
            horario: horarioEdit,
            servicios: serviciosEdit,
            valoracion: valoracionEdit,
            reseñas: reseñasEdit
        });

        if (errores.length > 0) {
            alert("Errores en el formulario:\n\n" + errores.join("\n"));
            return;
        }

        fetch("https://funcionesgato.azurewebsites.net/api/EditarClinica", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: clinica.id,
                nombre: nombreEdit,
                foto: clinica.foto,
                especialidad: especialidadEdit,
                descripcion: descripcionEdit,
                direccion: direccionEdit,
                direccionMapa: direccionMapaEdit,
                telefono: telefonoEdit,
                email: emailEdit,
                web: webEdit,
                horario: horarioEdit,
                servicios: serviciosEdit,
                valoracion: valoracionEdit,
                reseñas: reseñasEdit
            })
        })
        .then(async (res) => {
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText);
            }
            return res.text();
        })
        .then(data => {
            console.log("Clinica actualizada:", data);
            alert("Ficha guardada con éxito");
            navigate("/Clinics");
        })
        .catch(err => {
            console.error("Error al guardar la ficha:", err);
            alert("Error al guardar la ficha: " + err.message);
        });
    };


    // 3 Insertar clinica nueva
    const postClinica = () => {
        const errores = validarCamposClinica({
            id: 0, // Se ignora en el POST
            nombre: nombreEdit,
            foto: (!fotoEdit || fotoEdit.trim() === "")
                ? "https://storagegatosunidos.blob.core.windows.net/imagenes/creando_clinica.png"
                : fotoEdit,
            especialidad: especialidadEdit,
            descripcion: descripcionEdit,
            direccion: direccionEdit,
            direccionMapa: direccionMapaEdit,
            telefono: telefonoEdit,
            email: emailEdit,
            web: webEdit,
            horario: horarioEdit,
            servicios: serviciosEdit,
            valoracion: valoracionEdit,
            reseñas: reseñasEdit
        });

        if (errores.length > 0) {
            alert("Errores en el formulario:\n\n" + errores.join("\n"));
            return;
        }

        fetch("https://funcionesgato.azurewebsites.net/api/InsertarClinica", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombreEdit,
                foto: (!fotoEdit || fotoEdit.trim() === "")
                    ? "https://storagegatosunidos.blob.core.windows.net/imagenes/creando_clinica.png"
                    : fotoEdit,
                especialidad: especialidadEdit,
                descripcion: descripcionEdit,
                direccion: direccionEdit,
                direccionMapa: direccionMapaEdit,
                telefono: telefonoEdit,
                email: emailEdit,
                web: webEdit,
                horario: horarioEdit,
                servicios: serviciosEdit,
                valoracion: valoracionEdit,
                reseñas: reseñasEdit
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
            console.log('Clínica insertada:', data);
            alert('Clínica insertada con éxito');
            navigate('/Clinics');
        })
        .catch((err) => {
            console.error('Error al insertar la clínica:', err);
            alert('Error al insertar la clínica: ' + err.message);
        });
    };


    // 4 Eliminar una clinica existente
    const eliminarClinica = () => {
        if (!clinica) {
            alert("No hay clinica para eliminar")
            return;
        }
        const confirmar = window.confirm("Estas seguro de que quieres eliminar esta Clinica?");
        if (!confirmar) { // si el usuario cancela la eliminacion, no se hace nada
            return;
        }
        fetch(`https://funcionesgato.azurewebsites.net/api/EliminarClinica?id=${clinica.id}`, {
            method: "DELETE",
        })
        .then(async (res) => {
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText);
            }
            return res.text();
        })
        .then((data) => {
            console.log('Clinica eliminada:', data);
            alert('Clinica eliminada con éxito');
            navigate('/Clinics');
        })
        .catch((err) => {
            console.error('Error al eliminar la clinica:', err);
            alert('Error al eliminar la clinica: ' + err.message);
        })
    };

    // Return del componente Clinica. Aqui se manejan 4 modos: Leer, editar, insertar y eliminar ---------------------------------------------------------------------------------
    return (
        <div>
            <div className="content">
                {/* Modo lectura. Mostrar datos de la clinica */}
                {modo ==="lectura" && clinica &&(
                    <>
                    <div className="contenedorClinica">
                        <div className="nombre_imagen_mapa_Clinica">
                            <p className="clinicaNombre"> {clinica.nombre}</p>
                            <img src={clinica.foto} alt={clinica.nombre} />
                            <p className="clinicaUbicacion"> 📍Ubicación </p>
                            <iframe
                                title="Ubicación"
                                src={clinica.direccionMapa}
                                className="mapa-ubicacion"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <div className="fichaClinica">
                            <span className="atributoClinica">Especialidad</span> <p className="textoClinica">{clinica.especialidad}</p>
                            <span className="atributoClinica">Descripcion</span> <p className="textoClinica">{clinica.descripcion}</p>
                            <span className="atributoClinica">Dirección</span> <p className="textoClinica">{clinica.direccion}</p>
                            <span className="atributoClinica">Teléfono</span> <p className="textoClinica">{clinica.telefono}</p>
                            <span className="atributoClinica">Email</span> <p className="textoClinica">{clinica.email}</p>
                            <span className="atributoClinica">Web</span> <p className="textoClinica">{clinica.web}</p>
                            <span className="atributoClinica">Horario</span>
                                <ul className="listaHorario">
                                {clinica.horario
                                    .split(",") // separa por coma
                                    .map((diaHora, index) => (
                                    <li key={index} className="textoClinica">{diaHora.trim()}</li> // trim para limpiar espacios
                                    ))}
                                </ul>
                            <span className="atributoClinica">Servicios</span>
                                <ul className="listaServicios">
                                {clinica.servicios
                                    .split(",") // separa por coma
                                    .map((servicio, index) => (
                                    <li key={index} className="textoClinica">{servicio.trim()}</li> // trim para limpiar espacios
                                    ))}
                                </ul>
                            <span className="atributoClinica">Valoración</span> <p className="textoClinica">{clinica.valoracion}</p>
                            <span className="atributoClinica">Reseñas</span> <p className="textoClinica">{clinica.reseñas}</p>
                        </div>
                    </div>
                    </>
                )}

                {/* Modo editar. Modificar ficha de una clinica existente */}
                {modo ==="editar" && clinica &&(
                    <>
                    <div className="contenedorClinicaEditar">
                        <p className="tituloClinicaEditar">📋 Editar Ficha de {clinica.nombre}</p>
                        <div className="fichaClinicaEditar">
                            <div className="divAtributosClinicaEditar"><span className="atributoClinicaEditar">Nombre</span><input type="text" className="inputEditarClinica" placeholder="Veterinaria VitSolutions..." value={nombreEdit} onChange={(e) => setNombreEdit(e.target.value)}/></div>
                            <div className="divAtributosClinicaEditar"><span className="atributoClinicaEditar">Foto</span><input type="text" className="inputEditarClinica" placeholder="URL de una foto o deja el campo en blanco..." value={fotoEdit} onChange={(e) => setFotoEdit(e.target.value)}/></div>   
                            <div className="divAtributosClinicaEditar"><span className="atributoClinicaEditar">Especialidad</span><input type="text" className="inputEditarClinica" placeholder="Especialistas en cirugia y rehabilitacion..." value={especialidadEdit} onChange={(e) => setEspecialidadEdit(e.target.value)}/></div>  
                            <div className="divAtributosClinicaEditar"><span className="atributoClinicaEditar">Dirección</span><input type="text" className="inputEditarClinica" placeholder="Calle Brasil 18 Bajo C..." value={direccionEdit} onChange={(e) => setDireccionEdit(e.target.value)}/></div>  
                            <div className="divAtributosClinicaEditar"><span className="atributoClinicaEditar">Dirección Mapa</span><input type="text" className="inputEditarClinica" placeholder="https://www.google.com/maps/embedos!5 o vacio" value={direccionMapaEdit} onChange={(e) => setDireccionMapaEdit(e.target.value)}/></div>  
                            <div className="divAtributosClinicaEditar"><span className="atributoClinicaEditar">Teléfono</span><input type="text" className="inputEditarClinica" placeholder="952-042-234..." value={telefonoEdit} onChange={(e) => setTelefonoEdit(e.target.value)}/></div>  
                            <div className="divAtributosClinicaEditar"><span className="atributoClinicaEditar">Email</span><input type="text" className="inputEditarClinica" placeholder="contactme@vitsolutions.com..." value={emailEdit} onChange={(e) => setEmailEdit(e.target.value)}/></div>  
                            <div className="divAtributosClinicaEditar"><span className="atributoClinicaEditar">Web</span><input type="text" className="inputEditarClinica" placeholder="vitsolutions.com.." value={webEdit} onChange={(e) => setWebEdit(e.target.value)}/></div>
                            <div className="divAtributosClinicaEditar"><span className="atributoClinicaEditar">Servicios</span><input type="text" className="inputEditarClinica" placeholder="Cirugia, medicina general, esterilizaciones" value={serviciosEdit} onChange={(e) => setServiciosEdit(e.target.value)}/></div>
                            <div className="divAtributosClinicaEditar"><span className="atributoClinicaEditar">Valoracion</span><input type="number" className="inputEditarClinica" value={valoracionEdit} onChange={(e) => setValoracionEdit(Number(e.target.value))}/></div>  
                            <div className="divAtributosClinicaEditar"><span className="atributoClinicaEditar">Reseñas</span><input type="number" className="inputEditarClinica" value={reseñasEdit} onChange={(e) => setReseñasEdit(Number(e.target.value))}/></div>
                            <div className="divAtributosClinicaEditar"><span className="atributoClinicaEditar">Horario</span><textarea className="inputHorarioEditar" title="Para separar los días usa la coma (,)" placeholder="Lunes: 09:00 - 20:00, Martes: 09:00 - 20:00, ..." value={horarioEdit} onChange={(e) => setHorarioEdit(e.target.value)}/></div>
                            <div className="divAtributosClinicaEditar"><span className="atributoClinicaEditar">Descripcion</span><textarea className="inputDescripcionClinicaEditar" placeholder="Somos una clínica especializada en cirugía y procedimientos avanzados para mascotas..." value={descripcionEdit} onChange={(e) => setDescripcionEdit(e.target.value)}/></div>
                        </div>
                        <button className="botonEditarClinica" onClick={putClinica}>✏️ Guardar</button>
                    </div>
                    </>
                )}

                {/* Modo insertar. Insertar una clinica nueva */}
                {modo ==="insertar" &&(
                <>
                    <div className="contenedorClinicaInsertar">
                        <p className="tituloClinicaInsertar">📋 INSERTAR CLINICA</p>
                        <div className="fichaClinicaInsertar">
                            <div className="divAtributosClinicaInsertar"><span className="atributoClinicaInsertar">Nombre</span><input type="text" className="inputInsertarClinica" placeholder="Veterinaria VitSolutions..." value={nombreEdit} onChange={(e) => setNombreEdit(e.target.value)}/></div>   
                            <div className="divAtributosClinicaInsertar"><span className="atributoClinicaInsertar">Foto</span><input type="text" className="inputInsertarClinica" placeholder="URL de una foto o deja el campo en blanco..." value={fotoEdit} onChange={(e) => setFotoEdit(e.target.value)}/></div>
                            <div className="divAtributosClinicaInsertar"><span className="atributoClinicaInsertar">Especialidad</span><input type="text" className="inputInsertarClinica" placeholder="Especialistas en cirugia y rehabilitacion..." value={especialidadEdit} onChange={(e) => setEspecialidadEdit(e.target.value)}/></div>    
                            <div className="divAtributosClinicaInsertar"><span className="atributoClinicaInsertar">Dirección</span><input type="text" className="inputInsertarClinica" placeholder="Calle Brasil 18 Bajo C..." value={direccionEdit} onChange={(e) => setDireccionEdit(e.target.value)}/></div>  
                            <div className="divAtributosClinicaInsertar"><span className="atributoClinicaInsertar">Dirección Mapa</span><input type="text" className="inputInsertarClinica" placeholder="https://www.google.com/maps/embedos!5 o vacio" value={direccionMapaEdit} onChange={(e) => setDireccionMapaEdit(e.target.value)}/></div>  
                            <div className="divAtributosClinicaInsertar"><span className="atributoClinicaInsertar">Teléfono</span><input type="text" className="inputInsertarClinica" placeholder="952-042-234..." value={telefonoEdit} onChange={(e) => setTelefonoEdit(e.target.value)}/></div>  
                            <div className="divAtributosClinicaInsertar"><span className="atributoClinicaInsertar">Email</span><input type="text" className="inputInsertarClinica" placeholder="contactme@vitsolutions.com..." value={emailEdit} onChange={(e) => setEmailEdit(e.target.value)}/></div>  
                            <div className="divAtributosClinicaInsertar"><span className="atributoClinicaInsertar">Web</span><input type="text" className="inputInsertarClinica" placeholder="vitsolutions.com.." value={webEdit} onChange={(e) => setWebEdit(e.target.value)}/></div>
                            <div className="divAtributosClinicaInsertar"><span className="atributoClinicaInsertar">Servicios</span><input type="text" className="inputInsertarClinica" placeholder="Cirugia, medicina general, esterilizaciones" value={serviciosEdit} onChange={(e) => setServiciosEdit(e.target.value)}/></div>
                            <div className="divAtributosClinicaInsertar"><span className="atributoClinicaInsertar">Valoraciones</span><input type="number" className="inputInsertarClinica" value={valoracionEdit} onChange={(e) => setValoracionEdit(Number(e.target.value))}/></div>  
                            <div className="divAtributosClinicaInsertar"><span className="atributoClinicaInsertar">Reseñas</span><input type="number" className="inputInsertarClinica" value={reseñasEdit} onChange={(e) => setReseñasEdit(Number(e.target.value))}/></div>
                            <div className="divAtributosClinicaInsertar"><span className="atributoClinicaInsertar">Horario</span><textarea className="inputHorarioInsertar" title="Para separar los días usa la coma (,)" placeholder="Lunes: 09:00 - 20:00, Martes: 09:00 - 20:00, ..." value={horarioEdit} onChange={(e) => setHorarioEdit(e.target.value)}/></div>
                            <div className="divAtributosClinicaInsertar"><span className="atributoClinicaInsertar">Descripcion</span><textarea className="inputDescripcionClinicaInsertar" placeholder="Somos una clínica especializada en cirugía y procedimientos avanzados para mascotas..." value={descripcionEdit} onChange={(e) => setDescripcionEdit(e.target.value)}/></div>
                        </div>
                        <button className="botonInsertarClinica" onClick={postClinica}>✏️ Insertar</button>
                    </div>
                    </>
                )}

                {/* Modo eliminar. Borrar una clinica existente */}
                {modo ==="eliminar" && clinica &&(
                    <>
                    <div className="contenedorClinicaEliminar">
                        <p className="tituloClinicaEliminar">📋 ELIMINAR Clinica</p>
                        <div className="fichaClinicaEliminar"> 
                            <div className="divAtributosClinicaEliminar">
                                <span className="atributoClinicaEliminar">🏠 ID:</span><span className="valorClinica">{clinica.id}</span>
                                <span className="atributoClinicaEliminar">🐱 Nombre:</span><span className="valorClinica">{clinica.nombre}</span>
                            </div>
                            <div className="clinicaEliminar" key={clinica.id}><img src={clinica.foto} alt={clinica.nombre} className="fotoClinicaEliminar" /></div>
                        </div>
                        <button className="botonEliminarClinica" onClick={eliminarClinica}> ❌ Eliminar </button>
                    </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Clinica;