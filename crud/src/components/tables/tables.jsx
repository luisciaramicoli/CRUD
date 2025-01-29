import React, { useState, useEffect } from "react";
import { Button, Table, Spinner, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./table.module.css";

function TourismTable() {
  const [pontos, setPontos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPonto, setSelectedPonto] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [estados, setEstados] = useState([]);  // Estado para armazenar os estados

  // Carregar os pontos turísticos
  useEffect(() => {
    const fetchPontosTuristicos = async () => {
      try {
        const response = await fetch("http://localhost:3333/listar");
        const data = await response.json();
        if (data.sucesso) {
          const sortedPontos = data.dados.sort((a, b) => new Date(b.data_inclusao) - new Date(a.data_inclusao));
          setPontos(sortedPontos);
        } else {
          setError("Erro ao carregar pontos turísticos.");
        }
      } catch (err) {
        setError(`Erro ao carregar pontos turísticos: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    // Carregar estados
    const fetchEstados = async () => {
      try {
        const response = await fetch("http://localhost:3333/estados"); // Supondo que a API de estados esteja aqui
        const data = await response.json();
        if (data.sucesso) {
          setEstados(data.dados);  // Atribui os estados à variável 'estados'
        } else {
          setError("Erro ao carregar estados.");
        }
      } catch (err) {
        setError(`Erro ao carregar estados: ${err.message}`);
      }
    };

    fetchPontosTuristicos();
    fetchEstados();  // Chama a função para carregar os estados
  }, []);

  // Função de filtro
  const filterPontos = (pontos) => {
    return pontos.filter((ponto) => {
      const search = searchTerm.toLowerCase();
      return (
        ponto.nome.toLowerCase().includes(search) ||
        ponto.descricao.toLowerCase().includes(search) ||
        ponto.cidade.toLowerCase().includes(search) ||
        ponto.estado_nome.toLowerCase().includes(search)
      );
    });
  };

  // Paginação
  const filteredPontos = filterPontos(pontos);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPontos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPontos.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPonto(null);
  };

  const handleShowModal = (ponto) => {
    setSelectedPonto(ponto);
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    if (selectedPonto) {
      try {
        // Log do corpo da requisição
        console.log("Enviando dados para o backend:", {
          nome: selectedPonto.nome,
          descricao: selectedPonto.descricao,
          cidade: selectedPonto.cidade,
          estado_id: selectedPonto.estado_id, // Alterado para 'estado_id'
        });
  
        const response = await fetch(`http://localhost:3333/pontosTuristicos/${selectedPonto.ponto_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: selectedPonto.nome,
            descricao: selectedPonto.descricao,
            cidade: selectedPonto.cidade,
            estado_id: selectedPonto.estado_id, // Alterado para 'estado_id'
          }),
        });
  
        const data = await response.json();
        // Log do resultado da resposta
        console.log("Resposta da API:", data);
  
        if (data.sucesso) {
          // Atualiza a lista de pontos após salvar
          setPontos((prevPontos) =>
            prevPontos.map((ponto) =>
              ponto.ponto_id === selectedPonto.ponto_id ? { ...ponto, ...selectedPonto } : ponto
            )
          );
          handleCloseModal(); // Fecha o modal
        } else {
          setError("Erro ao salvar alterações.");
        }
      } catch (err) {
        setError(`Erro ao salvar alterações: ${err.message}`);
      }
    }
  };
  
  

  // Função para excluir o ponto turístico
  const deletePonto = async (ponto_id) => {
    if (window.confirm("Tem certeza que deseja excluir este ponto turístico?")) {
      try {
        const response = await fetch(`http://localhost:3333/pontosTuristicos/${ponto_id}`, {
          method: 'DELETE',
        });

        const data = await response.json();
        if (data.sucesso) {
          // Remove o ponto da lista local após a exclusão
          setPontos((prevPontos) => prevPontos.filter((ponto) => ponto.ponto_id !== ponto_id));
        } else {
          setError("Erro ao excluir o ponto turístico.");
        }
      } catch (err) {
        setError(`Erro ao excluir o ponto turístico: ${err.message}`);
      }
    }
  };

  return (
    <div id="tabela" className={styles.tabela}>
      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <>
          {/* Campo de busca */}
          <Form.Group controlId="searchTerm" className={styles.searchGroup}>
            <div className={styles.searchWrapper}>
              <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
              <Form.Control
                type="text"
                placeholder="Digite o nome, descrição ou localização"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchField}
              />
            </div>
          </Form.Group>

          <Table striped bordered hover className={styles.tourismTable}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((ponto) => (
                <tr key={ponto.ponto_id}>
                  <td>{ponto.nome}</td>
                  <td>{ponto.descricao}</td>
                  <td>{ponto.cidade}</td>
                  <td>{ponto.estado_nome}</td>
                  <td>{new Date(ponto.data_inclusao).toLocaleString()}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deletePonto(ponto.ponto_id)} // Chama a função de excluir
                      className={styles.actionButton}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleShowModal(ponto)} // Mostrar o modal para editar
                      className={styles.actionButton}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Paginação */}
          <div className={styles.pagination}>
            <Button
              variant="secondary"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className={styles.pageButton}
            >
              Primeira
            </Button>
            <Button
              variant="secondary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={styles.pageButton}
            >
              Anterior
            </Button>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                variant="secondary"
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
                className={styles.pageButton}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              variant="secondary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={styles.pageButton}
            >
              Próxima
            </Button>
            <Button
              variant="secondary"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={styles.pageButton}
            >
              Última
            </Button>
          </div>

          {/* Modal de Edição */}
          {selectedPonto && (
           <Modal show={showModal} onHide={handleCloseModal}>
           <Modal.Header closeButton>
             <Modal.Title>Editar Ponto Turístico</Modal.Title>
           </Modal.Header>
           <Modal.Body>
             <Form>
               <Form.Group controlId="formNome">
                 <Form.Label>Nome</Form.Label>
                 <Form.Control
                   type="text"
                   value={selectedPonto.nome}
                   onChange={(e) => setSelectedPonto({ ...selectedPonto, nome: e.target.value })}
                   className={styles.modalInput}
                 />
               </Form.Group>
         
               <Form.Group controlId="formDescricao">
                 <Form.Label>Descrição</Form.Label>
                 <Form.Control
                   type="text"
                   value={selectedPonto.descricao}
                   onChange={(e) => setSelectedPonto({ ...selectedPonto, descricao: e.target.value })}
                   className={styles.modalInput}
                 />
               </Form.Group>
         
               <Form.Group controlId="formCidade">
                 <Form.Label>Cidade</Form.Label>
                 <Form.Control
                   type="text"
                   value={selectedPonto.cidade}
                   onChange={(e) => setSelectedPonto({ ...selectedPonto, cidade: e.target.value })}
                   className={styles.modalInput}
                 />
               </Form.Group>
         
               <Form.Group controlId="formEstado">
  <Form.Label>Estado</Form.Label>
  <Form.Control
    as="select"
    value={selectedPonto.estado_id} // Aqui permanece o estado_id (ID numérico)
    onChange={(e) => setSelectedPonto({ ...selectedPonto, estado_id: e.target.value })} // No onChange, o valor enviado é o ID
    className={styles.modalSelect}
  >
    <option value="">Selecione um estado</option>
                               {estados.map((estado) => (
                                 <option key={estado.estado_id} value={estado.estado_id}>
                                   {estado.nome}
                                 </option>
                               ))}
  </Form.Control>
</Form.Group>




             </Form>
           </Modal.Body>
           <Modal.Footer>
             <Button variant="secondary" onClick={handleCloseModal}>
               Fechar
             </Button>
             <Button variant="primary" onClick={handleSaveChanges}>
               Salvar Alterações
             </Button>
           </Modal.Footer>
         </Modal>
          )}
        </>
      )}
    </div>
  );
}

export default TourismTable;
