import Header from "../elements/header/Header";
import style from "./Home.module.css";
import { useAuth } from "../../AuthContext";
import { useEffect, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { MenuItem } from "@mui/material";
import { Menu } from "@mui/material";
import axios from "axios";

function MinhasPublicacoes() {
  const [publicacoes, setPublicacoes] = useState([]);
  const { user, setUser, isLoading, token} = useAuth();
  const[idPublicacao, setIdPublicacao] = useState(0); // id da publicação que será excluída
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleMouseEnter = (event, id) => {
    event.preventDefault();
    setIdPublicacao(id);
    setAnchorEl(!anchorEl ? event.currentTarget : null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (isLoading == false) {
      // Solicita as publicações
      axios
        .get("http://localhost:8080/publicacoes/usuario/" + user.id,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        })
        .then((response) => {
          let publicacoes = response.data;
          let promises = []; // Array para armazenar as chamadas assíncronas

          // Mapeia as publicações
          publicacoes.map((publicacao) => {
            let promise = axios
              .get(`http://localhost:8080/imagens/publicacao/${publicacao.id}`,{
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((responses) => {
                // Transformamos os dados binários da imagem em uma URL
                publicacao.imagem =
                  "data:image/png;base64," + responses.data[0].conteudo;
              });

            promises.push(promise); // Adiciona a chamada assíncrona ao array de promises
          });

          // Aguarda a conclusão de todas as chamadas assíncronas
          Promise.all(promises).then(() => {
            setPublicacoes(publicacoes); // Atualiza as publicações depois que todas as imagens forem carregadas
          });
        }).catch((error) => {
          const logout = () => {
            setUser(null);
            localStorage.removeItem("token");
             
           //   alert("oi")
        
          };
          logout();
        })
    }
  }, [isLoading]);

  return (
    <div className={style["minhasPublicacoes-wrapper"]}>
      <Header></Header>
      <main className={style["main"]}>
        <div className={style["roxo"]}></div>
        <div className={style["content-wrapper"]}>
          <div className={style["content"]}>
            <h1>Minhas Publicações</h1>
            <div className={style["grid-container"]}>
              {publicacoes.length > 0 &&
                publicacoes.map((publicacao) => {
                  const urlPublicacao = `Publicacao/${publicacao.id}`;
                  return (
                    <a
                      href={urlPublicacao}
                      className={style["grid-item"]}
                      key={publicacao.id}
                    >
                      <div className={style["img-wrapper"]}>
                        {publicacao.imagem && (
                          <img
                            className={style["img-item"]}
                            src={publicacao.imagem}
                          />
                        )}
                      </div>
                      <div className={style["publication-items-wrapper"]}>
                        <div>
                          <h2>{publicacao.titulo}</h2>
                        </div>
                        <div className={style["grey"]}>
                          <p>
                            {publicacao.cidade} - {publicacao.estado}
                          </p>
                        </div>
                        <div>
                          <p>{publicacao.numPessoas} Vagas Imóvel</p>
                        </div>
                        <div>
                          <p>
                            <strong>
                              R${" "}
                              {publicacao.precoDividir.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                              })}
                            </strong>{" "}
                            <span className={style["grey"]}>/Mensal</span>
                          </p>
                        </div>
                        <div className={style['flex']}>
                        <button
                            className={style["button-icon"]}
                            aria-controls="menu"
                            aria-haspopup="true"
                            onClick={(event) => handleMouseEnter(event, publicacao.id)}
                          >
                            <SettingsIcon
                              sx={{ fontSize: "3rem" }}
                            ></SettingsIcon>
                          </button>
                        </div>
                      </div>
                    </a>
                  );
                })}
            </div>
          </div>
        </div>
      </main>
      <Menu
        //  className={style["menu"]}
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem component={Link} to={`/Editar/${idPublicacao}`}>
          Editar
        </MenuItem>
        <MenuItem
          onClick={() => {
            let excluir = window.confirm("Deseja excluir a publicação?");
            if (excluir) {
              axios
                .delete(
                  `http://localhost:8080/publicacoes/${idPublicacao}`,{
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then((response) => {
                  setPublicacoes(
                    publicacoes.filter((publicacao) => {
                      return publicacao.id !== idPublicacao;
                    })
                  )
                  handleClose();
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          }}
        >
          Excluir
        </MenuItem>
      </Menu>
    </div>
  );
}

export default MinhasPublicacoes;
