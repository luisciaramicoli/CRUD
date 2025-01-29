import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";

function CadastroPonto() {
  const [showModal, setShowModal] = useState(false);
  const [newPonto, setNewPonto] = useState({
    nome: "",
    descricao: "",
    localizacao: "",
    cidade: "",
    estado_id: "",
    logradouro: "",
    cep: "",
    bairro: "",
  });
  const [estados, setEstados] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await fetch("http://localhost:3333/estados");
        const data = await response.json();
        if (data.sucesso) {
          setEstados(data.dados);
        } else {
          setError("Erro ao carregar os estados");
        }
      } catch (err) {
        setError("Erro ao carregar os estados: " + err.message);
      }
    };

    fetchEstados();
  }, []);

  // Função para buscar os dados do endereço pelo CEP
  const buscarEnderecoPorCEP = async (cep) => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setNewPonto((prevState) => ({
            ...prevState,
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado_id: estados.find((estado) => estado.sigla === data.uf)?.estado_id || "", // Achar o estado pelo sigla
          }));
        } else {
          setError("CEP inválido");
        }
      } catch (err) {
        setError("Erro ao buscar o CEP: " + err.message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPonto({ ...newPonto, [name]: value });

    if (name === "cep") {
      buscarEnderecoPorCEP(value); // Chama a função de busca quando o CEP mudar
    }
  };

  const handleSave = async () => {
    if (
      !newPonto.nome ||
      !newPonto.descricao ||
      !newPonto.localizacao ||
      !newPonto.cidade ||
      !newPonto.estado_id ||
      !newPonto.logradouro ||
      !newPonto.cep
    ) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setIsSaving(true);
    setError(""); 

    try {
      const response = await fetch("http://localhost:3333/cadastrarPonto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPonto),
      });

      const data = await response.json();

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
                isInvalid={!newPonto.nome && error}
              />
              <Form.Control.Feedback type="invalid">Este campo é obrigatório.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formDescricao">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                name="descricao"
                value={newPonto.descricao}
                onChange={handleInputChange}
                isInvalid={!newPonto.descricao && error}
              />
              <Form.Control.Feedback type="invalid">Este campo é obrigatório.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formLocalizacao">
              <Form.Label>Localização</Form.Label>
              <Form.Control
                type="text"
                name="localizacao"
                value={newPonto.localizacao}
                onChange={handleInputChange}
                isInvalid={!newPonto.localizacao && error}
              />
              <Form.Control.Feedback type="invalid">Este campo é obrigatório.</Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group controlId="formCEP">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                type="text"
                name="cep"
                value={newPonto.cep}
                onChange={handleInputChange}
                isInvalid={!newPonto.cep && error}
              />
              <Form.Control.Feedback type="invalid">Este campo é obrigatório.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formCidade">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                type="text"
                name="cidade"
                value={newPonto.cidade}
                onChange={handleInputChange}
                isInvalid={!newPonto.cidade && error}
              />
              <Form.Control.Feedback type="invalid">Este campo é obrigatório.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBairro">
              <Form.Label>Bairro</Form.Label>
              <Form.Control
                type="text"
                name="bairro"
                value={newPonto.bairro}
                onChange={handleInputChange}
                isInvalid={!newPonto.bairro && error}
              />
              <Form.Control.Feedback type="invalid">Este campo é obrigatório.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formLogradouro">
              <Form.Label>Logradouro</Form.Label>
              <Form.Control
                type="text"
                name="logradouro"
                value={newPonto.logradouro}
                onChange={handleInputChange}
                isInvalid={!newPonto.logradouro && error}
              />
              <Form.Control.Feedback type="invalid">Este campo é obrigatório.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEstado">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                as="select"
                name="estado_id"
                value={newPonto.estado_id}
                onChange={handleInputChange}
                isInvalid={!newPonto.estado_id && error}
              >
                <option value="">Selecione um estado</option>
                {estados.map((estado) => (
                  <option key={estado.estado_id} value={estado.estado_id}>
                    {estado.nome}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">Este campo é obrigatório.</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Salvando..." : "Salvar"}
            {isSaving && <Spinner animation="border" size="sm" />}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CadastroPonto;
