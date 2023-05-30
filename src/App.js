//import Login from './pages/Login/Login';
import React, { Component } from 'react';
import Login from "./pages/Login/Login";
import Articulo from './pages/Articulo/Articulo';
import {Route, Routes } from 'react-router-dom';
import Display from './pages/Display/Display';
import Home from './pages/Home/Home';
import Contabilidad from './pages/Contabilidad/Contabilidad';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/articulo" element={<Articulo />} />
        <Route path="/display" element={<Display />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/contabilidad" element={<Contabilidad/>}/>
      </Routes>
    </div>
  );
}

export default App;
