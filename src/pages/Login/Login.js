import React, { useState } from 'react';
import './Login.css';
import Title from '../components/Title/Title';
import Label from '../components/Label/Label';
import Input from '../components/Input/Input';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function ifMatch(param) {
    if (param.user.length > 0 && param.password.length > 0) {
      if (param.user === 'root' && param.password === 'root_*123') {
        const { user, password } = param;
        let ac = { user, password };
        let account = JSON.stringify(ac);
        localStorage.setItem('account', account);
        navigate('/home');
      } else {
        setShowAlert(true);
      }
    } else {
      setShowAlert(true);
    }
  }

  function handleChange(name, value) {
    if (name === 'usuario') {
      setUser(value);
    } else {
      setPassword(value);
    }
  }

  function handleSubmit() {
    let account = { user, password };

    if (account) {
      ifMatch(account);
    }
  }

  return (
    <div className="tbody">
      <div className="alert-container" style={{ display: showAlert ? 'block' : 'none' }}>
        <p>Usuario o contraseña incorrectos</p>
      </div>
      <div className="bodyLogin">
        <div className="login-container">
          <Title
            text={
              <div>
                <h1>JuanMCell</h1>
                <p>Iniciar sesión</p>
              </div>
            }
          />
          <div>
            <Label text="Usuario" />

            <Input
              attribute={{
                id: 'usuario',
                name: 'usuario',
                type: 'text',
                placeHolder: 'ingrese su usuario',
              }}
              handleChange={handleChange}
            />
            <Label text="Contraseña" />
            <Input
              attribute={{
                id: 'contraseña',
                name: 'contraseña',
                type: 'password',
                placeHolder: 'ingrese su contraseña',
              }}
              handleChange={handleChange}
            />
            <button onClick={handleSubmit}>Ingresar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
