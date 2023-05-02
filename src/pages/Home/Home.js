import React, { useState } from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../components/Navigation/Navigation';

class Home extends React.Component{
    render(){
        return(
            <>
            <Navigation />
            <div className="home-container">
            <html lang="es">
            <head>
            <meta charset="utf-8" />
            <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
            <link rel="stylesheet" href="./style.css" />
        
            <title>JuanMCell</title>
            </head>
            <body>
            <header>

                
            </header>
            <div id="display-container"></div>
            </body>
        </html>
            </div>
            </>
            
        
        );
        }
}

  export default Home;