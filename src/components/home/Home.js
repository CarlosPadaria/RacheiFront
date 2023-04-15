import React from "react";
import Header from "../elements/header/Header";
import style from "./Home.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";

function Home() {
  return (
    <div>
      <Header></Header>
      <main className={style["main"]}>
        <div className={style["roxo"]}></div>
        <div className={style["searchbar"]}>
          <input placeholder="Pequise por estado ou cidade ex: Santa Catarina, Florianópolis etc..."></input>
          <IconButton
          className={style["search-icon"]}
            sx={{
              className: style["search-icon"],
              borderRadius: "0px 41.5px 41.5px 0px",
              backgroundColor: "#5f4bb6",
              height: "3.0rem",
              padding: "2rem",
              width: "10%",
              '&:hover': {
                backgroundColor: "#433582",
              }
            }}
          >
            <SearchIcon
              sx={{
                fontSize: "32px",
                color: "#fff",
              }}
            ></SearchIcon>
          </IconButton>
        </div>
        <div className={style['content-wrapper']}>
          <div className={style['content']}>
           <h1>Principais Publicações</h1>
           </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
