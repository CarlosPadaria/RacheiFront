import React from "react";
import style from "./Header.module.css";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import GridViewIcon from "@mui/icons-material/GridView";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Menu, MenuItem, Drawer } from "@mui/material";
import logoSVG from "./logo_black_2.svg";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMouseEnter = (event) => {
    setAnchorEl(!anchorEl ? event.currentTarget : null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [state, setState] = useState({ left: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      role="presentation"
      className={style["list"]}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ul>
        <li>
          <a href="publicar">Publicar</a>
        </li>
        <li>
          <a href="/login">Gerenciar publicações</a>
        </li>
        <li>
          <a href="/login">Minhas publicações</a>
        </li>
        <li>
          <a href="/dadosDaConta">Perfil</a>
        </li>
        <li>
          <a href="/login">Favoritos</a>
        </li>
        <li>
          <a href="/login">Sair</a>
        </li>
      </ul>
    </div>
  );

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
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <nav>
        <div className={style["logo-menu"]}>
          <IconButton
            className={style["menu-button"]}
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon></MenuIcon>
          </IconButton>
          <a href="/">
            <img alt="Logo escrito Rachei" src={logoSVG}></img>
          </a>
        </div>
        <ul className={style['nav-list']}>
          <li>
            <a className={style["align-icons"]} href="/gerenciar">
              <ContentPasteIcon sx={{ fontSize: "2.25rem" }}></ContentPasteIcon>
              Gerenciar publicações
            </a>
          </li>
          <li>
            <a className={style["align-icons"]} href="/login">
              <GridViewIcon sx={{ fontSize: "2.25rem" }}></GridViewIcon>Minhas
              publicações
            </a>
          </li>
          <li>
            <button
              className={style["user-menu"]}
              aria-controls="menu"
              aria-haspopup="true"
              onClick={handleMouseEnter} // adicionando o evento onMouseEnter
            >
              <AccountCircleIcon
                sx={{ fontSize: "2.25rem" }}
              ></AccountCircleIcon>{" "}
              Roberto<ArrowDropDownIcon></ArrowDropDownIcon>
            </button>
            <Menu
              className={style["menu"]}
              id="menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              keepMounted
            >
              <MenuItem 
              component={Link} to="/dadosDaConta"
              >Perfil</MenuItem>
              <MenuItem>Favoritos</MenuItem>
              <MenuItem>Sair</MenuItem>
            </Menu>
          </li>
          <li>
            <a className={style['publicar-button']} href="publicar">
            <button className={style["button"]} >
              <AddIcon sx={{ fontSize: "2.25rem" }}></AddIcon> Publicar
            </button>
            </a>
          </li>
        </ul>
      </nav>
      <Drawer
        className={style["drawer"]}
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {" "}
        {list("left")}
      </Drawer>
    </header>
  );
}

export default Header;
