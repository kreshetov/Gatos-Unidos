import react, { useEffect, useState} from 'react';

// La interfaz describe solo la estructura de los objetos (gatos).
// Cada gato tiene: un id, un nombre, una foto (url) y una descripcion.
// Es la que misma estructua que se ha declarado en el JSON simulado de mocksv
interface interfazGatos {
  id: number;
  nombre : string;
  foto: string;
  descripcion: string;
}

// Componente Gatos
const Gatos = () => {
  // gatos es un array que tiene la estructura de la interfaz
  // setGatos actuliza el estado 
  // useState indica que el estado es un array con la estructura de la interdaz
  const [gatos, setGatos] = useState<interfazGatos[]>([]);

  useEffect(()=> {
    // realiza la solicitud http a la url para obtener los datos
    // fetch devuelve una promesa que se resolvera una vez obtenidos los datos
    fetch('https://8b9906b6-52d0-46f4-9ade-8c42fd35b5e6.mock.pstmn.io/Gatos')
      // se convierte la respuesta a json
      .then((response => response.json())
      // los datos del json se usan para actualizar el estado
)     .then((data) => setGatos(data))
      // manejo y captura de erorres
      .then((error) => console.error("Error el obtener listado de gatos", error));
  }, []); // El array vacio dado como segundo parametro indica que solo se actualiza 1 vez

  return (
  <div>
    <div className="content">
      <table>
        <tr> <th colSpan={3}> Nuestros nuevos amigos </th> </tr>
        <tr>
          {gatos.map((gato) => (
            <td key={gato.id}>
            <p> {gato.nombre} </p>
            <img src={gato.foto} alt={gato.nombre} style={{width:"300px", height:"200px"}} />
          </td>
          ))}
        </tr>
        <tr>
          {gatos.map((gato) => (
            <td key={gato.id}> <p> {gato.descripcion} </p> </td>
          ))}
        </tr>
      </table> 
    </div>
  </div>
  );
  };

export default Gatos;