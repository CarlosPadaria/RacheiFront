import React from "react";
import style from "./User-data.module.css";
import Header from "../elements/header/Header";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ShieldIcon from "@mui/icons-material/Shield";
import OutlinedInput from "@mui/material/OutlinedInput";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from '@mui/material/FilledInput';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {useAuth} from "../../AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import Checkbox from "@mui/material/Checkbox";

const Seguranca = () => {

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const [showPasswordDel, setShowPasswordDel] = useState(false);

  const handleClickShowPasswordDel = () => setShowPasswordDel((show) => !show);

  const handleMouseDownPasswordDel= (event) => {
    event.preventDefault();
  };


  const { user, setUser, isLoading, setIsLoading } = useAuth();

  const [checkBox, setCheck] = useState(false)
  const [inputs, setInputs] = useState({
    nome: "",
    confirmarSenha: "",
    senha: "",
    email: "",
    cpf: "",
    confirmarSenhaDeletar:"",
    senhaDeletar:""
    
    
  });
  
  
  const [mensagemErro, setMensagensErro] = useState({
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
    confirmarSenha: {
      mensagem: "",
      deuErro: false,
    },
    senhaDeletar: {
      mensagem: "",
      deuErro: false,
    },
    confirmarSenhaDeletar: {
      mensagem: "",
      deuErro: false,
    },
  });


  const validarConfirmarSenha = () => {
    // validar senha, deve ter entre 6 e 20 caracteres e conter pelo menos um número e 1 letra
    const senha = inputs.confirmarSenha;
    let valido = true;

    if (senha.length === 0) {
      setMensagensErro((mensagemErro) => ({
        ...mensagemErro,
        confirmarSenha: {
          mensagem: "Campo obrigatório",
          deuErro: true,
        },
      }));
      valido = false;
    } else if (senha.length < 6 || senha.length > 20) {
      setMensagensErro((mensagemErro) => ({
        ...mensagemErro,
        confirmarSenha: {
          mensagem: "Senha deve ter entre 6 e 20 caracteres",
          deuErro: true,
        },
      }));
      valido = false;
    } else if (
      //regex para validar senha, inclua pelo menos 1 número e 1 letra, e pode ter caracteres especiais
      !senha.match(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,20}$/)
    ) {
      setMensagensErro((mensagemErro) => ({
        ...mensagemErro,
        confirmarSenha: {
          mensagem:
            "Deve possuir pelo menos 1 número e 1 letra, e não pode ter caracteres especiais",
          deuErro: true,
        },
      }));
      valido = false;

    } 
    
    else if(inputs.confirmarSenha !== inputs.senha){
      setMensagensErro((mensagemErro) => ({
        ...mensagemErro,
        confirmarSenha: {
          mensagem: "As senhas devem ser iguais",
          deuErro: true,
        },
      }));
      valido = false
    }
    
    
    else {
      setMensagensErro((mensagemErro) => ({
        ...mensagemErro,
        confirmarSenha: {
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
      setMensagensErro((mensagemErro) => ({
        ...mensagemErro,
        senha: {
          mensagem: "Campo obrigatório",
          deuErro: true,
        },
      }));
      valido = false;
    } else if (senha.length < 6 || senha.length > 20) {
      setMensagensErro((mensagemErro) => ({
        ...mensagemErro,
        senha: {
          mensagem: "Senha deve ter entre 6 e 20 caracteres",
          deuErro: true,
        },
      }));
      valido = false;
    } else if (
      //regex para validar senha, inclua pelo menos 1 número e 1 letra, e pode ter caracteres especiais
      !senha.match(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,20}$/)
    ) {
      setMensagensErro((mensagemErro) => ({
        ...mensagemErro,
        senha: {
          mensagem:
            "Deve possuir pelo menos 1 número e 1 letra, e não pode ter caracteres especiais",
          deuErro: true,
        },
      }));
      valido = false;

    } 
    
    else if(inputs.senha !== inputs.confirmarSenha){
      setMensagensErro((mensagemErro) => ({
        ...mensagemErro,
       senha: {
          mensagem: "As senhas devem ser iguais",
          deuErro: true,
        },
      }));
      valido = false
    }
    
    
    else {
      setMensagensErro((mensagemErro) => ({
        ...mensagemErro,
        senha: {
          mensagem: "",
          deuErro: false,
        },
      }));
    }
    return valido;
  };


  const validarNome = () => {
    const nome = inputs.nome;
    let valido = true;
    // validar nome, somente letras e espaços
    if (nome.length === 0) {
      setMensagensErro((mensagemErro) => ({
        ...mensagemErro,
        nome: {
          mensagem: "Campo obrigatório",
          deuErro: true,
        },
      }));
      valido = false;
    } else if (!nome.match(/^[a-zA-ZÀ-ú ]*$/)) {
      setMensagensErro((mensagemErro) => ({
        ...mensagemErro,
        nome: {
          mensagem: "Nome inválido",
          deuErro: true,
        },
      }));
      valido = false;
    } else if (nome.length < 3) {
      setMensagensErro((mensagemErro) => ({
        ...mensagemErro,
        nome: {
          mensagem: "Nome deve ter pelo menos 3 caracteres",
          deuErro: true,
        },
      }));
      valido = false;
    } else {
      setMensagensErro((mensagemErro) => ({
        ...mensagemErro,
        nome: {
          mensagem: "",
          deuErro: false,
        },
      }));
    }
    return valido;
  };

  const validaAtualizar= () => {

    const nomeValido = validarNome();
    const senhaValida = validarSenha();
    const senhaConValida = validarConfirmarSenha();

    return  nomeValido &&  senhaValida && senhaConValida;
  };




  const handleAtualizar= async (e) => {

    e.preventDefault();

    if(validaAtualizar()){

      const formDataAtualizar = new FormData()

      formDataAtualizar.append("nome", inputs.nome)
      formDataAtualizar.append("senha", inputs.senha)
      formDataAtualizar.append("email", inputs.email)
      formDataAtualizar.append("cpf", inputs.cpf)

      try {
        const response = await axios.put(
          `http://localhost:8080/usuarios/${user.id}`,
          formDataAtualizar,
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
        
      }
    }

    }

    const validarConfirmarSenhaDel = () => {
      // validar senha, deve ter entre 6 e 20 caracteres e conter pelo menos um número e 1 letra
      const senha = inputs.confirmarSenhaDeletar;
      let valido = true;
  
      if (senha.length === 0) {
        setMensagensErro((mensagemErro) => ({
          ...mensagemErro,
          confirmarSenhaDeletar: {
            mensagem: "Campo obrigatório",
            deuErro: true,
          },
        }));
        valido = false;
      } else if (senha.length < 6 || senha.length > 20) {
        setMensagensErro((mensagemErro) => ({
          ...mensagemErro,
          confirmarSenhaDeletar: {
            mensagem: "Senha deve ter entre 6 e 20 caracteres",
            deuErro: true,
          },
        }));
        valido = false;
      } else if (
        //regex para validar senha, inclua pelo menos 1 número e 1 letra, e pode ter caracteres especiais
        !senha.match(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,20}$/)
      ) {
        setMensagensErro((mensagemErro) => ({
          ...mensagemErro,
          confirmarSenhaDeletar: {
            mensagem:
              "Deve possuir pelo menos 1 número e 1 letra, e não pode ter caracteres especiais",
            deuErro: true,
          },
        }));
        valido = false;
  
      } 
      
      else if(senha !== inputs.senhaDeletar){
        setMensagensErro((mensagemErro) => ({
          ...mensagemErro,
          confirmarSenhaDeletar: {
            mensagem: "As senhas devem ser iguais",
            deuErro: true,
          },
        }));
        valido = false
      }
      
      
      else {
        setMensagensErro((mensagemErro) => ({
          ...mensagemErro,
          confirmarSenhaDeletar: {
            mensagem: "",
            deuErro: false,
          },
        }));
      }
      return valido;
    };


    const validarSenhaDel = () => {
      // validar senha, deve ter entre 6 e 20 caracteres e conter pelo menos um número e 1 letra
      const senha = inputs.senhaDeletar;
      let valido = true;
  
      if (senha.length === 0) {
        setMensagensErro((mensagemErro) => ({
          ...mensagemErro,
          senhaDeletar: {
            mensagem: "Campo obrigatório",
            deuErro: true,
          },
        }));
        valido = false;
      } else if (senha.length < 6 || senha.length > 20) {
        setMensagensErro((mensagemErro) => ({
          ...mensagemErro,
          senhaDeletar: {
            mensagem: "Senha deve ter entre 6 e 20 caracteres",
            deuErro: true,
          },
        }));
        valido = false;
      } else if (
        //regex para validar senha, inclua pelo menos 1 número e 1 letra, e pode ter caracteres especiais
        !senha.match(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,20}$/)
      ) {
        setMensagensErro((mensagemErro) => ({
          ...mensagemErro,
          senhaDeletar: {
            mensagem:
              "Deve possuir pelo menos 1 número e 1 letra, e não pode ter caracteres especiais",
            deuErro: true,
          },
        }));
        valido = false;
  
      } 
      
      else if(senha !== inputs.confirmarSenhaDeletar){
        setMensagensErro((mensagemErro) => ({
          ...mensagemErro,
         senhaDeletar: {
            mensagem: "As senhas devem ser iguais",
            deuErro: true,
          },
        }));
        valido = false
      } else if(senha !== user.senha){
        setMensagensErro((mensagemErro) => ({
          ...mensagemErro,
         senhaDeletar: {
            mensagem: "Senha incorreta",
            deuErro: true,
          },
        }));
        valido = false
      }
      
      
      else {
        setMensagensErro((mensagemErro) => ({
          ...mensagemErro,
          senhaDeletar: {
            mensagem: "",
            deuErro: false,
          },
        }));
      }
      return valido;
    };



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
      } else if (email !== user.email) {
        setMensagensErro((mensagensErro) => ({
          ...mensagensErro,
          email: {
            mensagem: "Email incorreto",
            deuErro: true,
          },
        }));
        valido = false;
      }else {
        setMensagensErro((mensagensErro) => ({
          ...mensagensErro,
          email: {
            mensagem: "",
            deuErro: false,
          },
        }));
      }
      return valido;
    };


  
    const validaDeletar= () => {

      const nomeValido = validarEmail();
      const senhaValida = validarSenhaDel();
      const senhaConValida = validarConfirmarSenhaDel();
  
      return  nomeValido &&  senhaValida && senhaConValida;
    };
    
    const handleCheck = (event) => {
      setCheck(event.target.checked);
    }
  
    const handleDeletar= async (e) => {

      e.preventDefault();


        if (validaDeletar()) {
          try {
            const response = await axios.delete(
              `http://localhost:8080/usuarios/${user.id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
              
            );
        
              setUser(null);
              alert("oi")
              localStorage.removeItem("user");
      
            console.log("Dados Apagados:", response.data)
            
            
          } catch (error) {
            console.log("Erro ao apagar", error)
            
          }
        
        }
        
      
    }

    

  

  return (
    <div className={style['seguranca-wrapper']}>
      <Header></Header>
      <main className={style.main}>
        <div className={style["roxo"]}></div>
        <div className={style["section-wrapper"]}>
          <section className={style["items"]}>
            <ul>
              <li>
                <a href="dadosDaConta"
                className={style["hover-anchor"]}
                >
                  
                  <AssignmentIndIcon
                    sx={{
                      fontSize: "2rem",
                    }}
                  ></AssignmentIndIcon>{" "}
                  Dados da conta
                </a>
              </li>
              <li>
                <a href="seguranca"
                
                className={style["hover-anchor"]}>
                  <ShieldIcon
                    sx={{
                      fontSize: "2rem",
                    }}
                  ></ShieldIcon>
                  Segurança
                </a>
              </li>
            </ul>
          </section>
          <div className={style["content-wrapper"]}>
            
            <section className={style["content"]}>
              <div className={style["content-items"]}>
                <h2>Alterar dados</h2>
                <label className={style['dados-label']} for="nome">Nome</label>
                <TextField
                  variant="outlined"
                  inputProps={{ maxLength: 100 }}
                  error={mensagemErro.nome.deuErro}
                  helperText={mensagemErro.nome.mensagem}
                  onChange={(event) => {
                  setInputs({ ...inputs, nome: event.target.value });
                 }}
                 className={style["input"]}
          
          
                  value={inputs.nome}
                ></TextField>

                <label className={style['dados-label']} for="nova-senha">Nova senha</label>
                <TextField
                  variant="outlined"
                  error={mensagemErro.senha.deuErro}
                  helperText={mensagemErro.senha.mensagem}
                  onChange={(event) => {
                  setInputs({ ...inputs, senha: event.target.value });
                 }}
                 className={style["input"]}
                 type={showPassword ? "text" : "password"}
                 value={inputs.senha}
                 InputProps={{
                  endAdornment: (
                    <InputAdornment>
                       <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                  ),
                }}
                
                ></TextField>
               
                
                <label  className={style['dados-label']} for="confirmar-senha">Confirmar Senha</label>
                
                <TextField
                  variant="outlined"
                  inputProps={{ maxLength: 100 }}
                  error={mensagemErro.confirmarSenha.deuErro}
                  helperText={mensagemErro.confirmarSenha.mensagem}
                  onChange={(event) => {
                  setInputs({ ...inputs, confirmarSenha: event.target.value });
                 }}
                 className={style["input"]}
                 type={showPassword ? "text" : "password"}
                 value={inputs.confirmarSenha}
                 InputProps={{
                  endAdornment: (
                    <InputAdornment>
                       <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                  ),
                }}
            
                ></TextField>

                <button className={style["submit"]} onClick={handleAtualizar}>Alterar dados</button>
              </div>
            </section>
            <section className={style["content"]}>
              <div className={style["content-items"]}>
                <h2 className={style["danger"]}>Desativar Conta</h2>
                
                <label className={style['dados-label']} for="email">Email</label>
                <TextField
                  variant="outlined"
                  inputProps={{ maxLength: 100 }}
                  error={mensagemErro.email.deuErro}
                  helperText={mensagemErro.email.mensagem}
                  onChange={(event) => {
                  setInputs({ ...inputs, email: event.target.value });
                 }}
                 className={style["input"]}

          
          
                  value={inputs.email}
                ></TextField>

                <label className={style['dados-label']} for="nova-senha">Senha</label>
                <TextField
                  variant="outlined"
                  error={mensagemErro.senhaDeletar.deuErro}
                  helperText={mensagemErro.senhaDeletar.mensagem}
                  onChange={(event) => {
                  setInputs({ ...inputs, senhaDeletar: event.target.value });
                 }}
                 className={style["input"]}
                 type={showPasswordDel ? "text" : "password"}
                 value={inputs.senhaDeletar}
                 InputProps={{
                  endAdornment: (
                    <InputAdornment>
                       <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordDel}
                      onMouseDown={handleMouseDownPasswordDel}
                      edge="end"
                    >
                      {showPasswordDel ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                  ),
                }}
                
                ></TextField>

                <label className={style['dados-label']}>Confirmar Senha</label>
                <TextField
                  variant="outlined"
                  error={mensagemErro.confirmarSenhaDeletar.deuErro}
                  helperText={mensagemErro.confirmarSenhaDeletar.mensagem}
                  onChange={(event) => {
                  setInputs({ ...inputs, confirmarSenhaDeletar: event.target.value });
                 }}
                 className={style["input"]}
                 type={showPasswordDel ? "text" : "password"}
                 value={inputs.confirmarSenhaDeletar}
                 InputProps={{
                  endAdornment: (
                    <InputAdornment>
                       <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordDel}
                      onMouseDown={handleMouseDownPasswordDel}
                      edge="end"
                    >
                      {showPasswordDel ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                  ),
                }}
                ></TextField>
                
                <div className={style['checkbox-div']}>

                <FormControlLabel required control={<Checkbox
                 onChange={handleCheck} />} 
                
                label="Estou ciente de que não terei mais acesso a essa conta e suas publicações"/>
           
                </div>
                <button className={style["danger-button"]} disabled={!checkBox} onClick={handleDeletar}>Desativar</button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Seguranca;
