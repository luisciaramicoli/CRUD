import React, { useState, useEffect } from "react";
import { Button, Table, Spinner, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import "./table.css";

function TourismTable() {
  const [pontos, setPontos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPonto, setSelectedPonto] = useState(null);

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

    fetchPontosTuristicos();
  }, []);

  // Função para excluir ponto turístico
  const deletePonto = async (ponto_id) => {
    if (!ponto_id) {
      setError("ID do ponto turístico inválido.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3333/pontosTuristicos/${ponto_id}`, { method: "DELETE" });
      const data = await response.json();
      if (data.sucesso) {
        setPontos(pontos.filter((ponto) => ponto.ponto_id !== ponto_id));
      } else {
        setError("Erro ao excluir ponto turístico.");
      }
    } catch (err) {
      setError(`Erro ao excluir ponto turístico: ${err.message}`);
    }
  };

  // Função para abrir o modal de edição
  const handleEdit = (ponto) => {
    setSelectedPonto(ponto);
    setShowModal(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPonto(null);
  };

  // Função para salvar as edições
  const handleSaveChanges = async () => {
    if (!selectedPonto) return;

    try {
      const response = await fetch(`http://localhost:3333/pontosTuristicos/${selectedPonto.ponto_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: selectedPonto.nome,
          descricao: selectedPonto.descricao,
          cidade: selectedPonto.cidade,
          estado_id: selectedPonto.estado_id,
          data_inclusao: selectedPonto.data_inclusao,
        }),
      });

      const data = await response.json();
      if (data.sucesso) {
        setPontos(pontos.map((ponto) => (ponto.ponto_id === selectedPonto.ponto_id ? selectedPonto : ponto)));
        setError("");
        handleCloseModal();
      } else {
        setError("Erro ao salvar alterações.");
      }
    } catch (err) {
      setError(`Erro ao salvar alterações: ${err.message}`);
    }
  };

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pontos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(pontos.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Pontos Turísticos</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <>
          <Table striped bordered hover>
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
                    <Button variant="danger" onClick={() => deletePonto(ponto.ponto_id)}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>{" "}
                    <Button variant="primary" onClick={() => handleEdit(ponto)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Paginação */}
          <div className="pagination">
            <Button
              variant="secondary"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              Primeira
            </Button>
            <Button
              variant="secondary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                variant="secondary"
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              variant="secondary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Próxima
            </Button>
            <Button
              variant="secondary"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
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
                    />
                  </Form.Group>

                  <Form.Group controlId="formDescricao">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedPonto.descricao}
                      onChange={(e) => setSelectedPonto({ ...selectedPonto, descricao: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group controlId="formCidade">
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedPonto.cidade}
                      onChange={(e) => setSelectedPonto({ ...selectedPonto, cidade: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group controlId="formEstado">
                    <Form.Label>Estado</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedPonto.estado_nome}
                      onChange={(e) => setSelectedPonto({ ...selectedPonto, estado_nome: e.target.value })}
                    />
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
