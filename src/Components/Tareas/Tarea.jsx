import React, {useContext} from 'react';
import ProyectoContext from '../../Context/Proyectos/ProyectoContext';
import TareaContext from '../../Context/Tareas/TareaContext';


const Tarea = ({tarea}) => {

    //Obtener si un proyecto esta activo
    const ProyectosContext = useContext(ProyectoContext);
    const {proyecto} = ProyectosContext;

    //Obtener la funcion del context de tarea
    const TareasContext = useContext(TareaContext);
    const {eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual} = TareasContext;

    //Extraer el proyecto
    const[protectoActual] = proyecto;

    //Funcion que se ejecuta cuando el usuario presiona eliminar tarea
    const TareaEliminar = id =>{
        eliminarTarea(id, protectoActual._id);
        obtenerTareas(protectoActual.id);
    }
    //Funcion que modifica el estado de las tareas
    const cambiarEstado = tarea =>{
        if(tarea.estado){
            tarea.estado = false
        }else{
            tarea.estado = true
        }
        actualizarTarea(tarea)
    }
    
    //Funcion que extrae la tarea para editar
    const EditarTarea = tarea => {
        guardarTareaActual(tarea)
    }
    return ( 
       <li className="tarea sombra">
           <p>{tarea.nombre}</p>

           <div className="estado">
               {tarea.estado
                ?
                (
                    <button
                        type="button"
                        className="completo"
                        onClick={() => cambiarEstado(tarea)}
                    >Completo</button>
                )
                :
                (
                    <button
                        type="button"
                        className="incompleto"
                        onClick={() => cambiarEstado(tarea)}
                    >Incompleto</button>
                )
                }
           </div>

           <div className="acciones">
               <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => EditarTarea(tarea)}
               >Editar</button>

               <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => TareaEliminar(tarea._id)}
               >Eliminar</button>
           </div>
       </li>
    );
}
 
export default Tarea;