
import * as React from "react";
import Login from './components/user-auth/Login';
import Cadastro from './components/user-auth/Cadastro'
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (  
   <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/cadastro" element={<Cadastro />}></Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
