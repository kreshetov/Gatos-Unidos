import react from 'react';
import gato1 from '../img/nuevoamigo1.jpg';
import gato2 from '../img/nuevoamigo2.jpg';
import gato3 from '../img/nuevoamigo3.jpg';

const Index = () => {
    return (
        <div>
            <div className="content">
            <table>
          <tr> <th colSpan={3}> Nuestros nuevos amigos </th> </tr>
          <tr>
            <td> <p> Bollito </p> <img src={gato1} /> </td>
            <td> <p> Greiwo </p> <img src={gato2} /> </td>
            <td> <p> Arigato </p> <img src={gato3} /> </td>
          </tr>
          <tr>
            <td> <p> ¡Hola! Me llamo Bollito y soy un gatito muy tierno y cariñoso. Me encanta acurrucarme y recibir mimos, pero también disfruto jugar con mis juguetes y explorar rincones nuevos. </p> </td>
            <td> <p> ¡Miau! Soy Greiwo y no me dejo intimidar por nadie. Me gusta jugar rudo, trepar a los muebles y a veces hago travesuras. Aunque pueda parecer un poco gruñón, en el fondo quiero mucho a mi familia. </p> </td>
            <td> <p> ¡Hola, al habla Arigato! A veces soy tranquilo y otras veces un torbellino de energía. Me gusta correr, dormir en los lugares más extraños y robarle la comida a mis humanos cuando no están viendo. </p> </td>
          </tr>
        </table> 
            </div>
        </div>
    );
};

export default Index;