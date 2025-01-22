import "./Connexion.css";
import { Link } from "react-router-dom";

function ConnexionPage() {
  return (
    <div className="container-connexion">
      <h2>Connexion</h2>
      <form>
        <div className="input-form">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="bob@leponge.fr" />
        </div>
        <div className="input-form">
          <label htmlFor="password">Mot de passe</label>
          <input type="password" name="password" placeholder="********" />
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
