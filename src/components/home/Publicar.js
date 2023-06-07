import React from "react";
import Header from "../elements/header/Header";
import style from "./Publicar.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { TextField, Select, Menu } from "@mui/material";
import { MenuItem, Button } from "@mui/material";
import { NumericFormat } from "react-number-format";
import {useNavigate } from "react-router-dom";

function Publicar() {
  const [imagem, setImagem] = useState({});
  const [idPublicacao, setIdPublicacao] = useState(0);
  const [inputs, setInputs] = useState({
    precoDividir: 1,
    precoTotal: 1,
    numPessoas: 1,
  });
  const [saveImagens, setSaveImagens] = useState(false);
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [nomeEstadoSelecionado, setNomeEstadoSelecionado] = useState("");
  const [nomeCidadeSelecionada, setNomeCidadeSelecionada] = useState("");
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
  const navigate = useNavigate();

  const handleEstadoChange = (event) => {
    // Carrega as cidades com base no estado selecionado
    let estadoId = event.target.value;
    let estadoSelecionado = estados.find(estado => estado.id === estadoId);
    setNomeEstadoSelecionado(estadoSelecionado.nome);
    setEstadoSelecionado(estadoId);
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`
      )
      .then((response) => setCidades(response.data));
  };

  const handleCidadeChange = (event) => {
    let cidadeId = event.target.value;
    let cidade = cidades.find((cidade) => cidade.id === cidadeId);
  
    setCidadeSelecionada(cidadeId);
    setNomeCidadeSelecionada(cidade.nome);
  };

  useEffect(() => {
    // Carrega os estados no primeiro select
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => setEstados(response.data));
  }, []);

  const formatarCep = (valor) => {
    const cep = valor.replace(/\D/g, ""); // Remove tudo que não é número
    const cepFormatado = cep.replace(/^(\d{5})(\d)/, "$1-$2"); // Aplica a máscara XXXXX-XXX
    return cepFormatado;
  };
  const campoValido = (campo, nomeCampo) => {
    let newMensagemErro = { ...mensagemErro };
    if (campo === "" || campo === undefined || campo === null) {
      newMensagemErro[nomeCampo] = {
        mensagem: "Campo obrigatório",
        deuErro: true,
      };
      setMensagemErro(newMensagemErro);
      return false;
    } else {
      newMensagemErro[nomeCampo] = {
        mensagem: "",
        deuErro: false,
      };
      setMensagemErro(newMensagemErro);
      return true;
    }
  };

  useEffect(() => {
    if (saveImagens === true) {
      handleUpload();
    }
  }, [saveImagens]);

  const handleValidarCampos = (e) => {
    let mensagensErro = { ...mensagemErro};
    let valido = true;
    if (!campoValido(inputs.titulo, "titulo")) {
      mensagensErro.titulo = {
        mensagem: "Campo obrigatório",
        deuErro: true,
      };
      valido = false;
    }
    if (!campoValido(inputs.descricao, "descricao")) {
    //  alert("descricao")
      mensagensErro.descricao = {
        mensagem: "Campo obrigatório",
        deuErro: true,
      };
      valido = false;
    }
    if (!campoValido(inputs.numPessoas, "numPessoas")) {
      mensagensErro.numPessoas = {
        mensagem: "Campo obrigatório",
        deuErro: true,
      };
      
      valido = false;
    }
    if (!campoValido(inputs.precoTotal, "precoTotal")) {
      mensagensErro.precoTotal = {
        mensagem: "Campo obrigatório",
        deuErro: true,
      }
      valido = false;
    }
    if (!campoValido(inputs.precoDividir, "precoDividir")) {
      mensagensErro.precoDividir = {
        mensagem: "Campo obrigatório",
        deuErro: true,
      }
      valido = false;
    }
    if (!campoValido(inputs.contato, "contato")) {
      mensagensErro.contato = {
        mensagem: "Campo obrigatório",
        deuErro: true,
      }
      valido = false;
    }
    if (!campoValido(estadoSelecionado, "estado")) {
      mensagensErro.estado = {
        mensagem: "Campo obrigatório",
        deuErro: true,
      }
      valido = false;
    }
    if (!campoValido(cidadeSelecionada, "cidade")) {
      mensagensErro.cidade = {
        mensagem: "Campo obrigatório",
        deuErro: true,
      }
      valido = false;
    }
    if (!campoValido(inputs.logradouro, "logradouro")) {
      mensagensErro.logradouro = {
        mensagem: "Campo obrigatório",
        deuErro: true,
      }
      valido = false;
    }
    if (!campoValido(inputs.bairro, "bairro")) {
      mensagensErro.bairro = {
        mensagem: "Campo obrigatório",
        deuErro: true,
      }
      valido = false;
    }
    if (!campoValido(inputs.numero, "numero")) {
      mensagensErro.numero = {
        mensagem: "Campo obrigatório",
        deuErro: true,
      }
      valido = false;
    }
    if (!campoValido(inputs.cep, "cep")) {
      mensagensErro.cep = {
        mensagem: "Campo obrigatório",
        deuErro: true,
      }
      valido = false;
    }
    if (!campoValido(inputs.chavePix, "chavePix")) {
      mensagensErro.chavePix = {
        mensagem: "Campo obrigatório",
        deuErro: true,
      }
      valido = false;
    }
    if (imagem[0].name == undefined || imagem[0].name == "") {
      mensagensErro.imagem = {
        mensagem: "Campo obrigatório",
        deuErro: true,
      }
      valido = false;
    }
    setMensagemErro(mensagensErro);
    if(!valido){
      return false;
    }
  

    return true;
  };

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (handleValidarCampos()) {
      const formDataCadastro = new FormData();

      formDataCadastro.append("cidade", nomeCidadeSelecionada);
      formDataCadastro.append("estado", nomeEstadoSelecionado);
      formDataCadastro.append("logradouro", inputs.logradouro);
      formDataCadastro.append("bairro", inputs.bairro);
      formDataCadastro.append("cep", inputs.cep);
      formDataCadastro.append("titulo", inputs.titulo);
      formDataCadastro.append("descricao", inputs.descricao);
      formDataCadastro.append("numPessoas", inputs.numPessoas);
      formDataCadastro.append("precoTotal", inputs.precoTotal);
      formDataCadastro.append("contato", inputs.contato);
      formDataCadastro.append("precoDividir", inputs.precoDividir);
      formDataCadastro.append("idUsuario.id", user.id);
      formDataCadastro.append("numero", inputs.numero);
      formDataCadastro.append("chavePix", inputs.chavePix);
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
    }
  };

  const handleImagemSelecionada = (event) => {
    let files = event.target.files;
    if (files.length > 6) {
      event.target.value = null;
      setMensagemErro({
        ...mensagemErro,
        imagem: {
          mensagem: "Selecione no máximo 6 imagens",
          deuErro: true,
        },
      });
      setImagem(event.target.files);
    } else if (files.length < 1) {
      event.target.value = null;
      setMensagemErro({
        ...mensagemErro,
        imagem: {
          mensagem: "Selecione pelo menos uma imagem",
          deuErro: true,
        },
      });
      setImagem(event.target.files);
    } else {
      setMensagemErro({
        ...mensagemErro,
        imagem: {
          mensagem: "",
          deuErro: false,
        },
      });
      setImagem(event.target.files);
    }
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
          
          navigate('/');
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
            inputProps={{ maxLength: 100 }}
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
            inputProps={{ maxLength: 2000 }}
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
          <h2>Quantas pessoas vão dividir o imóvel ?</h2>
          <TextField
            value={inputs.numPessoas}
            type="text"
            InputProps={{
              inputProps: { max: 20, step: 1 },
              onInput: (event) => {
                // Máscara para o campo de número de pessoas
                let value = event.target.value.replace(/[^0-9]/g, ""); // Remove caracteres não numéricos
                if (value === "") {
                  // Se o campo estiver em branco, mantenha o valor vazio
                  event.target.value = "";
                } else {
                  // Se o campo contiver um valor, limite-o entre 1 e 20
                  value = Math.max(Math.min(parseInt(value), 20), 1);
                  event.target.value = value;
                }
              },
            }}
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
          <NumericFormat
            value={inputs.precoTotal}
            isAllowed={(values) => {
              const { floatValue } = values;
              return floatValue < 10001;
            }}
            prefix="R$"
            decimalSeparator=","
            valueIsNumericString={true}
            customInput={TextField}
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
            onValueChange={(values, sourceInfo) => {
              // console.log(inputs.precoTotal)
              setInputs({ ...inputs, precoTotal: values.floatValue });
            }}
            className={style["input"]}
          ></NumericFormat>
          <h2>Preço dividido</h2>
          <NumericFormat
            value={inputs.precoDividir}
            isAllowed={(values) => {
              const { floatValue } = values;
              return floatValue < 10001;
            }}
            prefix="R$"
            decimalSeparator=","
            valueIsNumericString={true}
            customInput={TextField}
            error={mensagemErro.precoDividir.deuErro}
            onBlur={(e) => campoValido(inputs.precoDividir, "precoDividir")}
            helperText={mensagemErro.precoDividir.mensagem}
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
            onValueChange={(values, sourceInfo) => {
              // console.log(inputs.precoTotal)
              setInputs({ ...inputs, precoDividir: values.floatValue });
            }}
            className={style["input"]}
          ></NumericFormat>
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
            inputProps={{ maxLength: 200 }}
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
            inputProps={{
              accept: "image/*",
              multiple: true,
            }}
            onChange={handleImagemSelecionada}
            onBlur={handleImagemSelecionada}
            error={mensagemErro.imagem.deuErro}
            helperText={mensagemErro.imagem.mensagem}
          ></TextField>
          <h2>Endereço</h2>
          <div className={style["endereco"]}>
            <div className={style["endereco-item"]}>
              <h3>Estado</h3>
              <div className={style["select-wrapper"]}>
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
                    <MenuItem key={estado.id} value={estado.id}>
                      {estado.nome}
                    </MenuItem>
                  ))}
                </Select>
                <p className={style["error"]}>{mensagemErro.estado.mensagem}</p>
              </div>
              <h3>Cidade</h3>
              <div className={style["select-wrapper"]}>
                <Select
                  className={style["select"]}
                  value={cidadeSelecionada}
                  onChange={handleCidadeChange}
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
                <p className={style["error"]}>{mensagemErro.cidade.mensagem}</p>
              </div>
            </div>
            <div className={style["endereco-item"]}>
              <h3>Logradouro</h3>
              <TextField
                variant="filled"
                sx={{
                  margin: "0 0 1rem 0",
                }}
                inputProps={{ maxLength: 100 }}
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
                inputProps={{ maxLength: 64 }}
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
                inputProps={{ maxLength: 9 }}
                onBlur={(e) => campoValido(inputs.cep, "cep")}
                helperText={mensagemErro.cep.mensagem}
                onChange={(event) => {
                  const cepFormatado = formatarCep(event.target.value); // Formata o valor do CEP
                  setInputs({ ...inputs, cep: cepFormatado }); // Atualiza o estado com o CEP formatado
                }}
                value={inputs.cep}
              ></TextField>
              <h3>Número</h3>
              <TextField
                variant="filled"
                error={mensagemErro.numero.deuErro}
                inputProps={{ maxLength: 10 }}
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
            inputProps={{ maxLength: 100 }}
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
