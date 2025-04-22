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
                        <p className="encabezadoColabora">🐾 Vínculo directo con un gato</p>
                        <p className="tipoColaboracion">
                            (adopción, acogida temporal, apadrinamiento)
                        </p>
                        <p className="texto">
                            Cambia su vida y la tuya. Adopta, acoge por un tiempo o apadrina a un gato para ser parte activa de su historia.
                        </p>
                        <Link to="/Adoptar"><button className="boton">¡Quiero Involucrarme!</button></Link>
                    </div>
                    <div className="colaboracion">
                        <p className="encabezadoColabora">🚨 Reportar un gato en apuros</p>
                        <p className="tipoColaboracion">
                            (gato perdido, herido, abandonado)
                        </p>
                        <p className="texto">
                        Tú puedes marcar la diferencia. Si ves un gato que necesita ayuda, cuéntanos. Nuestro equipo intentará actuar lo antes posible para rescatarlo y darle la atención que necesita.
                        </p>
                        <Link to="/Reportar"><button className="boton">¡Quiero reportar un caso!</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Colaborate;