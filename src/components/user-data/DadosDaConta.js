import React from "react";
import Header from "../elements/header/Header";
import style from "./User-data.module.css";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ShieldIcon from '@mui/icons-material/Shield';
import axios from "axios";
import {useAuth} from "../../AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const DadosDaConta = () => {

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

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if(isLoading == false){
  //   //  alert(user)
  //     if(user != null){
  //     //  alert("oi")
  //   //  alert('navegando')
  //     navigate('/');
  //       //return <Navigate to="/login"></Navigate>;
  //     }
  //   }
  // }, [user, isLoading]);









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
                <input id="nome" name="nome" value={user.nome}></input>
                <label for="cpf">CPF</label>
                <input className={style['disabled']} id="cpf" name="cpf" disabled value={'123.456.789.12'}></input>
                <button className={style['submit']}>Salvar Alterações</button>
            </div>
            
          </section>
          
          </div>
        </div>
      </main>
    </div>
  );
};

export default DadosDaConta;
