import React, { useState } from "react";
import NavBar from "../components/nav/home";
import Mapa from "../components/mapa/mapa";

// Componente para o carrossel de imagens

function MapaTela() {
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
           
            <Mapa/>
        </div>
    );
}

export default MapaTela;
