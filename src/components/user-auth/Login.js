import * as React from "react";
import { useState } from "react";
import "./user-auth.css";
import { TextField } from "@mui/material";

function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    senha: "",
  });
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

      <section className="intro">
        <h1 className="logo">Rachei</h1>
        <div className="intro-welcome">
          <h1 className="intro-welcome-header">Bem vindo</h1>
          <p>
            <strong>Preencha seus dados</strong> para ter acesso ao sistema
          </p>
        </div>
        <h1 className="website-link">www.rachei.com.br</h1>
      </section>
      <section className="main-content">
        <div className="login-label-wrapper">
          <h1 className="login">Logar-se</h1>
        </div>
        <form className="main-content-container login-container">
          <TextField
            variant="filled"
            label="Email"
            type="email"
            name="email"
            className="input"
            error={mensagensErro.email.deuErro}
            helperText={mensagensErro.email.mensagem}
            onBlur={validarEmail}
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
            onBlur={validarSenha}
            onChange={(event) => {
              setInputs((inputs) => ({
                ...inputs,
                senha: event.target.value,
              }));
            }}
            value={inputs.senha}
            className="input"
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

          <button>Fazer Login</button>
          <p className="signup-navigation">
            Não possui uma conta? <a href="Cadastro">Cadastre-se</a>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;
