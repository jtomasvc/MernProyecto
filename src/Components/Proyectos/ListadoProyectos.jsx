import React, {useContext, useEffect} from 'react'
import Proyecto from './Proyecto';
import ProyectoContext from '../../Context/Proyectos/ProyectoContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ListadoProyectos = () => {

  //Extraer proyectos del ProyectoState 
  const ProyectosContext = useContext(ProyectoContext);
  const {proyectos, obtenerProyectos} = ProyectosContext;

  //usar useEffect para cuando cargue el componente
  useEffect(() =>{
      obtenerProyectos();
      //eslint-disable-next-line
  }, [])

  //Revisar si proyectos tiene contenido
  if(proyectos.length === 0) return <h2>No hay proyectos, comienza creando uno</h2>;


    return ( 
        <ul className="listado-proyectos">
          <TransitionGroup> 
              {proyectos.map(proyecto =>(
                <CSSTransition
                    key={proyecto.id}
                    timeout={200}
                    classNames="proyecto"
                >  
                  <Proyecto 
                    proyecto={proyecto}
                  />  
                </CSSTransition>
              ))}
          </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;