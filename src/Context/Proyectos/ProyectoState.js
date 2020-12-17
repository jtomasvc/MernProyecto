import React, {useReducer} from 'react';
import ProyectoContext from './ProyectoContext';
import ProyectoReducer from './ProyectoReducer';
import { v4 as uuidv4 } from 'uuid';

import {
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from '../../Types';



const ProyectoState = props =>{

    const proyectos = [
        {id: 1, nombre: 'Tienda Virtual'},
        {id: 2, nombre: 'Intranet'},
        {id: 3, nombre: 'Diseño de Sitio web'},
        {id: 4, nombre: 'Aprender React'}
    ]

    const initialState = {
        proyectos : [],
        formulario: false,
        errorformulario: false,
        proyecto: null
    }

    //Dispatch para ejecutar las acciones
    const[state, dispatch] = useReducer(ProyectoReducer,initialState)

    //Serie de funciones para el CRUD
    const mostrarFormulario = () =>{
        dispatch({
            type:FORMULARIO_PROYECTO
        })
    }

    //Obtener los proyectos
    const obtenerProyectos = () =>{
        dispatch({
            type:OBTENER_PROYECTOS,
            payload:proyectos
        })
    }

    //Selecciona el proyecto que el usuario le dio click
    const proyectoActual = proyectoId =>{
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //Agregar nuevo proyecto
    const agregarProyecto = proyecto =>{
        proyecto.id = uuidv4();

        //Insertar el proyecto en el state
        dispatch({
            type:AGREGAR_PROYECTO,
            payload: proyecto
        })
    }

    //Validar formulario por errores
    const mostrarError = () =>{
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }


    //Elimina el proyecto
    const eliminarProyecto = proyectoId => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
    }
    return(
        <ProyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </ProyectoContext.Provider>
    )
}

export default ProyectoState;