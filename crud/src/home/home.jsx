import React, { useState } from "react";
import NavBar from "../components/nav/home";
import TourismTable from "../components/tables/tables";
import CadastroPonto from "../components/cadastro/cadastro";
import styles from './home.module.css';

// Componente para o carrossel de imagens
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
            <div className={styles.Titulo}>Turismo</div>
            <div className={styles.subTitulo}> O site perfeito para você</div>
           
            <div className={styles.tabela}>
                <TourismTable />
            </div>
            
            <div className={styles.botoes}>
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
