import React from "react";
import Header from "../elements/header/Header";
import style from "./Publicar.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { TextField, Select, Menu } from "@mui/material";
import { MenuItem, Button } from "@mui/material";
import { Input } from "@mui/base";

function Publicar() {
  const [imagem, setImagem] = useState({});
  const [idPublicacao, setIdPublicacao] = useState(0);
  const [inputs, setInputs] = useState({});
  const [saveImagens, setSaveImagens] = useState(false);
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [mensagemErro, setMensagemErro] = useState({
    titulo: { mensagem: "", deuErro: false },
    descricao: { mensagem: "", deuErro: false },
    numPessoas: { mensagem: "", deuErro: false },
    precoTotal: { mensagem: "", deuErro: false },
    precoDividir: { mensagem: "", deuErro: false },
    contato: { mensagem: "", deuErro: false },
    imagem: { mensagem: "", deuErro: false },
    estado: { mensagem: "", deuErro: false },
    cidade: { mensagem: "", deuErro: false },
    logradouro: { mensagem: "", deuErro: false },
    bairro: { mensagem: "", deuErro: false },
    numero: { mensagem: "", deuErro: false },
    cep: { mensagem: "", deuErro: false },
    chavePix: { mensagem: "", deuErro: false },

  });
  const { user } = useAuth();


  const handleEstadoChange = (event) => {
    // Carrega as cidades com base no estado selecionado
    const estadoId = event.target.value;
    setEstadoSelecionado(estadoId);

    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`
      )
      .then((response) => setCidades(response.data));
  };

  useEffect(() => {
    // Carrega os estados no primeiro select
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => setEstados(response.data));
  }, []);

  const campoValido = (campo, nomeCampo) => {
    if (campo === "" || campo === undefined || campo === null) {
      setMensagemErro({
        ...mensagemErro,
        [nomeCampo]: {
          mensagem: "Campo obrigatório",
          deuErro: true,
        },
      });
      return false;
    } else {
      setMensagemErro({
        ...mensagemErro,

        [nomeCampo]: {
          mensagem: "",
          deuErro: false,
        },
      });
      return true;
    }
  };

  useEffect(() => {
    if (saveImagens === true) {
      handleUpload();
    }
  }, [saveImagens]);
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
            "Content-Type": "application/json",
          },
        }
      );
      setSaveImagens(true);
      setIdPublicacao(response.data.id);
      console.log("Publicação criada:", response.data);
    } catch (error) {
      console.log("Erro ao criar publicação:", error);
    }
  };

  const handleImagemSelecionada = (event) => {
    setImagem(event.target.files);
  };
  const handleUpload = (event) => {
    // event.preventDefault();

    for (let i = 0; i < imagem.length; i++) {
      const formData = new FormData();
      formData.append("imagem", imagem[i]);
      formData.append("idPublicacao", idPublicacao);
      axios
        .post("http://localhost:8080/imagens", formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
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
          <TextField
            variant="filled"
            sx={[
              {
                "&:after": {
                  borderColor: "#5F4BB6",
                  backgroundColor: "#342965",
                },
                fontSize: "1.5rem",
              },
            ]}
            value={inputs.titulo}
            error={mensagemErro.titulo.deuErro}
            onBlur={(e) => campoValido(inputs.titulo, "titulo")}
            helperText={mensagemErro.titulo.mensagem}
            onChange={(event) => {
              setInputs({ ...inputs, titulo: event.target.value });
            }}
            className={style["input"]}
          ></TextField>
          <h2>Descrição</h2>
          <TextField
            value={inputs.descricao}
            error={mensagemErro.descricao.deuErro}
            onBlur={(e) => campoValido(inputs.descricao, "descricao")}
            helperText={mensagemErro.descricao.mensagem}
            multiline
            variant="filled"
            sx={[
              {
                "&:after": {
                  borderColor: "#5F4BB6",
                  backgroundColor: "#342965",
                },
                fontSize: "1.5rem",
              },
            ]}
            rows={4}
            onChange={(event) => {
              setInputs({ ...inputs, descricao: event.target.value });
            }}
            className={style["input"]}
          ></TextField>
          <h2>Quantas pessoas vão "rachar"?</h2>
          <TextField
            value={inputs.numPessoas}
            onBlur={(e) => campoValido(inputs.numPessoas, "numPessoas")}
            helperText={mensagemErro.numPessoas.mensagem}
            error={mensagemErro.numPessoas.deuErro}
            variant="filled"
            sx={[
              {
                "&:after": {
                  borderColor: "#5F4BB6",
                  backgroundColor: "#342965",
                },
                fontSize: "1.5rem",
              },
            ]}
            onChange={(event) => {
              setInputs({ ...inputs, numPessoas: event.target.value });
            }}
            className={style["input"]}
          ></TextField>
          <h2>Preço total</h2>
          <TextField
            value={inputs.precoTotal}
            error={mensagemErro.precoTotal.deuErro}
            onBlur={(e) => campoValido(inputs.precoTotal, "precoTotal")}
            helperText={mensagemErro.precoTotal.mensagem}
            variant="filled"
            sx={[
              {
                "&:after": {
                  borderColor: "#5F4BB6",
                  backgroundColor: "#342965",
                },
                fontSize: "1.5rem",
              },
            ]}
            onChange={(event) => {
              setInputs({ ...inputs, precoTotal: event.target.value });
            }}
            className={style["input"]}
          ></TextField>
          <h2>Preço dividido</h2>
          <TextField
            variant="filled"
            sx={[
              {
                "&:after": {
                  borderColor: "#5F4BB6",
                  backgroundColor: "#342965",
                },
                fontSize: "1.5rem",
              },
            ]}
            value={inputs.precoDividir}
            error={mensagemErro.precoDividir.deuErro}
            onBlur={(e) => campoValido(inputs.precoDividir, "precoDividir")}
            helperText={mensagemErro.precoDividir.mensagem}
            onChange={(event) => {
              setInputs({ ...inputs, precoDividir: event.target.value });
            }}
            className={style["input"]}
          ></TextField>
          <h2>Contato</h2>
          <TextField
            variant="filled"
            sx={[
              {
                "&:after": {
                  borderColor: "#5F4BB6",
                  backgroundColor: "#342965",
                },
                fontSize: "1.5rem",
              },
            ]}
            value={inputs.contato}
            onChange={(event) => {
              setInputs({ ...inputs, contato: event.target.value });
            }}
            error={mensagemErro.contato.deuErro}
            onBlur={(e) => campoValido(inputs.contato, "contato")}
            helperText={mensagemErro.contato.mensagem}
            className={style["input"]}
          ></TextField>
          <h2>Imagens</h2>
          <TextField
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagemSelecionada}
            error={mensagemErro.imagem.deuErro}
            helperText={mensagemErro.imagem.mensagem}
          ></TextField>
          <h2>Endereço</h2>
          <div className={style["endereco"]}>
            <div className={style["endereco-item"]}>
              <h3>Estado</h3>
              <Select
                className={style["select"]}
                value={estadoSelecionado}
                onChange={handleEstadoChange}
                error={mensagemErro.estado.deuErro}
                onBlur={(e) => campoValido(estadoSelecionado, "estado")}
                helperText={mensagemErro.estado.mensagem}
              >
                <MenuItem value="">Selecione um estado</MenuItem>
                {estados.map((estado) => (
                  <MenuItem value={estado.id}>{estado.nome}</MenuItem>
                ))}
              </Select>
              <h3>Cidade</h3>
              <Select
                className={style["select"]}
                value={cidadeSelecionada}
                onChange={(event) => setCidadeSelecionada(event.target.value)}
                error={mensagemErro.cidade.deuErro}
                onBlur={(e) => campoValido(cidadeSelecionada, "cidade")}
                helperText={mensagemErro.cidade.mensagem}
              >
                <MenuItem value="">Selecione uma cidade</MenuItem>
                {cidades.map((cidade) => (
                  <MenuItem key={cidade.id} value={cidade.id}>
                    {cidade.nome}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className={style["endereco-item"]}>
              <h3>Logradouro</h3>
              <TextField
                variant="filled"
                sx={{
                  margin: "0 0 1rem 0",
                }}
                onChange={(event) => {
                  setInputs({ ...inputs, logradouro: event.target.value });
                }}
                error={mensagemErro.logradouro.deuErro}
                onBlur={(e) => campoValido(inputs.logradouro, "logradouro")}
                helperText={mensagemErro.logradouro.mensagem}
                value={inputs.logradouro}
              ></TextField>
              <h3>Bairro</h3>
              <TextField
                sx={{
                  margin: "0 0 1rem 0",
                }}
                variant="filled"
                value={inputs.bairro}
                error={mensagemErro.bairro.deuErro}
                onBlur={(e) => campoValido(inputs.bairro, "bairro")}
                helperText={mensagemErro.bairro.mensagem}
                onChange={(event) => {
                  setInputs({ ...inputs, bairro: event.target.value });
                }}
              ></TextField>
            </div>
            <div className={style["endereco-item"]}>
              <h3>CEP</h3>
              <TextField
                variant="filled"
                error={mensagemErro.cep.deuErro}
                onBlur={(e) => campoValido(inputs.cep, "cep")}
                helperText={mensagemErro.cep.mensagem}
                onChange={(event) => {
                  setInputs({ ...inputs, cep: event.target.value });
                }}
                value={inputs.cep}
              ></TextField>
              <h3>Número</h3>
              <TextField
                variant="filled"
                error={mensagemErro.numero.deuErro}
                onBlur={(e) => campoValido(inputs.numero, "numero")}
                helperText={mensagemErro.numero.mensagem}
                onChange={(event) => {
                  setInputs({ ...inputs, numero: event.target.value });
                }}
                value={inputs.numero}
              ></TextField>
            </div>
          </div>
          <h2>Pagamento</h2>
          <h3>Chave pix</h3>
          <TextField
            variant="filled"
            className={style["input"]}
            error={mensagemErro.chavePix.deuErro}
            onBlur={(e) => campoValido(inputs.chavePix, "chavePix")}
            helperText={mensagemErro.chavePix.mensagem}
            onChange={(event) => {
              setInputs({ ...inputs, chavePix: event.target.value });
            }}
            value={inputs.chavePix}
          ></TextField>
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
