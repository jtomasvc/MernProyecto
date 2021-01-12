import React from 'react';
import {BrowserRouter as Router, Switch, Route}  from 'react-router-dom';
import Login from './Components/Auth/Login';
import NuevaCuenta from './Components/Auth/NuevaCuenta';
import Proyectos from './Components/Proyectos/Proyectos';

import ProyectoState from './Context/Proyectos/ProyectoState';
import TareaState from './Context/Tareas/TareaState';
import AlertaState from './Context/Alertas/AlertaState';
import AuthState from './Context/Autenticacion/AuthState';
import tokenAuth from './Config/AuthToken';
import RutaPrivada from './Components/Rutas/RutaPrivada';

//Revisar si tenemos un Token
const token = localStorage.getItem('token');
if(token){
  tokenAuth(token)
}

function App() {

  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
                <Switch>
                  <Route exact path="/" component={Login}/>
                  <Route exact path="/nueva-cuenta" component={NuevaCuenta}/>
                  <RutaPrivada exact path="/proyectos" component={Proyectos}/>
                </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>

  );
}

export default App;
