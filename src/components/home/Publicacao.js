import { useEffect } from "react";
import Header from "../elements/header/Header";
import style from "./Publicacao.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
function Publicacao(){
    const {id} = useParams();
    const [publicacao, setPublicacao] = useState({});
    const [imagens, setImagens] = useState([]);
    const [arrayImagens, setArrayImagens] = useState([
        "https://picsum.photos/500/300",
        "https://picsum.photos/500/300",
    ]);

    useEffect(() => {
        axios.get(`http://localhost:8080/publicacoes/${id}`).then((response) => {
            setPublicacao(response.data);
            console.log(response.data);
        });

        axios.get(`http://localhost:8080/imagens/publicacao/${id}`).then((response) => {
            setImagens(response.data);
            console.log(response.data);
        })
    }, []);

    return (
        <div>
            <Header/>
            <div className={style["roxo"]}></div>
            <div className={style['publication-data-wrapper']}>
            {publicacao.numPessoas != undefined && (
                <div className={style['img-wrapper']}>
                    <Swiper
                    style={{
                        "--swiper-pagination-color": "#fff",
                        "--swiper-navigation-color": "#fff",
                      }}
                    className={style['img-items']}
                     modules={[Navigation, Pagination, Scrollbar, A11y]}
                     slidesPerView={1}
                     navigation
                     pagination={{ clickable: true }}
                    >
                        {imagens.map(imagem =>(
                            <SwiperSlide>
                                <img key={imagem.id} className={style['img-slider']} src={"data:image/png;base64," + imagem.conteudo} alt="Foto de perfil"/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className={style['content-header']}>
                        <h1>{publicacao.titulo}</h1>
                        <div className={style['row']}>
                            <div className={style['row-item']}><h3>Vagas: {publicacao.numPessoas}</h3></div>
                            <div className={style['vl']}></div>
                            <div className={style['row-item']}><h3>R$ {publicacao.precoDividir.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} <span className={style['grey']}>/Mensal</span></h3></div>
                        </div>
                        <div className={style['margin']}>
                            <h3>Valor Original: R${publicacao.precoTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})} </h3>
                        </div>
                        <div className={style['row']}>
                            <button className={style['submit']}>Rachar</button>
                        </div>
                    </div>
                    <div className={style['content-footer']}>
                        <div className={style['margin']}>
                            <h3>Descrição</h3>
                            <p className={style['content-paragraph']}>{publicacao.descricao}</p>
                        </div>
                        <div className={style['margin']}>
                            <h3>Contato</h3>
                            <p className={style['content-paragraph']}>{publicacao.contato}</p>
                        </div>
                        <div className={style['margin']}>
                            <h3>Endereço</h3>
                            <p className={style['content-paragraph']}>{publicacao.logradouro}, CEP {publicacao.cep},  Número {publicacao.numero}, Bairro {publicacao.bairro}
                            , {publicacao.cidade} - {publicacao.estado}
                            </p>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    )
}

export default Publicacao;