import React from "react";
import Header from "../elements/header/Header";
import style from "./Publicar.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { json } from "react-router-dom";

function Publicar() {
  const [imagem, setImagem] = useState({});
  const [idPublicacao, setIdPublicacao] = useState(0);
  const [inputs, setInputs] = useState({});
  const [saveImagens, setSaveImagens] = useState(false);
  const { user } = useAuth();
  /* useEffect(() => {
    // Aqui fazemos a requisição GET para a rota que retorna a imagem
    axios.get('http://localhost:8080/imagens/1', { responseType: 'arraybuffer' })
      .then(response => {
        // Transformamos os dados binários da imagem em uma URL
        const url = URL.createObjectURL(new Blob([response.data]));
        setImagem2(url);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);*/

  useEffect(() => {
    if(saveImagens === true){
     handleUpload();
      /*for(let i = 0; i < imagem.length; i++){
        const formData = new FormData();
        formData.append("imagem", imagem[i]);
        axios.post('http://localhost:8080/imagens', formData)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          alert(error);
        });*/
      
    }
  }, [saveImagens])
  const handleCadastro = async (e) => {
    e.preventDefault();
    const formDataCadastro = new FormData();

    formDataCadastro.append("cidade", "inputs.cidade");
    formDataCadastro.append("estado", "inputs.estado");
    formDataCadastro.append("logradouro", "inputs.logradouro");
    formDataCadastro.append("bairro", "inputs.bairro");
    formDataCadastro.append("cep", "inputs499");
    formDataCadastro.append("titulo", "inputs.titulo");
    formDataCadastro.append("descricao", "inputs.descricao");
    formDataCadastro.append("numPessoas", 5);
    formDataCadastro.append("precoTotal", 5.0);
    formDataCadastro.append("contato", "inputs.contato");
    formDataCadastro.append("precoDividir", 5.0);
    formDataCadastro.append("idUsuario.id", user.id);
    formDataCadastro.append("numero", "inputs.numero");
    formDataCadastro.append("chavePix", "inputs.chavePix");
  //  formDataCadastro.append("imagem", imagem)

    try {
      const response = await axios.post(
        "http://localhost:8080/publicacoes",
        formDataCadastro,
        {
          headers: {
                "Content-Type": "application/json"
          }
        }
      );
      setSaveImagens(true);
      setIdPublicacao(response.data.id);
      console.log("Publicação criada:", response.data);
    } catch (error) {
      console.log("Erro ao criar publicação:", error);
    }
  }

 const handleImagemSelecionada = (event) => {
    setImagem(event.target.files);
 }
   const handleUpload = (event) => {
   // event.preventDefault();

   for(let i = 0; i < imagem.length; i++){
    const formData = new FormData();
    formData.append("imagem", imagem[i]);
    formData.append("idPublicacao", idPublicacao);
    axios.post('http://localhost:8080/imagens', formData)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      alert(error);
    });
   }

  };

  return (
    <div>
      <Header></Header>
      <main className={style["main"]}>
        <div className={style["roxo"]}></div>
        <h1>Fazer Publicação</h1>
        <form className={style["content"]}>
          <h2>Título</h2>
          <input
            value={inputs.titulo}
            onChange={(event) => {
              setInputs({ ...inputs, titulo: event.target.value });
            }}
            className={style["input"]}
          ></input>
          <h2>Descrição</h2>
          <textarea
            value={inputs.descricao}
            onChange={(event) => {
              setInputs({ ...inputs, descricao: event.target.value });
            }}
          ></textarea>
          <h2>Quantas pessoas vão "rachar"?</h2>
          <input
            value={inputs.numPessoas}
            onChange={(event) => {
              setInputs({ ...inputs, numPessoas: event.target.value });
            }}
            className={style["input"]}
          ></input>
          <h2>Preço total</h2>
          <input
            value={inputs.precoTotal}
            onChange={(event) => {
              setInputs({ ...inputs, precoTotal: event.target.value });
            }}
            className={style["input"]}
          ></input>
          <h2>Preço dividido</h2>
          <input
            value={inputs.precoDividir}
            onChange={(event) => {
              setInputs({ ...inputs, precoDividir: event.target.value });
            }}
            className={style["input"]}
          ></input>
          <h2>Contato</h2>
          <input
            value={inputs.contato}
            onChange={(event) => {
              setInputs({ ...inputs, contato: event.target.value });
            }}
            className={style["input"]}
          ></input>
          <h2>Imagens</h2>
          <input type="file" multiple onChange={handleImagemSelecionada} />
          <h2>Endereço</h2>
          <div className={style["endereco"]}>
            <div className={style["endereco-item"]}>
              <h3>Estado</h3>
              <input
                onChange={(event) => {
                  setInputs({ ...inputs, estado: event.target.value });
                }}
                value={inputs.estado}
              ></input>
              <h3>Cidade</h3>
              <input
                onChange={(event) => {
                  setInputs({ ...inputs, cidade: event.target.value });
                }}
                value={inputs.cidade}
              ></input>
            </div>
            <div className={style["endereco-item"]}>
              <h3>Logradouro</h3>
              <input
                onChange={(event) => {
                  setInputs({ ...inputs, logradouro: event.target.value });
                }}
                value={inputs.logradouro}
              ></input>
              <h3>Bairro</h3>
              <input
                value={inputs.bairro}
                onChange={(event) => {
                  setInputs({ ...inputs, bairro: event.target.value });
                }}
              ></input>
            </div>
            <div className={style["endereco-item"]}>
              <h3>CEP</h3>
              <input
                onChange={(event) => {
                  setInputs({ ...inputs, cep: event.target.value });
                }}
                value={inputs.cep}
              ></input>
              <h3>Número</h3>
              <input
                onChange={(event) => {
                  setInputs({ ...inputs, numero: event.target.value });
                }}
                value={inputs.numero}
              ></input>
            </div>
          </div>
          <h2>Pagamento</h2>
          <h3>Chave pix</h3>
          <input
            className={style["input"]}
            onChange={(event) => {
              setInputs({ ...inputs, chavePix: event.target.value });
            }}
            value={inputs.chavePix}
          ></input>
          <input
            className={style["submit"]}
            onClick={handleCadastro}
            type="submit"
            value="Publicar"
          ></input>
        </form>
      </main>
    </div>
  );
}

export default Publicar;
