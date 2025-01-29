import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaLock, FaEnvelope, FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./login.module.css"; // Importando o CSS modular
import { Spin } from "antd";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para alternar a visibilidade da senha
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          senha: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.sucesso) {
        // Se o login for bem-sucedido, redireciona para a página inicial
        setError(""); // Limpa o erro
        navigate("/home");
      } else {
        setError(data.mensagem || "Erro ao fazer login. Tente novamente.");
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.tudo}>
      <div className={styles.formContainer}>
        <div className={styles.info}>
        <div className={styles.Titulo2}>Turismo</div>
<div className={styles.subTitulo}>
  <p>
    Bem-vindo ao <strong>Turismo</strong>, o seu portal para explorar o mundo!  
  </p>
</div>

        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.seta}>
            <Link to="/" className={styles.link}>
              <FaArrowLeft className={styles.setaIcon} />
            </Link>
          </div>
          <div className={styles.Titulo}>Login</div>

          <div className={styles.input}>
            <div className={styles.inputWithIcon}>
              <FaEnvelope className={styles.icon} />
              <label htmlFor="email" className={styles.label}>
                Email:
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
                type={showPassword ? "text" : "password"} // Alterna o tipo entre "text" e "password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
 {/* Link para cadastro */}
 <div className={styles.linkCadastro}>
            <Link to="/cadastro" className={styles.link}>
              Cadastrar-se
            </Link>
          </div>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.input}>
            {!loading ? (
              <button type="submit">Entrar</button>
            ) : (
              <Spin />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
