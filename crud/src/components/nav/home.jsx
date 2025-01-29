import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './home.module.css'; // Importando o arquivo de estilos

function Home() {
    return (
        <Navbar className={styles.fundo} variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#home" className={styles.titulo}>Turismo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link className={styles.link} href="./home">Tabela</Nav.Link>
                        <Nav.Link className={styles.link} href="./mapa">Mapa</Nav.Link>
                        <Nav.Link className={styles.link} href="./">Sair</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Home;
