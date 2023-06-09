import * as React from "react";
import { useState } from "react";
import styles from "./user-auth.module.css";
import { TextField } from "@mui/material";
import {useAuth} from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function Login() {
  const { user, setUser, isLoading, setIsLoading, token, setToken } = useAuth();
  const [inputs, setInputs] = useState({
    email: "",
    senha: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [mensagensErro, setMensagensErro] = useState({
    email: {
      mensagem: "",
      deuErro: false,
    },
    senha: {
      mensagem: "",
      deuErro: false,
    },
    
  });

  const navigate = useNavigate();

  useEffect(() => {
    if(isLoading == false){
    //  alert(user)
      if(user != null){
      //  alert("oi")
    //  alert('navegando')
      navigate('/');
        //return <Navigate to="/login"></Navigate>;
      }
    }
  }, [user, isLoading]);


  const validarEmail = () => {
    const email = inputs.email;
    let valido = true;

    if (email.length === 0) {
      setMensagensErro((mensagensErro) => ({
        ...mensagensErro,
        email: {
          mensagem: "Campo obrigatório",
          deuErro: true,
        },
      }));
      valido = false;
    }
    else{
      setMensagensErro((mensagensErro) => ({
        ...mensagensErro,
        email: {
          mensagem: "",
          deuErro: false,
        },
      }));
    }
    return valido
  }

  const validarSenha = () => {
    const senha = inputs.senha;
    let valido = true;

    if (senha.length === 0) {
      setMensagensErro((mensagensErro) => ({
        ...mensagensErro,
        senha: {
          mensagem: "Campo obrigatório",
          deuErro: true,
        },
      }));
      valido = false;
    }
    else{
      setMensagensErro((mensagensErro) => ({
        ...mensagensErro,
        senha: {
          mensagem: "",
          deuErro: false,
        },
      }));
    }
    return valido
  }

  const handleLogar = async (event) => {
    event.preventDefault();
    const emailValido = validarEmail();
    const senhaValida = validarSenha();

    if (emailValido && senhaValida) {
      try{
        const response = await axios.post('http://localhost:8080/login', inputs);

        localStorage.setItem('token', JSON.stringify(response.data.token));
        setToken(response.data.token);
        //setUser(response.data);
      }catch(error){
      //  alert(error)
        setErrorMessage("Email ou senha incorretos");
      }
    }
  }

  return (
    <main>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
        rel="stylesheet"
      ></link>

      <section className={styles['intro']}>
      <img src={require('./images/logo_white.png')} alt="Logo escrito Rachei" className={styles["logo"]}></img>
        <div className={styles["intro-welcome"]}>
          <h1 className={styles["intro-welcome-header"]}>Bem vindo</h1>
          <p>
            <strong>Preencha seus dados</strong> para ter acesso ao sistema
          </p>
        </div>
        <h1 className={styles["website-link"]}>www.rachei.com.br</h1>
      </section>
      <section className={styles["main-content"]}>
        <div className={styles["login-label-wrapper"]}>
          <h1 className={styles["login"]}>Logar-se</h1>
        </div>
        
        <form className={[styles["main-content-container"], styles["login-container"]].join(' ')} onSubmit={handleLogar}>
          <div className={styles['errorDiv']}><p className={styles['error']}>
            {errorMessage}
            </p></div>
          <TextField
            variant="filled"
            label="Email"
            type="email"
            name="email"
            className={styles["input"]}
            error={mensagensErro.email.deuErro}
            helperText={mensagensErro.email.mensagem}
            //onBlur={validarEmail}
            value={inputs.email}
            onChange={(event) => {
              setInputs((inputs) => ({
                ...inputs,
                email: event.target.value,
              }));
            }}
            placeholder="ex: joaosilva@gmail.com"
            inputProps={{ maxLength: 64 }}
            sx={[
              {
                "&:after": {
                  borderColor: "#5F4BB6",
                  backgroundColor: "#342965",
                },
              },
              {
                marginBottom: "2rem",
              },
            ]}
          ></TextField>
          <TextField
            variant="filled"
            label="Senha"
            type="password"
            name="senha"
            error={mensagensErro.senha.deuErro}
            helperText={mensagensErro.senha.mensagem}
           // onBlur={validarSenha}
            onChange={(event) => {
              setInputs((inputs) => ({
                ...inputs,
                senha: event.target.value,
              }));
            }}
            value={inputs.senha}
            className={styles["input"]}
            placeholder="Senha"
            inputProps={{ maxLength: 20 }}
            sx={[
              {
                "&:after": {
                  borderColor: "#5F4BB6",
                  backgroundColor: "#342965",
                },
              },
              
            ]}
          ></TextField>

          <button className={styles["button"]}>Fazer Login</button>
          <p className={styles["signup-navigation"]}>
            Não possui uma conta? <a href="cadastro">Cadastre-se</a>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;
