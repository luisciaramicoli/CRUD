import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./home.module.css";
import AOS from "aos";
import "aos/dist/aos.css"; // Importação do CSS da AOS

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

      {/* Benefícios */}
      <div className={styles.beneficio} data-aos="fade-up">
        <h2 className={styles.titulo2}>Benefícios</h2>
        <div className={styles.cardsContainer}>
          <div className={`${styles.card} ${styles.cardBackground}`} data-aos="zoom-in">
            <FaRobot className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Automação de dados</h3>
            <p className={styles.cardDescription}>
              Automatize processos repetitivos, economize tempo e minimize erros. Nossa solução de automação de dados permite que sua empresa se concentre no que realmente importa.
            </p>
          </div>

          <div className={`${styles.card} ${styles.cardBackground}`} data-aos="zoom-in">
            <FaLaptopCode className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Tecnologia</h3>
            <p className={styles.cardDescription}>
              Nossa plataforma oferece recursos tecnológicos avançados para melhorar a gestão da sua empresa.
            </p>
          </div>

          <div className={`${styles.card} ${styles.cardBackground}`} data-aos="zoom-in">
            <FaChartLine className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Visualização</h3>
            <p className={styles.cardDescription}>
              Tenha uma visão clara e detalhada dos dados da sua empresa, facilitando decisões rápidas e assertivas para o crescimento do seu negócio.
            </p>
          </div>
        </div>
      </div>

      {/* Avaliações */}
      <div className={styles.avaliacoes} data-aos="fade-up">
        <h2 className={styles.titulo3}>O que dizem nossos clientes</h2>
        <div className={styles.cardsContainerEmpresa}>
          <div className={`${styles.cardEmpresa} ${styles.cardBackground}`} data-aos="flip-left">
            <div className={styles.cardHeader}>
              <FaBuilding className={styles.cardIconEmpresa} />
              <h3 className={styles.cardTitleEmpresa}>ETEC</h3>
            </div>
            <p className={styles.cardDescriptionEmpresa}>
              "Nossa experiência com a plataforma tem sido incrível! A interface é intuitiva, e os recursos tecnológicos avançados realmente transformaram nossa gestão. Agora, conseguimos otimizar processos de maneira eficiente e sem complicações. Recomendamos a todos que buscam inovação e praticidade para suas empresas!"
            </p>
          </div>
        </div>
      </div>

      {/* Funcionamento */}
      <div className={styles.funcionamento} data-aos="fade-up">
        <h2 className={styles.titulo3}>Como funciona</h2>
        <div className={styles.imgContainer}>
          <img
            src="https://res.cloudinary.com/dkmn1nbet/image/upload/v1734204356/fpyfuftmm2ktjjiixn2x.png"
            alt="Imagem exemplo"
            className={styles.img}
          />
          <div className={styles.text}>
            <h3 className={styles.tituloText}>Interface intuitiva e poderosa</h3>
            <p>
              Transforme a maneira como você gerencia seu negócio com tecnologia que simplifica processos e potencializa resultados.
            </p>
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <footer className={`${styles.rodape} ${styles.rodapeBackground}`} id="contato" data-aos="fade-up">
        <h3 className={styles.contato}>Entre em contato</h3>
        <div className={styles.infoContato}>
          <p>Email: tccadms223@gmail.com.br</p>
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
          <p>&copy; 2024 SAT Tecnologia. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
