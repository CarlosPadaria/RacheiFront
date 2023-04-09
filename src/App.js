
import * as React from "react";
import Login from './components/user-auth/Login';
import Cadastro from './components/user-auth/Cadastro'
import Publicar from './components/home/Publicar'
import './index.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/home/Home";

function App() {
  return (  
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/cadastro" element={<Cadastro />}></Route>
      <Route path="/publicar" element={<Publicar />}></Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
