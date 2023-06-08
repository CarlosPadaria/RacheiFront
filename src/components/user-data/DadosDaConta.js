import React from "react";
import Header from "../elements/header/Header";
import style from "./User-data.module.css";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ShieldIcon from '@mui/icons-material/Shield';
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {useAuth} from "../../AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const DadosDaConta = () => {


  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { user, setUser, isLoading, setIsLoading } = useAuth();
  const [inputs, setInputs] = useState({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
  });
  
  // const[mensagemErroCadastro, setMensagemErroCadastro] = useState("");

  // const [mensagensErro, setMensagensErro] = useState({
  //   nome: {
  //     mensagem: "",
  //     deuErro: false,
  //   },
  //   email: {
  //     mensagem: "",
  //     deuErro: false,
  //   },
  //   cpf: {
  //     mensagem: "",
  //     deuErro: false,
  //   },
  //   senha: {
  //     mensagem: "",
  //     deuErro: false,
  //   },
  // });


  const handleAtualizar= async (e) => {

    e.preventDefault();


    try {
      const response = await axios.put(
        `http://localhost:8080/usuarios/${user.id}`,
        inputs,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
        
      );
      localStorage.setItem('user',JSON.stringify(response.data));
      setUser(response.data);

      console.log("Dados atualizados:", response.data)
      
      
    } catch (error) {
      console.log("Erro ao atualizar", error)
      console.log(user.id)
    }

  }


  return (
    <div className={style['dados-wrapper']}>
      <Header></Header>
      <main className={style.main}>
        <div className={style["roxo"]}></div>
        <div className={style["section-wrapper"]}>
          <section className={style["items"]}>
            <ul>
              <li>
                <a className={style["hover-anchor"]} href="dadosDaConta"><AssignmentIndIcon
                sx={{
                    fontSize: "2rem",
                }}
                ></AssignmentIndIcon> Dados da conta</a>
              </li>
              <li>
                <a href="seguranca"
                className={style["hover-anchor"]}
                ><ShieldIcon
                
                sx={{
                    fontSize: "2rem",
                }}></ShieldIcon>Segurança</a>
              </li>
            </ul>
          </section>
          <div className={style['content-wrapper']}>
          <section className={style["content"]}>
            <h1>Meu Perfil</h1>
            <div className={style["content-items"]}>
                <h2>Dados da conta</h2> 
                <label placeholder="Nome de usuário" for="nome">Nome de usuário</label>
                <input className={style["disabled"]} id="nome" name="nome" value={user?.nome} disabled></input>

                <label placeholder="Email" for="email">Email</label>
                <input id="email" className={style["disabled"]} name="email" value={user?.email} disabled ></input>

                <label placeholder="Senha" for="senha">Senha</label>
                <input id="senha" className={style["disabled"]} type="password" name="senha" value={user?.senha} disabled ></input>
                

                <label for="cpf">CPF</label>
                <input className={style['disabled']} id="cpf" name="cpf" disabled value={user?.cpf}></input>
                
            </div>
            
          </section>
          
          </div>
        </div>
      </main>
    </div>
  );
};

export default DadosDaConta;
