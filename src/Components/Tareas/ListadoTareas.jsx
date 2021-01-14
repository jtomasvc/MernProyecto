import React, {Fragment, useContext} from 'react';
import Tarea from './Tarea';
import ProyectoContext from '../../Context/Proyectos/ProyectoContext';
import TareaContext from '../../Context/Tareas/TareaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ListadoTareas = () => {

    //Obtener el state del formulario
    const ProyectosContext = useContext(ProyectoContext);
    const {proyecto, eliminarProyecto} = ProyectosContext;

    //Obtener las tareas del proyecto
    const TareasContext = useContext(TareaContext);
    const {tareasproyecto} = TareasContext;

    //Si no ha proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un proyecto</h2>;

    //ARRAY DESRUCTURING PARA EXTRAER EL PROYECTO ACTUAL
    const [proyectoActual] = proyecto;


    //Elimina un proyecto
    const onClickEliminar = () =>{
        eliminarProyecto(proyectoActual._id)
    }
    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {tareasproyecto.length === 0
                    ?
                     (
                     <li className="tarea"><p>No hay tareas</p></li>
                     ) 
                    :<TransitionGroup>
                        {
                        tareasproyecto.map(tarea =>(
                            <CSSTransition
                                key = {tarea.id}
                                timeout={200}
                                classNames="tarea"
                            >                               
                                <Tarea
                                    tarea={tarea}
                                />
                            </CSSTransition>
                        ))
                        }
                    </TransitionGroup>
                }
            </ul>


            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >Eliminar Proyecto &times;</button>
        </Fragment>
     );
}
 
export default ListadoTareas;