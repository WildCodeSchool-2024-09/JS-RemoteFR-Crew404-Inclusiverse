import "./Connexion.css";
import { Link } from "react-router-dom";

function ConnexionPage() {
  return (
    <div className="containerconnexion">
      <h2>Connexion</h2>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Mot de passe" />
        <button type="submit" className="btn login" aria-label="Connexion">
          Se connecter
        </button>
      </form>
      <p>
        Vous n'avez pas encore de compte ?{" "}
        <Link to="/inscription">Inscrivez-vous</Link>
      </p>
    </div>
  );
}

export default ConnexionPage;
