import React from 'react';
import {Outlet, useNavigate} from 'react-router-dom';

export const NavBar = () =>{
     
    const {state} = useLocation();
    const navigate = useNavigate();

    console.log(state);

    const onLogout = () => {
        navigate('/login',)
    }


    return(
        <>
        <header> 
        <h1>
            <link to='/' > Logo </link>
        </h1>
        <nav> 
            <link to='/login' > Iniciar Sesion </link>
        </nav>
        </header>
        <Outlet/>
        </>
    )
}