import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


// Interfaz que define la estructura de los datos resumidos de los gatos
interface interfazGatos {
    id: number;
    nombre: string;
    foto: string;
    raza: string;
    fechaNacimiento: string;
}

// Calcular la edad del gato
const calcularEdadGato = (fechaNacimiento: string): string => {
    const fechaNac = new Date(fechaNacimiento);
    const fechaActual = new Date();
    let años = fechaActual.getFullYear() - fechaNac.getFullYear();
    let meses = fechaActual.getMonth() - fechaNac.getMonth();

    if (fechaActual.getDate() < fechaNac.getDate()) {
        meses--;
    }
    if (meses < 0) {
        años--;
        meses += 12;
    }
    if (años <= 0) {
        return `${meses} mes${meses === 1 ? '' : 'es'}`;
    } else {
        return `${años} año${años === 1 ? '' : 's'}`;
    }
};

const Gatos = () => {
    const [gatos, setGatos] = useState<interfazGatos[]>([]); // Definir el estado para los gatos
    const [modo, setModo] = useState('lectura'); // Definir el estado para el modo (lectura, editar, crear, eliminar) 
    const navegar = useNavigate();

    // Funcion para cambiar de modo
    const cambiarModo = (nuevoModo: string) => {
        setModo(nuevoModo);
    };

    useEffect(() => {
        fetch('https://storagegatosunidos.blob.core.windows.net/datos/gatos_resumen')
            .then((response) => response.json())
            .then((data) => setGatos(data))
            .catch((error) => console.error('Error al obtener listado de gatos', error));
    }, []);

    // Redireccionar a gato directamente si el modo es insertar
    useEffect(() => {
        if (modo === 'insertar') {
            navegar('/Gatos/insertar?modo=insertar');
        }
    }, [modo, navegar]);

    return (
        <div>
            <div className="content">
                {modo !=="insertar" ? (
                    <>
                    {modo === "lectura" ? (
                        <p className="tituloGatos">Conoce a Nuestros Gatos en Adopción. </p>
                    ) : modo === "editar" ? (
                        <p className="tituloGatos">Selecciona al Gato para editarlo. </p>
                    ) : (
                        <p className="tituloGatos"> Selecciona al Gato que se desee eliminar. </p>
                    )}
                    <div className="contenedorGatos">
                        {gatos.map((gato) => (
                            <Link to={`/Gatos/${gato.id}?modo=${modo}`} key={gato.id}>
                                <div className="gatos">
                                    <div className="gatosFoto">
                                        <img src={gato.foto} alt={gato.nombre} />
                                    </div>
                                    <div className="informacionGato">
                                        <p className="nombreGato">{gato.nombre}</p>
                                        <p className="razaGato">🐈Raza: {gato.raza}</p>
                                        <p className="edadGato">🎂 Edad: {calcularEdadGato(gato.fechaNacimiento)}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    </>
                ) : (
                   null
                )}
                {/* Botones para cambiar de modo */}        
                <div className="crud">
                    <button className="botonCRUD" onClick={() => cambiarModo('lectura')}>Modo Lectura</button>
                    <button className="botonCRUD" onClick={() => cambiarModo('editar')}>Editar Gato</button>
                    <button className="botonCRUD" onClick={() => cambiarModo('insertar')}>Insertar Gato</button>
                    <button className="botonCRUD" onClick={() => cambiarModo('eliminar')}>Eliminar Gato</button>
                </div>
            </div>
        </div>
    );
};

export default Gatos;