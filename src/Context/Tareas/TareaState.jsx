import React, {useReducer} from 'react'
import TareaContext from './TareaContext';
import TareaReducer from './TareaReducer';


import {
    TAREAS_PROYECTO,
    AGREGAR_TAREAS,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../Types';

import clienteAxios from '../../Config/Axios';

const TareaState = props => {

    const initialState = {
        tareasproyecto: [],
        errorTarea: false,
        tareaSeleccionada: null
    }

    //Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState)

    //Crear las funciones

    //Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto}});
            dispatch ({
                type: TAREAS_PROYECTO,
                payload:resultado.data.tareas
             })
        } catch (error) {
            console.log(error)
        }
    }

    //Agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea)
            console.log(resultado)
            dispatch ({
                type: AGREGAR_TAREAS,
                payload:tarea
            })
        } catch (error) {
            console.log(error)
        }
    }

    //VALIDA Y MUESTRA UN ERROR SI ES NECESARIO
    const validarTarea = () =>{
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //Eliminar tarea por id
    const eliminarTarea =  async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}})
            dispatch({
                type:ELIMINAR_TAREA,
                payload:id
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Edita o modifica una tarea
    const actualizarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            console.log(resultado)
            dispatch({
                type:ACTUALIZAR_TAREA,
                payload:tarea
             })
        } catch (error) {
            console.log(error)
        }
    }

    //Extrae una tarea para editar
    const guardarTareaActual = tarea => {
        dispatch({
            type:TAREA_ACTUAL,
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
                tareasproyecto: state.tareasproyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
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