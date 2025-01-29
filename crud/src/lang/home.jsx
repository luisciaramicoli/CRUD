import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./home.module.css";
import AOS from "aos";
import "aos/dist/aos.css"; // Importação do CSS da AOS
import { FaUmbrellaBeach, FaPlane, FaMapMarkedAlt, FaHotel } from "react-icons/fa";

import { FaRobot, FaLaptopCode, FaChartLine, FaBuilding } from "react-icons/fa";

function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Inicializa o AOS
    AOS.init({ duration: 1000 }); // Ajuste o tempo conforme necessário

    // Atualiza o estado de scroll
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.page}>
      {/* Primeira seção */}
      <div className={styles.primeiro} data-aos="fade-up">
        <div className={styles.Titulo}>
          Simplifique sua gestão empresarial com tecnologia de ponta
          <p className={styles.subTitulo}>
            Transforme sua empresa com soluções inteligentes de gestão administrativa
          </p>
          <div className={styles.botoes}>
            <button
              className={styles.botao}
              onClick={() => {
                const contatoElement = document.getElementById("contato");
                if (contatoElement) {
                  contatoElement.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Entre em contato
            </button>

            <Link to="/login" className={styles.link}>
              <button className={styles.botao}>Login</button>
            </Link>
          </div>
        </div>
      </div>

      <section className={styles.destinos} id="destinos" data-aos="fade-up">
        <h2 className={styles.titulo2}>Destinos Populares</h2>
        <div className={styles.cardsContainer}>
          <div className={styles.card} data-aos="zoom-in">
            <FaUmbrellaBeach className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Praias Paradisíacas</h3>
            <p className={styles.cardDescription}>
              Aproveite as praias mais deslumbrantes do mundo, com águas cristalinas e paisagens inesquecíveis.
            </p>
          </div>

          <div className={styles.card} data-aos="zoom-in">
            <FaPlane className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Cidades Históricas</h3>
            <p className={styles.cardDescription}>
              Descubra a riqueza cultural e histórica de destinos que marcaram épocas.
            </p>
          </div>

          <div className={styles.card} data-aos="zoom-in">
            <FaMapMarkedAlt className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Aventura e Natureza</h3>
            <p className={styles.cardDescription}>
              Explore trilhas, montanhas e florestas, conectando-se à natureza de forma única.
            </p>
          </div>
        </div>
      </section>

     {/* Avaliações */}
     <section className={styles.avaliacoes} data-aos="fade-up">
        <h2 className={styles.sectionTitle}>O que Nossos Viajantes Dizem</h2>
        <div className={styles.cardsContainer}>
          <div className={styles.card} data-aos="flip-left">
            <p className={styles.cardDescription}>
              "Minha experiência foi simplesmente maravilhosa! Cada detalhe da viagem foi bem planejado e as paisagens eram de tirar o fôlego. Recomendo muito!"
            </p>
            <h4 className={styles.cardAuthor}>- Marina S.</h4>
          </div>

          <div className={styles.card} data-aos="flip-left">
            <p className={styles.cardDescription}>
              "A equipe foi muito atenciosa e as opções de destino eram incríveis. Já estou planejando minha próxima viagem com eles!"
            </p>
            <h4 className={styles.cardAuthor}>- Carlos A.</h4>
          </div>
        </div>
      </section>
      {/* Funcionamento */}
      <div className={styles.funcionamento} data-aos="fade-up">
        <h2 className={styles.titulo3}>Como funciona</h2>
        <div className={styles.imgContainer}>
          <img
            src="./tela.png"
            alt="Imagem exemplo"
            className={styles.img}
          />
          <div className={styles.text}>
            <h3 className={styles.tituloText}>Interface intuitiva e poderosa</h3>
            <p>
              Transforme a maneira como você visualiza suas viajens.
            </p>
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <footer className={`${styles.rodape} ${styles.rodapeBackground}`} id="contato" data-aos="fade-up">
        <h3 className={styles.contato}>Entre em contato</h3>
        <div className={styles.infoContato}>
          <p>Email: turismo@gmail.com.br</p>
          <p>Telefone: (14) 997547353</p>
        </div>
        <div className={styles.redesSociais}>
          <p>Siga-nos nas redes sociais:</p>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>{" "}
          |{" "}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>{" "}
          |{" "}
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
        <div className={styles.direitosAutorais}>
          <p>&copy; 2025 Turismo Tecnologia. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
