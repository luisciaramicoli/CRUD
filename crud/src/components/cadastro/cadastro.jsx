import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";


function CadastroButton() {
  const [showModal, setShowModal] = useState(false);
  const [newPonto, setNewPonto] = useState({
    nome: "",
    descricao: "",
    localizacao: "",
    cidade: "",
    estado_id: "",
  });
  const [estados, setEstados] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(""); // Para exibir erros

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await fetch("http://localhost:3333/estados");
        const data = await response.json();
        if (data.sucesso) {
          setEstados(data.dados);
        } else {
          console.error("Erro ao carregar os estados");
        }
      } catch (err) {
        console.error("Erro: ", err.message);
      }
    };

    fetchEstados();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPonto({ ...newPonto, [name]: value });
  };

  const handleSave = async () => {
    if (!newPonto.nome || !newPonto.descricao || !newPonto.localizacao || !newPonto.cidade || !newPonto.estado_id) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    setIsSaving(true);
    setError(""); // Limpa o erro anterior
  
    try {
      const response = await fetch("http://localhost:3333/cadastrarPonto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPonto),
      });
  
      const responseText = await response.text();
      console.log(responseText);
  
      const data = JSON.parse(responseText);
  
      if (data.sucesso) {
        alert("Ponto turístico cadastrado com sucesso!");
        setShowModal(false);
      } else {
        setError("Erro ao cadastrar o ponto turístico. Tente novamente.");
      }
    } catch (err) {
      setError("Erro ao salvar ponto turístico: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Cadastrar Novo Ponto Turístico
      </Button>

      {error && <div className="alert alert-danger">{error}</div>}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Ponto Turístico</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={newPonto.nome}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formDescricao">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                name="descricao"
                value={newPonto.descricao}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formLocalizacao">
              <Form.Label>Localização</Form.Label>
              <Form.Control
                type="text"
                name="localizacao"
                value={newPonto.localizacao}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formCidade">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                type="text"
                name="cidade"
                value={newPonto.cidade}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formEstado">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                as="select"
                name="estado_id"
                value={newPonto.estado_id}
                onChange={handleInputChange}
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
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Salvando..." : "Salvar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CadastroButton;
