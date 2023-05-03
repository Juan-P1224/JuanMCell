import React, { useState, useEffect } from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../components/Navigation/Navigation";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const isLogin = location.state?.isLogin;

  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLogin && showAlert && (
        <div className="alert-container1">
          <p>Has iniciado sesión correctamente</p>
        </div>
        
      )
      }
      <Navigation>

      </Navigation>
      
    </div>
    
  );
};

export default Home;