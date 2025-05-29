import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Estructura de datos de la clinica-----------------------------------------------------------------------------------------------
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
    horario: { [key: string]: string };
    servicios: { [key: string]: string };
    valoracion: number;
    reseñas: number;
}

// Componente Clinica ---------------------------------------------------------------------------------------------------------------------
const Clinica = () => {
    const navigate = useNavigate(); // Hook para navegar entre rutas (para redirigr a la lista de Clinicas despues de editar, insertar o eliminar)
    const [clinica, setClinica] = useState<interfazClinica | null>(null);
    const [searchParams] = useSearchParams(); // Obtiene los parametros de busqueda de la URL
    const modo = searchParams.get("modo"); // Obtiene el modo de la URL (lectura, editar, insertar, eliminar)
    const { id } = useParams<{ id: string }>(); // Obtiene el id de la clinica desde la URL

    // Estados para editar/insertar clinica ----------------------------------------------------------------------------------------------
    const [idEdit, setIdEdit] = useState<string>(id || '');
    const [nombreEdit, setNombreEdit] = useState<string>('');
    const [especialidadEdit, setEspecialidadEdit] = useState<string>('');
    const [descripcionEdit, setDescripcionEdit] = useState<string>('');
    const [direccionEdit, setDireccionEdit] = useState<string>('');
    const [direccionMapaEdit, setDireccionMapaEdit] = useState<string>('');
    const [telefonoEdit, setTelefonoEdit] = useState<string>();
    const [emailEdit, setEmailEdit] = useState<string>('');
    const [webEdit, setWebEdit] = useState<string>('');
    const [horarioEdit, setHorarioEdit] = useState<{ [key: string]: string }>({});
    const [serviciosEdit, setServiciosEdit] = useState<{ [key: string]: string }>({});
    const [valoracionEdit, setValoracionEdit] = useState<number>(0);
    const [reseñasEdit, setReseñasEdit] = useState<number>(0);


    // Hooks -----------------------------------------------------------------------------------------------------------------------------
    // 1 Obtencion de datos de la clinica. Estos se obtienen de ka API. Solo se ejecuta cuando los modos son: lectura, editar, eliminar.
    useEffect(() => { // useEffect se ejecuta una vez al cargar el componente y cada vez que cambia el id de la clinica
        if (modo !=="insertar") { // Si el modo no es insertar, hace fetch para trear a los clinicas
            fetch(`https://storageclinicasunidos.blob.core.windows.net/datos/clinica_${id}`) // fetch se utiliza para hacer una solicitud HTTP a la API y obtener los datos de la clinica
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
            setWebEdit(clinica.email);
            setHorarioEdit(clinica.horario);
            setServiciosEdit(clinica.servicios);
            setValoracionEdit(clinica.valoracion);
            setReseñasEdit(clinica.reseñas);
        }
    }, [modo, clinica]);

    // Metodos ----------------------------------------------------------------------------------------------------------------------------

    // 1 Editar clinica existente
    const putClinica = () => {
        if (!clinica) { // Si no hay clinica, no se puede editar
            return;
        }
        // Se envia una solicitud PUT a la API para actualizar la informacion de la clinica
        fetch("", {
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
        .then(res => res.text())
        .then(data => {
            console.log("Clinica actualizada:", data);
            alert("Ficha guardada con exito");
            navigate("Clinics");
        })
        .catch(err => {
            console.error("Error al guarda la ficha:", err);
            alert("Error al guardar la ficha");
        });
    };

    // 2 Insertar clinica nueva
    const postClinica = () => {
        // Se envia una solicitid POST a la API para crear una clinica nueva
        fetch("", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombreEdit,
                foto: "",
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
                reseñas: valoracionEdit
            })
        })
        .then(async (res) => {
            if (!res.ok) {
                // Leer texto plano en caso de error
                const errorText = await res.text();
                throw new Error(errorText);
            }
            // Suponemos que la respuesta OK es texto plano también
            const texto = await res.text();
            return texto;
        })
        .then((data) => {
            console.log('Clinica insertada:', data);
            alert('Clinica insertada con éxito');
            navigate('/Clinics');
        })
        .catch((err) => {
            console.error('Error al insertar la clinica:', err);
            alert('Error al insertar la clinica: ' + err.message);
        });
    };
    
    // 3 Eliminar una clinica existente
    const eliminarClinica = () => {
        if (!clinica) {
            alert("No hay clinica para eliminar")
            return;
        }
        const confirmar = window.confirm("Estas seguro de que quieres eliminar esta Clinica?");
        if (!confirmar) { // si el usuario cancela la eliminacion, no se hace nada
            return;
        }
        fetch("", {
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
            navigate('/Gatcs');
        })
        .catch((err) => {
            console.error('Error al eliminar la clinica:', err);
            alert('Error al eliminar la clinica: ' + err.message);
        })
    };

    // Return del componente Clinica. Aqui se manejan 4 modos: Leer, editar, insertar y eliminar --------------------------------------------------------
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
                            <ul className="lista-horario">
                                {Object.entries(clinica.horario).map(([dia, horas]) => (
                                <li key={dia}>{dia}: {horas}</li>
                                ))}
                            </ul>
                            <span className="atributoClinica">Servicios</span> 
                            <ul className="lista-servicios">
                                {Object.values(clinica.servicios).map((servicio, index) => (
                                <li key={index}>{servicio}</li>
                                ))}
                            </ul>  
                            <span className="atributoClinica">Valoración</span> <p className="textoClinica">{clinica.valoracion}</p>
                            <span className="atributoClinica">Reseñas</span> <p className="textoClinica">{clinica.reseñas}</p>
                        </div>
                    </div>
                    </>
                )}

                {/* Modo editar. Modoificar ficha de una clinica existente */}
                {modo ==="editar" && clinica &&(
                    <>
                    <div className="contenedorClinicaEditar">
                        <div className="fichaclinica">
                            <div className="divAtributosclinica"><span className="atributoClinica">Nombre</span><input type="text" className="input" value={nombreEdit} onChange={(e) => setNombreEdit(e.target.value)}/></div>   
                            <div className="divAtributosclinica"><span className="atributoClinica">Especialidad</span><input type="text" className="input" value={especialidadEdit} onChange={(e) => setEspecialidadEdit(e.target.value)}/></div>  
                            <div className="divAtributosclinica"><span className="atributoClinica">Descripcion</span><input type="text" className="input" value={descripcionEdit} onChange={(e) => setDescripcionEdit(e.target.value)}/></div>  
                            <div className="divAtributosclinica"><span className="atributoClinica">Dirección</span><input type="text" className="input" value={direccionEdit} onChange={(e) => setDireccionEdit(e.target.value)}/></div>  
                            <div className="divAtributosclinica"><span className="atributoClinica">Dirección Mapa</span><input type="text" className="input" value={direccionMapaEdit} onChange={(e) => setDireccionMapaEdit(e.target.value)}/></div>  
                            <div className="divAtributosclinica"><span className="atributoClinica">Teléfono</span><input type="text" className="input" value={telefonoEdit} onChange={(e) => setTelefonoEdit(e.target.value)}/></div>  
                            <div className="divAtributosclinica"><span className="atributoClinica">Email</span><span className="valorClinica">{clinica.email}</span></div>  
                            <div className="divAtributosclinica"><span className="atributoClinica">Web</span><input type="text" className="input" value={webEdit} onChange={(e) => setWebEdit(e.target.value)}/></div>
                            {/* Horario */}
                            {Object.entries(horarioEdit).map(([dia, horas]) => (
                            <div className="divAtributosclinica" key={dia}>
                                <span className="atributoClinica">{dia}</span>
                                <input
                                type="text"
                                className="input"
                                value={horas}
                                onChange={(e) =>
                                    setHorarioEdit((prev) => ({ ...prev, [dia]: e.target.value }))
                                }
                                />
                            </div>
                            ))}

                            {/* Servicios */}
                            {Object.entries(serviciosEdit).map(([clave, valor]) => (
                            <div className="divAtributosclinica" key={clave}>
                                <span className="atributoClinica">{clave}</span>
                                <input
                                type="text"
                                className="input"
                                value={valor}
                                onChange={(e) =>
                                    setServiciosEdit((prev) => ({ ...prev, [clave]: e.target.value }))
                                }
                                />
                            </div>
                            ))}
                            <div className="divAtributosclinica"><span className="atributoClinica">Valoracion</span><input type="number" className="input" value={valoracionEdit} onChange={(e) => setValoracionEdit(Number(e.target.value))}/></div>  
                            <div className="divAtributosclinica"><span className="atributoClinica">Reseñas</span><input type="number" className="input" value={reseñasEdit} onChange={(e) => setReseñasEdit(Number(e.target.value))}/></div>
                        </div>
                    </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Clinica;