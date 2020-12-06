import React from 'react';

const Proyecto = ({proyecto}) => {

    return ( 
        <li className="listado-proyectos">
            <button
                type="button"
                className="btn btn-blank"
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;