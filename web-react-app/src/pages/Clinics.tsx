import react from 'react';
import clinica1 from '../img/clinica1.jpg';
import clinica2 from '../img/clinica1.jpg';
import clinica3 from '../img/clinica1.jpg';

const Clinics = () => {
    return (
        <div>
            <div className="content">
            <table>
                <tr> <th colSpan={3}> Nuestros preciados colaboradores </th> </tr>
                <tr>
                <td> 
                    <p> Torremolinos Vet </p>
                    <img src={clinica1}/> </td>
                <td> 
                    <p> Veterinario Gomez </p> 
                    <img src={clinica2}/> </td>
                <td> 
                    <p> Clinica Mascota Feliz </p>
                        <img src={clinica3}/> </td>
                </tr>
                <tr>
                    <td> <p> Nos especializamos en el cuidado exclusivo de gatos, brindando un ambiente tranquilo y adaptado a sus necesidades. Desde chequeos de rutina hasta tratamientos especializados, nuestro equipo veterinario está comprometido con la salud y el bienestar de los felinos. </p> </td>
                    <td> <p> Somos una clínica especializada en cirugía y procedimientos avanzados para mascotas. Contamos con tecnología de última generación y un equipo altamente capacitado para garantizar intervenciones seguras y una pronta recuperación. </p> </td>
                    <td> <p> Ofrecemos atención veterinaria completa para todo tipo de mascotas. Desde medicina preventiva hasta hospitalización y rehabilitación, trabajamos con pasión y compromiso para brindar el mejor cuidado a nuestros pacientes. </p> </td>
                </tr>
        </table>
            </div>
        </div>
    );
};

export default Clinics;