import react from 'react';
import foto_donaciones from '../img/donacion.jpg';
import foto_adoptar from '../img/adoptar.jpg';
import foto_reportar from '../img/reportar_gato.jpg';

const Colaborate = () => {
    return (
        <div>
            <div className="content">
            <table>
          <tr> 
            <th> Donaciones </th>
            <th> Adopta, Acoge </th>
            <th> Reportar animal </th>
          </tr>
          <tr>
              <td> <img src={foto_donaciones} /> </td>
              <td> <img src={foto_adoptar} /> </td>
              <td> <img src={foto_reportar} /> </td>
          </tr>
          <tr>
            <td> <p> 1. Económicas: Aportes en dinero que nos permiten financiar tratamientos veterinarios, esterilizaciones y otros cuidados esenciales. </p> 
                 <p> 2. De alimentos: Donaciones de pienso, latas de comida húmeda o snacks para garantizar una alimentación adecuada a los gatos rescatados. </p>
                 <p> 3. De juguetes: Juguetes, rascadores o mantas que ayudan a mejorar el bienestar y entretenimiento de los gatos mientras esperan ser adoptados. </p>
            </td>
            <td> <p> 1. Adopta un gato y ofrécele un hogar lleno de amor. Dale una nueva oportunidad para ser feliz. </p> 
                 <p> 2. Acoge un gato temporalmente y ayúdalo mientras espera su hogar definitivo. Tu apoyo hace la diferencia. </p>
            </td>
            <td> <p> Reportar un animal: Si encuentras un gato que necesita ayuda, ¡ayúdanos a salvarlo! Reporta el caso y nos encargaremos de ofrecerle la atención y el cuidado que necesita. </p> </td>
          </tr>
        </table>   
            </div>
        </div>
    );
};

export default Colaborate;