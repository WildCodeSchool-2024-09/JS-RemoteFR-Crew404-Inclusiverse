import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { failure, success } from "../../services/toast";

import "./Inscription.css";
import api from "../../services/api";

function InscriptionPage() {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
  });

  const [viewPassword, setViewPassword] = useState("password");

  const handleViewPassword = () => {
    if (viewPassword === "password") {
      setViewPassword("text");
    } else {
      setViewPassword("password");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await api.post("/api/register", register);
      success("Inscription réussie !");
      navigate("/");
    } catch (error) {
      console.error(error);
      failure("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="container-inscription">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-form">
          <label htmlFor="lastname">Nom</label>
          <input
            type="text"
            name="lastname"
            onChange={handleChange}
            placeholder="Doe"
          />
        </div>
        <div className="input-form">
          <label htmlFor="firstname">Prénom</label>
          <input
            type="text"
            name="firstname"
            onChange={handleChange}
            placeholder="Jane"
          />
        </div>
        <div className="input-form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="jane.doe@provider.com"
          />
        </div>
        <div className="group-password">
          <div className="input-form">
            <label htmlFor="password">Mot de passe</label>
            <input
              type={viewPassword}
              name="password"
              onChange={handleChange}
            />
          </div>
          <button onClick={handleViewPassword} type="button">
            {viewPassword === "password" ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>
        <button type="submit" className="btn signup" aria-label="Inscription">
          Créer un compte
        </button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        Vous avez déjà un compte ? <Link to="/">Connectez-vous</Link>
      </p>
    </div>
  );
}

export default InscriptionPage;
