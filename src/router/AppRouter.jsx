import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Articulo from '../pages/Articulo/Articulo';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' replace />} />
      <Route path='/login' element={<Login />} />
      <PrivateRoute>
        <Route path='/home' element={<Home />} />
        <Route path='/contabilidad' element={<Contabilidad />} />
        <Route path='/display' element={<Display />} />
        <Route path='/articulo' element={<Articulo />} />
      </PrivateRoute>
    </Routes>
  );
};
