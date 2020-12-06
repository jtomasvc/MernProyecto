import React, {useContext, useEffect} from 'react'
import Proyecto from './Proyecto';
import ProyectoContext from '../../Context/Proyectos/ProyectoContext';

const ListadoProyectos = () => {

  //Extraer proyectos del ProyectoState 
  const ProyectosContext = useContext(ProyectoContext);
  const {proyectos, obtenerProyectos} = ProyectosContext;

  //usar useEffect para cuando cargue el componente
  useEffect(() =>{
      obtenerProyectos();
  }, [])

  //Revisar si proyectos tiene contenido
  if(proyectos.length === 0) return null;


    return ( 
        <ul className="listado-proyectos">
            {proyectos.map(proyecto =>(
              <Proyecto
                key={proyecto.id}
                proyecto={proyecto}
              />  
            ))}
        </ul>
     );
}
 
export default ListadoProyectos;