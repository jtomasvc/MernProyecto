import React, {useContext} from 'react';
import ProyectoContext from '../../Context/Proyectos/ProyectoContext';
import TareaContext from '../../Context/Tareas/TareaContext';

const Proyecto = ({proyecto}) => {
    //Obtener el state del formulario
    const ProyectosContext = useContext(ProyectoContext);
    const {proyectoActual} = ProyectosContext;

    //Obtener la funcion del context de tarea
    const TareasContext = useContext(TareaContext);
    const {obtenerTareas} = TareasContext;

    //Funcion para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id); //Fijar un proyecto actual
        obtenerTareas(id) //filtrar las tareas cuando se le de click
    }

    return ( 
        <li className="listado-proyectos">
            <button
                type="button"
                className="btn btn-blank"
                onClick={()=> seleccionarProyecto(proyecto.id)}
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;