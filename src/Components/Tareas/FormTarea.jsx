import React from 'react'


const FormTareas = () => {
    return (
         <div className="formulario">
            <form>
                <div className="contenedo-input">
                    <input
                     type="text"
                     className="input-text"
                     placeholder="Nombre tarea..."
                     name="nombre"
                    />
                </div>

                <div className="contenedo-input">
                    <input
                     type="submit"
                     className="btn btn-primario btn-block btn-submit"
                     value="Agregar Tarea"
                    />
                </div>
            </form>
        </div> 
    );
}
 
export default FormTareas;