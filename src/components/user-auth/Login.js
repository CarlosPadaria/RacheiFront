import * as React from "react";
import Input from "@mui/material/Input";
import "./user-auth.css"

function Login() {
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
          <h1 className="login">Logar-se</h1>
        </div>
        <div className="main-content-container">
          <Input
            variant="filled"
            label="Senha"
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
          <p className="signup-navigation">
            Não possui uma conta? <a href="Cadastro">Cadastre-se</a>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
