import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const { state } = useLocation();

  const isLoggedIn = localStorage.getItem('account'); // Verificar si el usuario ha iniciado sesión

  return isLoggedIn ? children : <Navigate to='/login' replace />;
};
