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

  const handleSubmit = (e) => {
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

    // Simulação de autenticação
    setTimeout(() => {
      if (formData.email === "user@example.com" && formData.password === "123456") {
        setError("");
        navigate("/home");
      } else {
        setError("Credenciais inválidas.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.tudo}>
      <div className={styles.formContainer}>
        <div className={styles.info}>
          <div className={styles.Titulo2}>Seguro</div>

          <div className={styles.divIcone}>
            <img src="/icone.png" alt="" className={styles.icone} />
          </div>
          <div className={styles.subTitulo}>
            <p>Bem-vindo ao Seguro, o seu gerenciador de seguros.</p>
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
                {showPassword ? <FaLock  className={styles.icon}/> : <FaEye  className={styles.icon}/>}
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
              {/* Ícone clicável para alternar visibilidade da senha */}
             
            </div>
          </div>

          
         

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.input}>
            {!loading ? <button type="submit">Entrar</button> : <Spin />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
