import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaLock, FaEnvelope, FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./cadastro.module.css"; // Importando o CSS modular
import { Spin } from "antd";

const Cadastro = () => {
  const [formData, setFormData] = useState({ nome: "", email: "", password: "", confirmPassword: "", dataNascimento: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para alternar a visibilidade da senha
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Para a confirmação da senha
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificação dos campos obrigatórios
    if (!formData.nome || !formData.email || !formData.password || !formData.confirmPassword || !formData.dataNascimento) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Validação de senha
    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    // Validação de confirmação de senha
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3333/cadastrarusuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          senha: formData.password,
          dataNascimento: formData.dataNascimento,
        }),
      });

      const data = await response.json();

      if (response.ok && data.sucesso) {
        // Se o cadastro for bem-sucedido, redireciona para o login
        setError(""); // Limpa o erro
        navigate("/login");
      } else {
        setError(data.mensagem || "Erro ao realizar o cadastro. Tente novamente.");
      }
    } catch (err) {
      setError("Erro ao realizar o cadastro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.tudo}>
      <div className={styles.formContainer}>
        <div className={styles.info}>
          <form onSubmit={handleSubmit}>
            <div className={styles.seta}>
              <Link to="/" className={styles.link}>
                <FaArrowLeft className={styles.setaIcon} />
              </Link>
            </div>
            <div className={styles.Titulo}>Cadastro</div>

            <div className={styles.input}>
              <div className={styles.inputWithIcon}>
                <label htmlFor="nome" className={styles.label}>
                  Nome:
                </label>
                <input
                  className={styles.inputsenha}
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.input}>
              <div className={styles.inputWithIcon}>
                <FaEnvelope className={styles.icon} />
                <label htmlFor="email" className={styles.label}>
                  E-mail:
                </label>
                <input
                  className={styles.inputsenha}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.input}>
              <div className={styles.inputWithIcon}>
                <span
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer", marginLeft: "8px" }}
                >
                  {showPassword ? <FaEyeSlash className={styles.icon} /> : <FaEye className={styles.icon} />}
                </span>
                <label htmlFor="password" className={styles.label}>
                  Senha:
                </label>
                <input
                  className={styles.inputsenha}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.input}>
              <div className={styles.inputWithIcon}>
                <span
                  className={styles.togglePassword}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ cursor: "pointer", marginLeft: "8px" }}
                >
                  {showConfirmPassword ? <FaEyeSlash className={styles.icon} /> : <FaEye className={styles.icon} />}
                </span>
                <label htmlFor="confirmPassword" className={styles.label}>
                  Confirmar Senha:
                </label>
                <input
                  className={styles.inputsenha}
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.input}>
              <label htmlFor="dataNascimento" className={styles.label}>
                Data de Nascimento:
              </label>
              <input
                className={styles.inputsenha}
                type="date"
                id="dataNascimento"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                required
              />
            </div>

           

            {/* Link para login */}
            <div className={styles.linkCadastro}>
              <Link to="/login" className={styles.link}>
                Já tem uma conta? Faça login
              </Link>
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.input}>
              {!loading ? (
                <button type="submit">Cadastrar</button>
              ) : (
                <Spin />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
