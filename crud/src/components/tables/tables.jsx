import React, { useState, useEffect } from "react";
import { Button, Table, Spinner, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt,faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./table.module.css";
import ButtonEditar from "../editar/editar";

function TourismTable() {
  const [pontos, setPontos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [estados, setEstados] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null); // Estado para controlar as linhas expandidas

  // Carregar os pontos turísticos e estados
  useEffect(() => {
    const fetchPontosTuristicos = async () => {
      try {
        const response = await fetch("http://localhost:3333/listar");
        const data = await response.json();
        if (data.sucesso) {
          const sortedPontos = data.dados.sort(
            (a, b) => new Date(b.data_inclusao) - new Date(a.data_inclusao)
          );
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

    const fetchEstados = async () => {
      try {
        const response = await fetch("http://localhost:3333/estados");
        const data = await response.json();
        if (data.sucesso) {
          setEstados(data.dados);
        } else {
          setError("Erro ao carregar estados.");
        }
      } catch (err) {
        setError(`Erro ao carregar estados: ${err.message}`);
      }
    };

    fetchPontosTuristicos();
    fetchEstados();
  }, []);

  // Filtrar pontos turísticos
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

  // Excluir ponto turístico
  const deletePonto = async (ponto_id) => {
    if (window.confirm("Tem certeza que deseja excluir este ponto turístico?")) {
      try {
        const response = await fetch(
          `http://localhost:3333/pontosTuristicos/${ponto_id}`,
          { method: "DELETE" }
        );
        const data = await response.json();
        if (data.sucesso) {
          setPontos((prevPontos) =>
            prevPontos.filter((ponto) => ponto.ponto_id !== ponto_id)
          );
        } else {
          setError("Erro ao excluir o ponto turístico.");
        }
      } catch (err) {
        setError(`Erro ao excluir o ponto turístico: ${err.message}`);
      }
    }
  };

  // Função para alternar a exibição das informações adicionais
  const toggleRowDetails = (ponto_id) => {
    setExpandedRow(expandedRow === ponto_id ? null : ponto_id);
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

          {/* Mensagem de "Nenhum resultado encontrado" */}
          {filteredPontos.length === 0 && searchTerm && (
            <div className={styles.noResultsMessage}>
              Nenhum ponto turístico encontrado para sua busca.
            </div>
          )}


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
                <React.Fragment key={ponto.ponto_id}>
                  <tr onClick={() => toggleRowDetails(ponto.ponto_id)}>
                    <td>{ponto.nome}</td>
                    <td>{ponto.descricao}</td>
                    <td>{ponto.cidade}</td>
                    <td>{ponto.estado_nome}</td>
                    <td>{new Date(ponto.data_inclusao).toLocaleString()}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => deletePonto(ponto.ponto_id)}
                        className={styles.actionButton}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                      <ButtonEditar ponto={ponto} estados={estados} />
                    </td>
                  </tr>

                {/* Linha com mais informações */}
                {expandedRow === ponto.ponto_id && (
                    <tr>
                      <td colSpan="6">
                        <div className={styles.informacoesPonto}>
                          <h1>Informações sobre {ponto.nome}</h1>
                          <p><span className={styles.infoLabel}>Descrição:</span> <span className={styles.infoValue}>{ponto.descricao}</span></p>
                          <p><span className={styles.infoLabel}>Cidade:</span> <span className={styles.infoValue}>{ponto.cidade}</span></p>
                          <p><span className={styles.infoLabel}>Estado:</span> <span className={styles.infoValue}>{ponto.estado_nome}</span></p>
                          <p><span className={styles.infoLabel}>CEP:</span> <span className={styles.infoValue}>{ponto.cep}</span></p>
                          <p><span className={styles.infoLabel}>Bairro:</span> <span className={styles.infoValue}>{ponto.bairro}</span></p>
                          <p><span className={styles.infoLabel}>Logradouro:</span> <span className={styles.infoValue}>{ponto.logradouro}</span></p>
                          <p><span className={styles.infoLabel}>Data de Inclusão:</span> <span className={styles.infoValue}>{new Date(ponto.data_inclusao).toLocaleString()}</span></p>
                          
                          {/* Botão para fechar */}
                          <button 
                            onClick={() => setExpandedRow(null)} // Fecha a linha quando o botão for clicado
                            className={styles.closeButton}
                          >
                            Fechar
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}

                 
                </React.Fragment>
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
        </>
      )}
    </div>
  );
}

export default TourismTable;
