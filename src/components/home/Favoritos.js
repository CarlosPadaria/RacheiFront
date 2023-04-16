import React from "react";
import Header from "../elements/header/Header";
import style from "./Home.module.css";

function Favoritos() {
  return (
    <div className={style['favoritos-wrapper']}>
      <Header></Header>
      <main className={style["main"]}>
        <div className={style["roxo"]}></div>
        <div className={style['content-wrapper']}>
          <div className={style['content']}>
           <h1>Favoritos</h1>
           </div>
        </div>
      </main>
    </div>
  );
}

export default Favoritos;
