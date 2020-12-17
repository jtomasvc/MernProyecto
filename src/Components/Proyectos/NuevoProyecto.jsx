import React, {Fragment, useState, useContext} from 'react'
import ProyectoContext from '../../Context/Proyectos/ProyectoContext';

const NuevoProyecto = () => {

    //Obtener el state del formulario
    const ProyectosContext = useContext(ProyectoContext);
    const {formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError} = ProyectosContext;

    //State para el proyecto
    const[proyecto, guardarProyecto] = useState({
        nombre:''
    })

    //Extraer nombre proyecto
    const {nombre} = proyecto

    //lee los contenidos del input proyecto
    const onChangeProyecto = (e) => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]:e.target.value
        })
    }

    //Cuando el usuario envia un proyecto
    const onSubmitProyecto = (e) =>{
        e.preventDefault();

        //validar el proyecto
        if(nombre === ''){
            mostrarError();
            return;
        }
        //agregar al state
        agregarProyecto(proyecto)

        //reiniciar el form
        guardarProyecto({
            nombre:''
        })
    }


    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={()=> mostrarFormulario()}
            >Nuevo Proyecto</button>

            {formulario ?
                (
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitProyecto}
                    >
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Nombre Proyecto"
                            value={nombre}
                            name="nombre"
                            onChange={onChangeProyecto}
                        />

                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Agregar Proyecto"
                        />
                    </form>
                ): null
            }

            {errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> :null}
        </Fragment>
     );
}
 
export default NuevoProyecto;