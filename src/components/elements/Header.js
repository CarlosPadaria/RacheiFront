import React from "react";
import style from "./Header.module.css";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import { Menu, MenuItem, MenuList } from "@mui/material";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMouseEnter = (event) => {
    setAnchorEl(!anchorEl ? event.currentTarget : null);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <header className={style["header"]}>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
        rel="stylesheet"
      ></link>

      <nav>
        <div>
          <a href="/">
            <img src={require("./logo_black.png")}></img>
          </a>
        </div>
        <div className={style['nav']}>
          <div>
            <a href="/">Gerenciar publicações</a>
          </div>
          <div>
            <a href="/login">Minhas publicações</a>
          </div>
          <div>
            <button
              className={style["user-menu"]}
              aria-controls="menu"
              aria-haspopup="true"
              onMouseOver={handleMouseEnter} // adicionando o evento onMouseEnter

            >
              <AccountCircleIcon
                sx={{ fontSize: "2.25rem" }}
              ></AccountCircleIcon>{" "}
              Roberto Carlos <ArrowDropDownIcon></ArrowDropDownIcon>
            </button>
            <Menu
              className={style["menu"]}
              id="menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              keepMounted
            >
              <MenuItem>Perfil</MenuItem>
              <MenuItem>Favoritos</MenuItem>
              <MenuItem>Sair</MenuItem>
            </Menu>
          </div>
          <div>
            <button className={style["button"]}>
              <AddIcon sx={{ fontSize: "2.25rem" }}></AddIcon> Publicar
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
