
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


export default (state, action) => {
    switch(action.type){
        case TAREAS_PROYECTO:
            return{
                ...state,
                tareasproyecto: action.payload
            }
        case AGREGAR_TAREAS:
            return{
                ...state,
                tareasproyecto: [action.payload, ...state.tareasproyecto],
                errorTarea: false
            }
        case VALIDAR_TAREA: 
            return{
                ...state,
                errorTarea: true
            }
        case ELIMINAR_TAREA:
            return{
                ...state,
                tareasproyecto: state.tareasproyecto.filter(tarea => tarea._id !== action.payload)
            }
        case ACTUALIZAR_TAREA: 
            return{
            ...state,
            tareas: state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload :tarea)
            }
        case TAREA_ACTUAL:
            return{
                ...state,
                tareaSeleccionada: action.payload
            }

        case LIMPIAR_TAREA:
            return{
                ...state,
                tareaSeleccionada: null
            }
        default:
            return state;
    }
}