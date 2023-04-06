
import * as React from "react";
import Login from './components/user-auth/Login';
import Cadastro from './components/user-auth/Cadastro'
import Header from './components/elements/Header';
import './index.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (  
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Header />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/cadastro" element={<Cadastro />}></Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
