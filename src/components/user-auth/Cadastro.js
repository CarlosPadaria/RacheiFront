import * as React from "react";
import Input from "@mui/material/Input";
import "./user-auth.css";

function Cadastro() {
  return (
    <main>
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
          <h1 className="login cadastro-label">Cadastre-se</h1>
        </div>
        <div className="main-content-container">
          <Input
            variant="filled"
            type="text"
            name="nome"
            className="input"
            placeholder="Nome de Usuário"
            colorSeconday="#ffffff"
            sx={[
              {
                "&:after": {
                  borderColor: "#5F4BB6",
                  backgroundColor: "#342965",
                },
              },
            ]}
          ></Input>
          <Input
            variant="filled"
            type="email"
            name="email"
            className="input"
            placeholder="Endereço de Email"
            colorSeconday="#ffffff"
            sx={[
              {
                "&:after": {
                  borderColor: "#5F4BB6",
                  backgroundColor: "#342965",
                },
              },
            ]}
          ></Input>
          <Input
            variant="filled"
            type="text"
            name="email"
            className="input"
            placeholder="CPF"
            colorSeconday="#ffffff"
            sx={[
              {
                "&:after": {
                  borderColor: "#5F4BB6",
                  backgroundColor: "#342965",
                },
              },
            ]}
          ></Input>
          <Input
            variant="filled"
            label="Senha"
            type="password"
            name="senha"
            className="input"
            placeholder="Senha"
            sx={[
              {
                "&:after": {
                  borderColor: "#5F4BB6",
                  backgroundColor: "#342965",
                },
              },
            ]}
          ></Input>

          <button>Fazer Login</button>
          <div className="wrapper-signup-navigation">
            <p className="signup-navigation">
              Já possui uma conta? <a href="Login">Logue-se</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Cadastro;
