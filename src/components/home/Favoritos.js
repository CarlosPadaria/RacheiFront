import React from "react";
import Header from "../elements/header/Header";
import style from "./Home.module.css";
import { useAuth } from "../../AuthContext";
import { useState } from "react";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useEffect } from "react";
import axios from "axios";

function Favoritos() {
  const { user, setUser, isLoading, token } = useAuth();
  const [publicacoes, setPublicacoes] = useState([]);

  const handleFavoriteClick = async (event, publicacaoId) => {
    event.preventDefault();
    
    // Encontre a publicação pelo id
    const publicacaoAtualizada = publicacoes.find(publicacao => publicacao.id === publicacaoId);
    
    // Inverta o valor da propriedade 'favorito'
    publicacaoAtualizada.favorito = !publicacaoAtualizada.favorito;
    
    // Atualize o estado das publicações
    try {
      // Chame o endpoint para favoritar a publicação
      await axios.put(`http://localhost:8080/publicacoes/${publicacaoId}/favoritar`,{
        usuarioId: user.id,
        favoritado: publicacaoAtualizada.favorito
      }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      } 
      });
  
      // Atualize o estado das publicações
      setPublicacoes([...publicacoes]);
    } catch (error) {
      // Trate os erros da requisição
      console.error(error);
      // Reverta o valor da propriedade 'favorito' em caso de erro
      publicacaoAtualizada.favorito = !publicacaoAtualizada.favorito;
      // Atualize o estado das publicações novamente para refletir a alteração revertida
      setPublicacoes([...publicacoes]);
    }
  };
  useEffect(() => {
    // Solicita as publicações
    if (user != null) {
      axios.get(`http://localhost:8080/publicacoes/favoritos/usuarios/${user.id}`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }).then((response) => {
        let publicacoes = response.data;
        let promises = []; // Array para armazenar as chamadas assíncronas

        // Mapeia as publicações
        publicacoes.forEach((publicacao) => {
          publicacao.favorito = false;
          // Itera sobre o array de favoritos da publicação
          publicacao.favoritos.forEach((favorito) => {
            if (favorito.id === user.id) {
              publicacao.favorito = true;
            }
          });

          let promise = axios
            .get(`http://localhost:8080/imagens/publicacao/${publicacao.id}`,{
              headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              }
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

  }, [user]);


  return (
    <div className={style["favoritos-wrapper"]}>
      <Header></Header>
      <main className={style["main"]}>
        <div className={style["roxo"]}></div>
        <div className={style["content-wrapper"]}>
          <div className={style["content"]}>
            <h1>Favoritos</h1>
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
                        <div className={style["flex"]}>
                          <IconButton
                            className={style["button-icon-heart"]}
                            sx={{
                              color: "#5f4bb6",
                              position: "absolute",
                              right: "25px",
                              bottom: "15px",
                            }}
                            onClick={(event) =>
                              handleFavoriteClick(event, publicacao.id)
                            }
                          >
                            {publicacao.favorito ? (
                              <Favorite sx={{ fontSize: "3rem" }} />
                            ) : (
                              <FavoriteBorderIcon sx={{ fontSize: "3rem" }} />
                            )}
                          </IconButton>
                        </div>
                      </div>
                    </a>
                  );
                })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Favoritos;
