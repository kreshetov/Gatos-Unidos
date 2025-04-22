import React from "react";

const Reportar = () => {
    return (
        <div>
            <div className="content">
                <p className="tituloColabora">¡Tu ayuda es fundamental para nosotros!</p>
                <div className="informacionColabora">
                    <div className="colaboracion">
                        <p className="encabezadoColabora">🚨 Reportar un gato en apuros</p>
                        <p className="tipoColaboracion">(gato perdido, herido, abandonado)</p>
                        <p className="texto">
                            Tú puedes marcar la diferencia. Si ves un gato que necesita ayuda, cuéntanos.
                            Nuestro equipo intentará actuar lo antes posible para rescatarlo y darle la atención que necesita.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reportar;