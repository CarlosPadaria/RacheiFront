import React from "react";
import style from "./Header.module.css";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import GridViewIcon from "@mui/icons-material/GridView";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Menu, MenuItem, MenuList, Drawer } from "@mui/material";

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
        <li><a>Gerenciar publicações</a></li>
        <li><a>Minhas publicações</a></li>
        <li><a>Perfil</a></li>
        <li><a>Favoritos</a></li>
        <li><a>Sair</a></li>
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

      <nav>
        <div className={style['logo-menu']}>
          <button className={style['menu-button']} onClick={toggleDrawer("left", true)}>
            <MenuIcon ></MenuIcon>
          </button>
          <a href="/">
            <img src={require("./logo_black_2.png")}></img>
          </a>
        </div>
        <div className={style["nav"]}>
          <div>
            <a className={style["align-icons"]} href="/">
              <ContentPasteIcon sx={{ fontSize: "2.25rem" }}></ContentPasteIcon>
              Gerenciar publicações
            </a>
          </div>
          <div>
            <a className={style["align-icons"]} href="/login">
              <GridViewIcon sx={{ fontSize: "2.25rem" }}></GridViewIcon>Minhas
              publicações
            </a>
          </div>
          <div>
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
