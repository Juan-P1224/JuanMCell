//import Login from './pages/Login/Login';
import React, { Component } from 'react';
import Login from "./pages/Login/Login";
import Articulo from './pages/Articulo/Articulo';
import {Route, Routes } from 'react-router-dom';
import Display from './pages/Display/Display';
import Home from './pages/Home/Home';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/articulo" element={<Articulo />} />
        <Route path="/display" element={<Display />} />
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
