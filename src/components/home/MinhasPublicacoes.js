
import Header from "../elements/header/Header";
import style from "./Home.module.css";
import { useAuth } from "../../AuthContext";
import { Navigate } from "react-router-dom";

function MinhasPublicacoes() {
  return (
    <div className={style['minhasPublicacoes-wrapper']}>
      <Header></Header>
      <main className={style["main"]}>
        <div className={style["roxo"]}></div>
        <div className={style['content-wrapper']}>
          <div className={style['content']}>
           <h1>Minhas Publicações</h1>
           </div>
        </div>
      </main>
    </div>
  );
}

export default MinhasPublicacoes;
