//import Login from './pages/Login/Login';
import React, { Component } from 'react';
import Login from "./pages/Login/Login";
import Articulo from './pages/Articulo/Articulo';
import {Route, Routes } from 'react-router-dom';
import Display from './pages/Display/Display';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/articulo" element={<Articulo />} />
        <Route path="/display" element={<Display />} />
      </Routes>
    </div>
  );
}

export default App;
