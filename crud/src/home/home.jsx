import React, { useState } from "react";
import NavBar from "../components/nav/home";
import TourismTable from "../components/tables/tables";
import CadastroPonto from "../components/cadastro/cadastro";
import './home.css';
import Carousel from 'react-bootstrap/Carousel';

// Componente para o carrossel de imagens
function ImageCarousel() {
    return (
        <Carousel>
    <Carousel.Item>
        <img
            className="imagem"
            src="./1.jpg"
            alt="Primeira imagem"
        />
        
    </Carousel.Item>
    <Carousel.Item>
        <img
            className="imagem"
            src="./2.jpg"
            alt="Segunda imagem"
        />
       
    </Carousel.Item>
    <Carousel.Item>
        <img
            className="imagem"
            src="./3.jpg"
            alt="Terceira imagem"
        />
       
    </Carousel.Item>
</Carousel>

    );
}

function Home() {
    // Estado para controlar a visibilidade do modal
    const [showModal, setShowModal] = useState(false);

    // Função para abrir o modal
    const handleShowModal = () => setShowModal(true);

    // Função para fechar o modal
    const handleCloseModal = () => setShowModal(false);

    // Função para adicionar ponto (será definida conforme a lógica que você já possui)
    const addPonto = (novoPonto) => {
        // Sua lógica de adição de ponto aqui
        console.log(novoPonto);
    };

    return (
        <div>
            <NavBar />
            {/* Carrossel de imagens */}
            <ImageCarousel />
            
            <div className="tabela">
                <TourismTable />
            </div>
            <div className="botoes">
                <CadastroPonto
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                    addPonto={addPonto}
                />
            </div>
        </div>
    );
}

export default Home;
