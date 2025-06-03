import React from 'react';
import { Link } from 'react-router-dom';
const Colaborate = () => {
    return (
        <div>
            <div className="content">
                <p className="tituloColabora">Hay muchas formas de ayudar a los gatitos. ¡Colabora con nosotros!</p>
                <div className="informacionColabora">
                    <div className="colaboracion">
                        <p className="encabezadoColabora">
                            ❤️ Contribuir con recursos</p>
                        <p className="tipoColaboracion">
                            (dinero, comida, juguetes)
                        </p>
                        <p className="texto">
                            Ayúdanos a seguir cuidando de ellos. Puedes hacer una donación económica, traer comida, juguetes o cualquier recurso que mejore su bienestar.
                        </p>
                        <Link to="/Donar"><button className="boton">¡Quiero Contribuir!</button></Link>
                    </div>
                    <div className="colaboracion">
                        <p className="encabezadoColabora">🚨 Reportar un gato en apuros</p>
                        <p className="tipoColaboracion">
                            (gato perdido, herido, abandonado)
                        </p>
                        <p className="texto">
                            Si ves un gato que necesita ayuda, cuéntanos. Nuestro equipo intentará actuar lo antes posible para rescatarlo y darle la atención que necesita.
                        </p>
                        <a href="https://wa.me/34623200263" target="_blank" rel="noopener noreferrer"><button className="boton">¡Reportar al WhatsApp!</button></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Colaborate;