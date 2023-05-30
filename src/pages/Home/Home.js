import React, { useState, useEffect } from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../components/Navigation/Navigation';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [showAlert, setShowAlert] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = localStorage.getItem('account');

    if (!isLogin) {
      navigate('/login'); // Redirigir al usuario a la página de inicio de sesión si no ha iniciado sesión
    }

    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showAlert && (
        <div className="alert-container1">
          <p>Has iniciado sesión correctamente</p>
        </div>
      )}
      <Navigation>
        <div className="buttonhome-container">
          <a href="/display" className="btnhome btn-display">
            Display
          </a>
          <a href="/articulo" className="btnhome btn-articulo">
            Articulo
          </a>
          <a href="/contabilidad" className="btnhome btn-inventario">
            Contabilidad
          </a>
        </div>
      </Navigation>
    </div>
  );
};

export default Home;
