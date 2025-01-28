import React, { useState } from "react";
import NavBar from "../components/nav/home";
import TourismTable from "../components/tables/tables";
import CadastroPonto from "../components/cadastro/cadastro";
import './home.css';

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
            <div className="tabela">
                <TourismTable />
            </div>
            <CadastroPonto
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                addPonto={addPonto}
            />
        </div>
    );
}

export default Home;
