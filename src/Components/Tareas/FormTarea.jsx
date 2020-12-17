import React, {useContext, useState, useEffect} from 'react';
import ProyectoContext from '../../Context/Proyectos/ProyectoContext';
import TareaContext from '../../Context/Tareas/TareaContext';


const FormTareas = () => {

    //Obtener si un proyecto esta activo
    const ProyectosContext = useContext(ProyectoContext);
    const {proyecto} = ProyectosContext;

    //Obtener la funcion del context de tarea
    const TareasContext = useContext(TareaContext);
    const {tareaSeleccionada, errorTarea, agregarTarea, validarTarea, obtenerTareas,actualizarTarea, limpiarTarea} = TareasContext;

    //Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
       if(tareaSeleccionada !== null){
            guardarTarea(tareaSeleccionada)
       }else{
        guardarTarea({
            nombre:''
        })
       }
    }, [tareaSeleccionada])

    //State del formularo
    const [tarea, guardarTarea] = useState({
        nombre:''
    })

    //Extraer el nombre del proyecto
    const {nombre} = tarea;

    //Si no ha proyecto seleccionado
    if(!proyecto) return null;

    //ARRAY DESRUCTURING PARA EXTRAER EL PROYECTO ACTUAL
    const [proyectoActual] = proyecto;

    //Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }
 
    const onSubmit = e => {
        e.preventDefault();

        //validar
        if(nombre.trim() === ''){
            validarTarea();
            return
        }

        //Revisar si es edicion o nueva tarea
        if(tareaSeleccionada === null ){
            //agregar la nueva tarea  al state de tareas
            tarea.proyectoId = proyectoActual.id;
            tarea.estado = false
            agregarTarea(tarea);
        }else{
            //Actualizar tarea existente
            actualizarTarea(tarea);

            //Elimina la tarea seleccionada del state
            limpiarTarea();
        }

        //Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id)

        //reiniciar el form 
        guardarTarea({
            nombre:''
        })
    }

    return (
         <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedo-input">
                    <input
                     type="text"
                     className="input-text"
                     placeholder="Nombre tarea..."
                     name="nombre"
                     value={nombre}
                     onChange={handleChange}
                    />
                </div>

                <div className="contenedo-input">
                    <input
                     type="submit"
                     className="btn btn-primario btn-block btn-submit"
                     value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea' }
                    />
                </div>
            </form>
            {errorTarea ?<p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div> 
    );
}
 
export default FormTareas;