import react from "react";
import style from "./User-data.module.css";
import Header from "../elements/header/Header";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ShieldIcon from "@mui/icons-material/Shield";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
const Seguranca = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={style['seguranca-wrapper']}>
      <Header></Header>
      <main className={style.main}>
        <div className={style["roxo"]}></div>
        <div className={style["section-wrapper"]}>
          <section className={style["items"]}>
            <ul>
              <li>
                <a href="dadosDaConta">
                  <AssignmentIndIcon
                    sx={{
                      fontSize: "2rem",
                    }}
                  ></AssignmentIndIcon>{" "}
                  Dados da conta
                </a>
              </li>
              <li>
                <a href="seguranca">
                  <ShieldIcon
                    sx={{
                      fontSize: "2rem",
                    }}
                  ></ShieldIcon>
                  Segurança
                </a>
              </li>
            </ul>
          </section>
          <div className={style["content-wrapper"]}>
            <section className={style["content"]}>
              <h1>Segurança</h1>
              <div className={style["content-items"]}>
                <h2>Dados da conta</h2>
                <label for="email">Email</label>
                <input
                  id="email"
                  className={style["disabled"]}
                  disabled
                  name="email"
                  value={"robertogomes@gmail.com"}
                ></input>
                <label for="senha">Senha</label>
                <Input
                  className={style["disabled"]}
                  id="adornment-password"
                  type={showPassword ? "text" : "password"}
                  disabled
                  value={"123456"}
                  // remove the bottom outline
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  disableUnderline
                />
              </div>
            </section>
            <section className={style["content"]}>
              <div className={style["content-items"]}>
                <h2>Alterar senha</h2>
                <label for="nova-senha">Nova senha</label>
                <input
                  type="password"
                  name="nova-senha"
                  id="nova-senha"
                ></input>
                <label for="confirmar-senha">Confirmar Senha</label>
                <input
                  type="password"
                  id="confirmar-senha"
                  name="confirmar-senha"
                ></input>
                <button className={style["submit"]}>Alterar senha</button>
              </div>
            </section>
            <section className={style["content"]}>
              <div className={style["content-items"]}>
                <h2 className={style["danger"]}>Desativar Conta</h2>
                <label for="senha">Nova senha</label>
                <input type="password" name="senha" id="senha"></input>
                <label for="confirmar-senha">Confirmar Senha</label>
                <input
                  type="password"
                  id="confirmar-senha"
                  name="confirmar-senha"
                ></input>
                <label for="email">Email</label>
                <input type="email" id="email" name="email" />
                <div className={style['checkbox-div']}>
                <Checkbox></Checkbox><label>Estou ciente do que pode acontecer caso eu desative a minha conta</label>
                </div>
                <button className={style["danger-button"]}>Desativar</button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Seguranca;
