import React from "react";
import Header from "../elements/header/Header";
import style from "./Publicar.module.css";
function Publicar() {
  return (
    <div>
      <Header></Header>
      <main className={style["main"]}>
        <div className={style["roxo"]}></div>
        <h1>Fazer Publicação</h1>
        <form className={style["content"]}>
          <h2>Título</h2>
          <input className={style['input']}></input>
          <h2>Descrição</h2>
          <textarea></textarea>
          <h2>Quantas pessoas vão "rachar"?</h2>
          <input className={style['input']}></input>
          <h2>Preço total</h2>
          <input className={style['input']}></input>
          <h2>Preço dividido</h2>
          <input className={style['input']}></input>
          <h2>Contato</h2>
          <input className={style['input']}></input>
          <h2>Imagens</h2>
          <input type="file" accept="image/*"/>
          <h2>Endereço</h2>
          <div className={style['endereco']}>
            <div className={style['endereco-item']}>
              <h3>Estado</h3>
              <input></input>
              <h3>Cidade</h3>
              <input></input>
            </div>
            <div className={style['endereco-item']}>
              <h3>Logradouro</h3>
              <input></input>
              <h3>Bairro</h3>
              <input></input>
            </div>
            <div className={style['endereco-item']}>
              <h3>CEP</h3>
              <input></input>
              <h3>Número</h3>
              <input></input>
            </div>
          </div>
          <h2>Pagamento</h2>
          <h3>Chave pix</h3>
          <input className={style['input']}></input>
          <h3>Destinatário</h3>
          <input className={style['input']}></input>
          <input className={style['submit']} type="submit" value="Publicar"></input>
        </form>
      </main>
    </div>
  );
}

export default Publicar;
