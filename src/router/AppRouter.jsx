import React from "react";
import {Route, Routes} from "react-router-dom";
import { NavBar } from "../NavBar";
import {Home} from "../pages/Home/Home";
import {Login} from "../pages/Login/Login";
export const AppRouter = () => {

return<>
 <Routes>
    <Route path="/" element={<NavBar/>}>
        <Route index element = {<Home/>}/>
        <Route path="login" element = {<Login/>}/>
    </Route>
 </Routes>

</>

}