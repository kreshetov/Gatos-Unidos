import react from 'react';
import foto_tlf from '../img/contacto_tlf.png';
import foto_whatsapp from '../img/contacto_whatsapp.png';

const ContactUs = () => {
    return (
        <div>
            <div className="content">
                <table>
                    <tr> 
                        <th> <p> Llamanos </p> </th>
                        <th> <p> Deja un Whatsapp </p> </th>
                    </tr>
                    <tr>
                        <td>  <img src={foto_tlf} className="fotoContacto" /> </td>
                        <td>  <img src={foto_whatsapp} className="fotoContacto" /> </td>
                    </tr>
                    <tr>
                        <td> <p> Puedes ponerte en contacto con nosotros a traves del telefono 000-000-000 </p> </td>
                        <td> <p> Escribenos directamente al WhatsApp y te responderemos lo antes posible </p> </td>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default ContactUs;