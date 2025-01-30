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
            <div className={styles.instrucoesContainer}>
                <h1>Instruções</h1>
                <p>
                    Bem-vindo à nossa plataforma de pontos turísticos! Aqui você pode explorar informações detalhadas sobre diversos locais turísticos, facilitar o processo de pesquisa e obter mais detalhes conforme necessário. Abaixo estão as principais funcionalidades que você pode aproveitar:
                </p>
                <ul>
                    <li><strong>Busca:</strong> Utilize o campo de pesquisa para encontrar pontos turísticos específicos. Você pode buscar por nome, descrição, cidade ou estado.</li>
                    <li><strong>Visualização detalhada:</strong> Ao clicar em um ponto turístico, você verá mais informações sobre o local, como descrição, cidade, estado, bairro, logradouro e a data de inclusão no sistema.</li>
                    <li><strong>Exclusão de pontos turísticos:</strong> Se desejar, você pode excluir um ponto turístico diretamente da lista, clicando no ícone de exclusão ao lado de cada item. Lembre-se de confirmar a exclusão antes de prosseguir.</li>
                    <li><strong>Paginação:</strong> Como a lista de pontos turísticos pode ser longa, a página está dividida em várias páginas para facilitar a navegação. Use os botões de navegação para avançar, voltar ou selecionar diretamente a página desejada.</li>
                    <li><strong>Ordenação por data:</strong> Os pontos turísticos são listados em ordem cronológica, com os mais recentes aparecendo primeiro.</li>
                    <li><strong>Considerações importantes:</strong> Após realizar qualquer alteração, como excluir, editar ou cadastrar dados, é recomendável atualizar a página para garantir que as informações mais recentes sejam exibidas corretamente.</li>

                </ul>
                <p>
                    Aproveite a plataforma para explorar, aprender e gerenciar as informações de forma eficiente. Se tiver alguma dúvida, entre em contato com nossa equipe de suporte.
                </p>
            </div>

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
