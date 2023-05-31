import React from "react";
import Header from "../elements/header/Header";
import style from "./Home.module.css";
import SearchIcon from "@mui/icons-material/Search";

import { IconButton } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../AuthContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function Home() {
  const { user, setUser, isLoading } = useAuth();
  const [publicacoes, setPublicacoes] = useState([]);
  const [publicacoesFiltradas, setPublicacoesFiltradas] = useState([]);
  const [imagens, setImagens] = useState([]);
  const [image, setImage] = useState(null);
  const [carregandoImagens, setCarregandoImagens] = useState(true);
  const [pesquisa, setPesquisa] = useState("");
  const [pesquisaRealizada, setPesquisaRealizada] = useState(false);

  useEffect(() => {
    // Solicita as publicações
    axios.get("http://localhost:8080/publicacoes").then((response) => {
      let publicacoes = response.data;
      let promises = []; // Array para armazenar as chamadas assíncronas

      // Mapeia as publicações
      publicacoes.map((publicacao) => {
        let promise = axios
          .get(`http://localhost:8080/imagens/publicacao/${publicacao.id}`)
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
    });
  }, []);
  const exibirPublicacoes = pesquisaRealizada ? publicacoesFiltradas : publicacoes;

  const pesquisarPorCidadeOuEstado = (consulta) => {
    const publicacoesFiltradas = publicacoes.filter((publicacao) =>
      publicacao.cidade.toLowerCase().includes(consulta.toLowerCase()) ||
      publicacao.estado.toLowerCase().includes(consulta.toLowerCase())
    );
    setPublicacoesFiltradas(publicacoesFiltradas);
    setPesquisaRealizada(true);
  };


  return (
    <div>
      <Header />
      <main className={style["main"]}>
        <div className={style["roxo"]}></div>
        <div className={style["searchbar"]}>
          <input placeholder="Pequise por estado ou cidade ex: Santa Catarina, Florianópolis etc..."
          onChange={(e) => setPesquisa(e.target.value)}
          value={pesquisa}
          ></input>
          <IconButton
            onClick={() => pesquisarPorCidadeOuEstado(pesquisa)}
            className={style["search-icon"]}
            sx={{
              className: style["search-icon"],
              borderRadius: "0px 41.5px 41.5px 0px",
              backgroundColor: "#5f4bb6",
              height: "3.0rem",
              padding: "2rem",
              width: "10%",
              "&:hover": {
                backgroundColor: "#433582",
              },
            }}
          >
            <SearchIcon
              sx={{
                fontSize: "32px",
                color: "#fff",
              }}
            />
          </IconButton>
        </div>
        <div className={style["content-wrapper"]}>
          <div className={style["content"]}>
            <h1>Principais Publicações</h1>
            <div className={style["grid-container"]}>
              {publicacoes.length > 0 &&
                exibirPublicacoes.map((publicacao) => {
                  const urlPublicacao = `Publicacao/${publicacao.id}`;
                  return (
                    <a href={urlPublicacao} className={style["grid-item"]} key={publicacao.id}>
                      <div className={style["img-wrapper"]}>
                        {publicacao.imagem && (
                          <img
                            className={style["img-item"]}
                            src={publicacao.imagem}
                          />
                        )}
                      </div>
                      <div className={style['publication-items-wrapper']}>
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
                          <p><strong>R$ {publicacao.precoDividir.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> <span className={style['grey']}>/Mensal</span></p>
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
export default Home;
