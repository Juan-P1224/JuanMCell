import { Navigate, useLocation } from "react-router-dom"
import "../pages/Login/Login";

export const PrivateRoute = ({children})  => {


    const{state} = useLocation();

    return state?.logged ? children : < Navigate to='/Login' />

};

