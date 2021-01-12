import React, {useContext, useEffect} from 'react';
import AuthContext from '../../Context/Autenticacion/AuthContext';


const Barra = () => {
        //Etraer la informacion de la autenticacion
        const authContext = useContext(AuthContext);
        const {usuario, usuarioAutenticado, CerrarSesion} = authContext
    
        useEffect(() => {
            usuarioAutenticado();
        }, [])

    return ( 
        <header className="app-header">
            {usuario ?
                <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p>
                : 
            null}
          

            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => CerrarSesion()}
                >Cerrar Sesión</button>
            </nav>
        </header>
     );
}
 
export default Barra;