import React, { useState } from 'react';
import './Login.css';
import Title from '../components/Title/Title';
import Label from '../components/Label/Label';
import Input from '../components/Input/Input';

const Login = () => {

    const [user,setUser] = useState('');
    const [password,setPassword] = useState('')

    function  handleChange(name,value) {
        if(name === 'usuario'){
            setUser(value)
        }else{
            setPassword(value)
        }
    }

    function handleSumbit(){
        let account = {user,password}
        if(account){
            console.log('account',account)
        }
    }

    console.log('usuario:',user)
    console.log('password', password)
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
                <button onClick={( e )=> handleSumbit}>
                    Ingresar
                </button>
            </div>
            
        </div>
    )

};
export default Login;