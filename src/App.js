import { BrowserRouter, Routes, Route, Outlet  } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/user-auth/Login";
import Cadastro from "./components/user-auth/Cadastro";
import Publicar from "./components/home/Publicar";
import DadosDaConta from "./components/user-data/DadosDaConta";
import Seguranca from "./components/user-data/Seguranca";
import Favoritos from "./components/home/Favoritos";
import MinhasPublicacoes from "./components/home/MinhasPublicacoes";
import { AuthProvider } from "./AuthContext";
import AuthContext from "./AuthContext";
import "./index.css";

function App() {
  return (
   
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route path="/" element={<Home />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/minhasPublicacoes" element={<MinhasPublicacoes />} />
            <Route path="/publicar" element={<Publicar />} />
            <Route path="/dadosDaConta" element={<DadosDaConta />} />
            <Route path="/seguranca" element={<Seguranca />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
  );
}

export default App;

