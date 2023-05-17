import React from "react";
import Header from "../elements/header/Header";
import style from "./Home.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function Home() {
  const { user, setUser, isLoading } = useAuth();
  const [publicacoes, setPublicacoes] = useState([]);
  const [imagens, setImagens] = useState([]);
  const [image, setImage] = useState(null);
/*
  useEffect(() => {
    async function fetchPublications() {
      const response = await axios.get("http://localhost:8080/publicacoes");
      setPublicacoes(response.data);
    }
    fetchPublications();
  }, []);*/
  
  useEffect(() => {
    // Solicita as publicações
    axios.get('http://localhost:8080/publicacoes')
      .then(response => {
        setPublicacoes(response.data);
        const imagensIds = response.data.map(publicacao => publicacao.id);
        axios.get(`http://localhost:8080/imagens/publicacao/${imagensIds[0]}`, { responseType: 'arraybuffer' })
        .then(response => {})
        // Obtém as imagens das publicações
     /*   const imagensIds = response.data.map(publicacao => publicacao.id);
        axios.all(
          imagensIds.map(imagemId => axios.get(`http://localhost:8080/imagens/publicacao/${imagemId}`, { responseType: 'arraybuffer' }))
        ).then(responses => {
          setImagens(responses.map(response => URL.createObjectURL(new Blob([response.data]))));
        });*/
      })
      .catch(error => {
        console.error(error);
      });
      
  }, []);




/*

  axios.get('http://localhost:8080/imagens/152', { responseType: 'arraybuffer' })
  .then(response => {
    // Transformamos os dados binários da imagem em uma URL
    const url = URL.createObjectURL(new Blob([response.data]));
    setImage(url);
  })
  .catch(error => {
    console.error(error);
  });*/

 /* const getImage = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/imagens/publicacao/${id}`
      );
      const tipo = response.data[0].tipo;
      const conteudo = response.data[0].conteudo;

      const blob = new Blob([conteudo], { type: tipo });
      // Cria uma URL do blob para ser usada no <img> tag
      const urlImagem = URL.createObjectURL(blob);
      return urlImagem;
    } catch (error) {
      console.log(error);
      return null;
    }
  };*/

  return (
    <div>
      <Header />
      <main className={style["main"]}>
        <div className={style["roxo"]}></div>
        <div className={style["searchbar"]}>
          <input placeholder="Pequise por estado ou cidade ex: Santa Catarina, Florianópolis etc..."></input>
          <IconButton
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
                  publicacoes.map((publicacao) => {
                    return (
                      <a className={style["grid-item"]} key={publicacao.id}>
                        <div className={style["img-wrapper"]}>
                         {image && <img className={style["img-item"]} src={image} />}
                        </div>
                        <div>
                          <h2>{publicacao.titulo}</h2>
                        </div>
                      </a>
                    );
                  })
                }
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default Home;
