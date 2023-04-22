import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "../pages/Login/Login";
import Articulo from "../pages/Articulo/Articulo";

export const AppRouter = () => {

return(
<>
 <Routes>
    <Route path = "/" element={<Login/>}>
    <Route path="/Articulo" element = {<Articulo/>}/>
    </Route>
  </Routes>
  </>
  );
}
