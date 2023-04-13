import React from "react";
import menuLateralImg from '../components/Images/menu_lateral.png';
import './Home.css';


const Home = () => {
    return(
        <div className="home-container">
            <div className="titulo">
                <h1>JuanMCell</h1>
            </div>
            <div className="icono-menu-lateral">
                <img src={menuLateralImg} alt="Icono del menú lateral" />
            </div>
            <div className="contenido_menu_lateral" id="menu_lateral">
                <ul>
                    <li>Productos</li>
                    <li>Ventas</li>
                    <li>Registros</li>
                </ul>
            </div>
        </div>
    )
};


export default Home;
