import React from "react";
import Header from "../elements/header/Header";
import style from "./User-data.module.css";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ShieldIcon from '@mui/icons-material/Shield';
const DadosDaConta = () => {
  return (
    <div>
      <Header></Header>
      <main>
        <div className={style["roxo"]}></div>
        <div className={style["section-wrapper"]}>
          <section className={style["items"]}>
            <ul>
              <li>
                <a href="dadosDaConta"><AssignmentIndIcon
                sx={{
                    fontSize: "2rem",
                }}
                ></AssignmentIndIcon> Dados da conta</a>
              </li>
              <li>
                <a href="seguranca"
                
                ><ShieldIcon
                
                sx={{
                    fontSize: "2rem",
                }}></ShieldIcon>Segurança</a>
              </li>
            </ul>
          </section>
          <div className={style['content-wrapper']}>
          <section className={style["content"]}>
            <h1>Meu Perfil</h1>
            <div className={style["content-items"]}>
                <h2>Dados da conta</h2> 
                <label placeholder="Nome de usuário" for="nome">Nome de usuário</label>
                <input id="nome" name="nome" value={'Roberto'}></input>
                <label for="cpf">CPF</label>
                <input className={style['disabled']} id="cpf" name="cpf" disabled value={'123.456.789.12'}></input>
                <button className={style['submit']}>Salvar Alterações</button>
            </div>
            
          </section>
          
          </div>
        </div>
      </main>
    </div>
  );
};

export default DadosDaConta;
