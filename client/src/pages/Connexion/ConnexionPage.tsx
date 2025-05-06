import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Connexion.css";
import api from "../../services/api";
import { failure, success } from "../../services/toast";
import type { UserType } from "../../types/User";

function ConnexionPage() {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post<UserType>("/api/login", login);
      handleLogin(response.data);
      success(`Bienvenue ${response.data.name} !`);
      navigate("/dashboard");
    } catch (error) {
      failure("Erreur lors de la connexion");
    }
  };

  return (
    <div className="container-connexion">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="xyz@provider.com"
          />
        </div>
        <div className="input-form">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="********"
          />
        </div>
        <button type="submit" className="btn login" aria-label="Connexion">
          Se connecter
        </button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        Vous n'avez pas encore de compte ?{" "}
        <Link to="/inscription">Inscrivez-vous</Link>
      </p>
    </div>
  );
}

export default ConnexionPage;
