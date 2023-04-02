import * as React from "react";
import { useState } from "react";
import "./user-auth.css";
import { TextField } from "@mui/material";

function Cadastro() {
  const [inputs, setInputs] = useState({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
  });

  const [mensagensErro, setMensagensErro] = useState({
    nome: {
      mensagem: "",
      deuErro: false,
    },
    email: {
      mensagem: "",
      deuErro: false,
    },
    cpf: {
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
    // use regex para validar email

    if (email.length === 0) {
      setMensagensErro((mensagensErro) => ({
        ...mensagensErro,
        email: {
          mensagem: "Campo obrigatório",
          deuErro: true,
        },
      }));
      valido = false;
    } else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setMensagensErro((mensagensErro) => ({
        ...mensagensErro,
        email: {
          mensagem: "Email inválido",
          deuErro: true,
        },
      }));
      valido = false;
    } else {
      setMensagensErro((mensagensErro) => ({
        ...mensagensErro,
        email: {
          mensagem: "",
          deuErro: false,
        },
      }));
      valido = false;
    }
    return valido;
  };

  const validarNome = () => {
    const nome = inputs.nome;
    let valido = true;

    if (nome.length === 0) {
      setMensagensErro((mensagensErro) => ({
        ...mensagensErro,
        nome: {
          mensagem: "Campo obrigatório",
          deuErro: true,
        },
      }));
      valido = false;
    } else if (nome.length < 3) {
      setMensagensErro((mensagensErro) => ({
        ...mensagensErro,
        nome: {
          mensagem: "Nome deve ter pelo menos 3 caracteres",
          deuErro: true,
        },
      }));
      valido = false;
    } else {
      setMensagensErro((mensagensErro) => ({
        ...mensagensErro,
        nome: {
          mensagem: "",
          deuErro: false,
        },
      }));
    }
    return valido;
  };

  const validarCpf = () => {
    const cpf = inputs.cpf;
    let valido = true;

    if (cpf.length === 0) {
      setMensagensErro((mensagensErro) => ({
        ...mensagensErro,
        cpf: {
          mensagem: "Campo obrigatório",
          deuErro: true,
        },
      }));
      valido = false;
    } else if (cpf.length !== 14) {
      setMensagensErro((mensagensErro) => ({
        ...mensagensErro,
        cpf: {
          mensagem: "CPF inválido",
          deuErro: true,
        },
      }));
      valido = false;
    } else {
      setMensagensErro((mensagensErro) => ({
        ...mensagensErro,
        cpf: {
          mensagem: "",
          deuErro: false,
        },
      }));
    }
    return valido;
  };

  const validarSenha = () => {
    // validar senha, deve ter entre 6 e 20 caracteres e conter pelo menos um número e 1 letra
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
    } else if (senha.length < 6 || senha.length > 20) {
      setMensagensErro((mensagensErro) => ({
        ...mensagensErro,
        senha: {
          mensagem: "Senha deve ter entre 6 e 20 caracteres",
          deuErro: true,
        },
      }));
      valido = false;
    } else if (!senha.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)) {
      setMensagensErro((mensagensErro) => ({
        ...mensagensErro,
        senha: {
          mensagem: "Deve possuir pelo menos 1 número e 1 letra",
          deuErro: true,
        },
      }));
      valido = false;
    } else {
      setMensagensErro((mensagensErro) => ({
        ...mensagensErro,
        senha: {
          mensagem: "",
          deuErro: false,
        },
      }));
    }
    return valido;
  };

  // faz uma máscara para o cpf
  const handleCpfChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, ""); // Remove tudo que não é dígito
    value = value.replace(/(\d{3})(\d)/, "$1.$2"); // Adiciona ponto após o terceiro dígito
    value = value.replace(/(\d{3})(\d)/, "$1.$2"); // Adiciona outro ponto após o sexto dígito
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Adiciona traço após o nono dígito
    setInputs((inputs) => ({
      ...inputs,
      cpf: value,
    }));
  };
  const handleCadastro = (event) => {
    event.preventDefault();
  };

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
          <h1 className="login cadastro-label">Cadastre-se</h1>
        </div>
        <form onSubmit={handleCadastro} className="main-content-container">
          <TextField
            variant="filled"
            type="text"
            name="nome"
            className="input"
            label="Nome de Usuário"
            placeholder="ex: João da Silva"
            inputProps={{ maxLength: 120 }}
            helperText={mensagensErro.nome.mensagem}
            error={mensagensErro.nome.deuErro}
            onBlur={(e) => {
              validarNome();
            }}
            value={inputs.nome}
            onChange={
              (event) =>
                setInputs((inputs) => ({
                  ...inputs,
                  nome: event.target.value,
                }))
              /*setSenha(event.target.value)*/
            }
            sx={[
              {
                "&:after": {
                  borderColor: "#5F4BB6",
                  backgroundColor: "#342965",
                },
              },
              {
                marginTop: "2.75rem",
                marginBottom: "2rem",
              },
            ]}
          ></TextField>
          <TextField
            variant="filled"
            type="email"
            name="email"
            className="input"
            label="Email"
            placeholder="ex: joaosilva@gmail.com"
            value={inputs.email}
            inputProps={{ maxLength: 64 }}
            helperText={mensagensErro.email.mensagem}
            error={mensagensErro.email.deuErro}
            onBlur={(e) => {
              validarEmail();
            }}
            onChange={(event) =>
              setInputs((inputs) => ({
                ...inputs,
                email: event.target.value,
              }))
            }
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
            margin="20px"
            variant="filled"
            type="text"
            name="cpf"
            className="input"
            label="CPF"
            placeholder="123.456.789-00"
            inputProps={{ maxLength: 14 }}
            helperText={mensagensErro.cpf.mensagem}
            error={mensagensErro.cpf.deuErro}
            onBlur={(e) => {
              validarCpf();
            }}
            value={inputs.cpf}
            onChange={handleCpfChange}
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
            type="password"
            name="senha"
            className="input"
            placeholder="Senha"
            label="Senha"
            helperText={mensagensErro.senha.mensagem}
            error={mensagensErro.senha.deuErro}
            inputProps={{ maxLength: 20 }}
            onBlur={(e) => {
              validarSenha();
            }}
            value={inputs.senha}
            onChange={(event) =>
              setInputs((inputs) => ({
                ...inputs,
                senha: event.target.value,
              }))
            }
            sx={[
              {
                "&:after": {
                  borderColor: "#5F4BB6",
                  backgroundColor: "#342965",
                },
              },
            ]}
          ></TextField>

          <button type="submit">Fazer Cadastro</button>
          <div className="wrapper-signup-navigation">
            <p className="signup-navigation">
              Já possui uma conta? <a href="Login">Logue-se</a>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Cadastro;
