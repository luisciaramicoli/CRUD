import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import styles from "./buttonEditar.module.css";

const ButtonEditar = ({ ponto, estados, onSave }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPonto, setSelectedPonto] = useState(ponto || null);
  const [error, setError] = useState("");

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPonto(ponto); // Reset para o estado inicial
  };

  const handleSaveChanges = async () => {
    if (selectedPonto) {
      try {
        const response = await fetch(
          `http://localhost:3333/pontosTuristicos/${selectedPonto.ponto_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nome: selectedPonto.nome,
              descricao: selectedPonto.descricao,
              cidade: selectedPonto.cidade,
              estado_id: selectedPonto.estado_id,
              localizacao: selectedPonto.localizacao,
              logradouro: selectedPonto.logradouro,
              cep: selectedPonto.cep,
              bairro: selectedPonto.bairro,
            }),
          }
        );

        const data = await response.json();
        if (data.sucesso) {
          if (onSave) onSave(selectedPonto); // Callback para atualizar lista na página principal
          handleCloseModal();
        } else {
          setError("Erro ao salvar alterações.");
        }
      } catch (err) {
        setError(`Erro ao salvar alterações: ${err.message}`);
      }
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShowModal}
        className={styles.actionButton}
      >
        <FontAwesomeIcon icon={faEdit} />
      </Button>

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
                  onChange={(e) =>
                    setSelectedPonto({
                      ...selectedPonto,
                      nome: e.target.value,
                    })
                  }
                  className={styles.modalInput}
                />
              </Form.Group>

              <Form.Group controlId="formDescricao">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedPonto.descricao}
                  onChange={(e) =>
                    setSelectedPonto({
                      ...selectedPonto,
                      descricao: e.target.value,
                    })
                  }
                  className={styles.modalInput}
                />
              </Form.Group>

              <Form.Group controlId="formCidade">
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedPonto.cidade}
                  onChange={(e) =>
                    setSelectedPonto({
                      ...selectedPonto,
                      cidade: e.target.value,
                    })
                  }
                  className={styles.modalInput}
                />
              </Form.Group>

              <Form.Group controlId="formCep">
                <Form.Label>CEP</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedPonto.cep}
                  onChange={(e) =>
                    setSelectedPonto({
                      ...selectedPonto,
                      cep: e.target.value,
                    })
                  }
                  className={styles.modalInput}
                />
              </Form.Group>

              <Form.Group controlId="formBairro">
                <Form.Label>Bairro</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedPonto.bairro}
                  onChange={(e) =>
                    setSelectedPonto({
                      ...selectedPonto,
                      bairro: e.target.value,
                    })
                  }
                  className={styles.modalInput}
                />
              </Form.Group>

              <Form.Group controlId="formLogradouro">
                <Form.Label>Logradouro</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedPonto.logradouro}
                  onChange={(e) =>
                    setSelectedPonto({
                      ...selectedPonto,
                      logradouro: e.target.value,
                    })
                  }
                  className={styles.modalInput}
                />
              </Form.Group>

              <Form.Group controlId="formEstado">
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedPonto.estado_id}
                  onChange={(e) =>
                    setSelectedPonto({
                      ...selectedPonto,
                      estado_id: e.target.value,
                    })
                  }
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
  );
};

export default ButtonEditar;
