import React,{useState, useContext, useEffect} from 'react';
import {Link}  from 'react-router-dom'
import AlertaContext from '../../Context/Alertas/AlertaContext';
import AuthContext from '../../Context/Autenticacion/AuthContext';

const NuevaCuenta = (props) => {

    //Extraer valores del context
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, registrarUsuario } = authContext

    //En caso de que el usuario se haya autenticado o sea un registro duplicado
    useEffect(()=>{
        if(autenticado){
            props.history.push('/proyectos')
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
    }, [mensaje, autenticado, props.history])

    //State para el login
    const [usuario, guardarUsuario] = useState({
        nombre:'',
        email:'',
        password:'',
        confirmar:''
    })
    //extraer de usuario
    const{nombre, email, password, confirmar} = usuario

    const onChange = (e) =>{
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    //Cuando el usuario quiere iniciar sesion
    const onSubmit = e =>{
        e.preventDefault();

        //Validar que no hay campos vacios
        if(nombre.trim() === '' ||
           email.trim() === '' ||
           password.trim() === '' ||
           confirmar.trim() === '' ){

            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
        }

        //Password minimo de 6 caracteres
        if(password.length < 6){
            mostrarAlerta('El password es de minimo 6 caracteres', 'alerta-error')
            return;
        }
        //Password iguales
        if(password !== confirmar){
            mostrarAlerta('Los passwords deben ser iguales', 'alerta-error')
            return;            
        }

        //pasarlo al action
        registrarUsuario({
            nombre, 
            email, 
            password});
    }

    return (
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) :null}
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una Cuenta</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre Usuario</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            placeholder="Tu nombre"
                            onChange={onChange}
                        />     
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Tu Email"
                            onChange={onChange}
                        />     
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Tu password"
                            onChange={onChange}
                        />     
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            value={confirmar}
                            placeholder="confirmar Password"
                            onChange={onChange}
                        />     
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Registrarme"/>
                    </div>
                </form>

                
                <Link to={'/'} className="enlace-cuenta">
                    Iniciar Sesion
                </Link>
            </div>
        </div>
      );
}
 
export default NuevaCuenta;