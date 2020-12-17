import React, {useReducer} from 'react'
import TareaContext from './TareaContext';
import TareaReducer from './TareaReducer';
import { v4 as uuidv4 } from 'uuid';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREAS,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../Types';


const TareaState = props => {

    const initialState = {
        tareas: [
            {id: 1, nombre:'Elegir plataforma', estado: true, proyectoId: 1},
            {id: 2, nombre:'Elegir Colores', estado: false, proyectoId: 2},
            {id: 3, nombre:'Elegir Medios de pago', estado: true,proyectoId: 3},
            {id: 4, nombre:'Elegir Hosting', estado: false, proyectoId: 4},
            {id: 5, nombre:'Elegir Hosting', estado: true, proyectoId: 2},
            {id: 6, nombre:'Elegir Hosting', estado: false, proyectoId: 3},
            {id: 7, nombre:'Elegir Hosting', estado: true, proyectoId: 4},
            {id: 8, nombre:'Elegir Hosting', estado: false, proyectoId: 1}
        ],
        tareasproyecto: null,
        errorTarea: false,
        tareaSeleccionada: null
    }

    //Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState)

    //Crear las funciones

    //Obtener las tareas de un proyecto
    const obtenerTareas = proyectoId => {
        dispatch ({
           type: TAREAS_PROYECTO,
           payload:proyectoId 
        })
    }

    //Agregar una tarea al proyecto seleccionado
    const agregarTarea = tarea => {
        tarea.id = uuidv4();
        dispatch ({
            type: AGREGAR_TAREAS,
            payload:tarea
        })
    }

    //VALIDA Y MUESTRA UN ERROR SI ES NECESARIO
    const validarTarea = () =>{
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //Eliminar tarea por id
    const eliminarTarea = id => {
        dispatch({
            type:ELIMINAR_TAREA,
            payload:id
        })
    }

    //Cambia el estado de cada tarea
    const cambiarEstadoTarea = tarea => {
        dispatch({
            type:ESTADO_TAREA,
            payload:tarea
        })
    }

    //Extrae una tarea para editar
    const guardarTareaActual = tarea => {
        dispatch({
            type:TAREA_ACTUAL,
            payload:tarea
        })
    }

    //Edita o modifica una tarea
    const actualizarTarea = tarea => {
        dispatch({
           type:ACTUALIZAR_TAREA,
           payload:tarea
        })
    }

    //ELimina la tarea Seleccionada
    const limpiarTarea = () => {
        dispatch({
            type:LIMPIAR_TAREA,
        })
    }
    return(
       <TareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
       >
           {props.children}
       </TareaContext.Provider> 
    )
}

export default TareaState;