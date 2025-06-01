const AboutUs = () => {
    return (
        <div>
            <div className="content">
                <div className="contenedorContenido">
                    <div className="contenedor_imagen_contacto">
                        <div className="imagenRefugio">
                            <img src="https://storagegatosunidos.blob.core.windows.net/imagenes/refugio_gatos_unidos.png" alt="imagenGatosUnidos" className="imagenRefugio"></img>
                        </div>
                        <div className="contenedor_contacto">
                            <p className="texto-whatsapp">
                                Escribenos un WhatsApp clickando en la imagen
                            </p>         
                            <a href="https://wa.me/34623200263" target="_blank" rel="noopener noreferrer">
                            <img src="https://storagegatosunidos.blob.core.windows.net/imagenes/logo_whatsapp.png" className="fotoContacto" alt="WhatsApp" />
                            </a>
                             <p className="texto-whatsapp">
                                Tambien puedes llamarnos al 623200263
                            </p>
                        </div>
                    </div>
                    <div className="contenedor_texto_refugio">
                        <p className="textoRefugio"> En Gatos Unidos, somos un grupo de amantes de los gatos comprometidos con su bienestar. Desde siempre, los gatos han sido parte de nuestras vidas, y con el tiempo, nuestra pasión por ayudarles nos llevó a emprender este proyecto. </p>
                        <p className="textoRefugio"> Durante nuestros recorridos por la ciudad, hemos encontrado muchos gatos en situación de abandono o con enfermedades que requieren atención médica. Enfrentamos una realidad: los tratamientos veterinarios son costosos, y muchas veces, estos animales no tienen a nadie que los cuide. Para poder seguir ayudándolos, buscamos clínicas veterinarias que compartieran nuestra causa y logramos acuerdos para recibir descuentos en la atención de los gatos que rescatamos. </p>
                        <p className="textoRefugio"> Nuestro objetivo es claro: brindar asistencia a los gatos en situación de calle y fomentar la colaboración comunitaria. Queremos que más personas se involucren y formen parte de esta misión, ya sea reportando casos de gatos en riesgo, realizando donaciones o ayudándonos a difundir nuestro mensaje en redes sociales. </p>
                        <p className="textoRefugio"> Si ves un gato que necesita ayuda, contáctanos a través de nuestro formulario. Juntos, podemos marcar la diferencia en sus vidas. </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;