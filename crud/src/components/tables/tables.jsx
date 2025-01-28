import React, { useState, useEffect } from "react";
import { Button, Table, Spinner } from "react-bootstrap";
import "./table.css";

function TourismTable() {
  const [pontos, setPontos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [error, setError] = useState(""); // Para mostrar erros

  // Carregar os pontos turísticos
  useEffect(() => {
    const fetchPontosTuristicos = async () => {
      try {
        const response = await fetch("http://localhost:3333/listar");
        const data = await response.json();
        if (data.sucesso) {
          const sortedPontos = data.dados.sort((a, b) => new Date(b.data_inclusao) - new Date(a.data_inclusao));

          setPontos(sortedPontos); // Apenas define os pontos, sem precisar associar o estado
        } else {
          setError("Erro ao carregar pontos turísticos.");
        }
      } catch (err) {
        setError("Erro ao carregar pontos turísticos: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPontosTuristicos();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pontos.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(pontos.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2>Pontos Turísticos</h2>

      {error && <div className="alert alert-danger">{error}</div>} {/* Exibe erro */}

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
              </tr>
            </thead>
            <tbody>
              {currentItems.map((ponto) => (
                <tr key={ponto.ponto_id}>
                  <td>{ponto.nome}</td>
                  <td>{ponto.descricao}</td>
                  <td>{ponto.cidade}</td>
                  <td>{ponto.estado_nome}</td> {/* Exibe o nome do estado vindo da API */}
                  <td>{new Date(ponto.data_inclusao).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="pagination">
            {/* Botões de página */}
  
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
          </div>
        </>
      )}
    </div>
  );
}

export default TourismTable;
