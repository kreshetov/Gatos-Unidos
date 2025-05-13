import React from 'react';
import { Link } from 'react-router-dom';

const Donar = () => {
    return (
        <div>
            <div className="content">
                <p className="tituloColabora">¡Tu ayuda es fundamental para nosotros!</p>
                <div className="informacionColabora">
                    <div className="colaboracion">
                        <p className="encabezadoColabora">💵 ¡Echar una patita! 💰</p>
                        <p className="tipoColaboracion">(Donación vía PayPal)</p>
                        <p className="texto">
                            Puedes realizar una donación económica a través de PayPal. Tu contribución nos ayudará a cubrir los gastos de alimentación, atención veterinaria y otros cuidados necesarios para nuestros peluditos.
                        </p>
                        <Link to="https://www.paypal.com/donate/?hosted_button_id=ZLM9GAL9E7L6S"><button className="botonPaypal">Donar con PayPal</button></Link>
                    </div>
                    <div className="colaboracion">
                        <p className="encabezadoColabora">🍽️ Donar alimentos y más 🐈</p>
                        <p className="encabezadoColabora"></p>
                        <p className="tipoColaboracion">(Alimentos, juguetes, y otros materiales)</p>
                        <p className="texto">
                        Donar comida, arena, juguetes o cualquier otro recurso mejora su bienestar. Tu ayuda marca la diferencia. Entrega tu aporte directamente en nuestras clínicas colaboradoras.
                            </p>
                        <Link to="/Clinics"><button className="botonClinicas">Clinicas Colaboradoras</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Donar;