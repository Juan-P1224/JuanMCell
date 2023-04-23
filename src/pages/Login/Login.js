import React, { useState } from 'react';
import './Login.css';
import Title from '../components/Title/Title';
import Label from '../components/Label/Label';
import Input from '../components/Input/Input';
import {useNavigate} from 'react-router-dom';

const Login = () => {

    const [user,setUser] = useState('');
    const [password,setPassword] = useState('');
    const [isLogin,setIsLogin] = useState(false);
    const navigate = useNavigate();

    function ifMatch(param){
       if(param.user.length > 0 && param.password.length > 0){
        if(param.user == 'root' && param.password=='root_*123'){
            const {user,password} = param;
            let ac = {user,password};
            let account = JSON.stringify(ac);
            localStorage.setItem('account',account);
            setIsLogin(true);
            navigate('/display');
        }else{
            setIsLogin(false);
        }
       }else{
        setIsLogin(false);
       }
    
    };

    function  handleChange(name,value) {
        if(name === 'usuario'){
            setUser(value)
        }else{
            setPassword(value)
        }
    };
    console.log('usuario:',user)
    console.log('password', password)

    function handleSubmit() {
        let account = {user,password}

        if(account){
            ifMatch(account);
        }
    };
    return( 
        
        <div className='login-container'>
            <Title text={
                <div>
                    <h1>JuanMCell</h1>
                    <p>Iniciar sesión</p>
                </div>
            }/>


            <div>
            <Label text='Usuario'/>

                <Input
                attribute={{
                    id:'usuario',
                    name:'usuario',
                    type:'text',
                    placeHolder:'ingrese su usuario'

                }}
                handleChange={handleChange}
                />
                <Label text='Contraseña'/>
                <Input
                attribute={{
                    id:'contraseña',
                    name:'contraseña',
                    type:'password',
                    placeHolder:'ingrese su contraseña'

                }}
                handleChange={handleChange}
                />
                <button onClick={handleSubmit}>
                    Ingresar
                </button>
            </div>
            
        </div>
    )

};
export default Login;