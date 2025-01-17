import "./Inscription.css";
import { Link } from "react-router-dom";

function InscriptionPage() {
  return (
    <div className="containerinscription">
      <h2>Inscription</h2>
      <form>
        <input type="text" placeholder="Nom" />
        <input type="text" placeholder="Prénom" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Mot de passe" />
        <Link to="/inscription">
          <button type="button" className="btn signup" aria-label="Inscription">
            Créer un compte
          </button>
        </Link>
      </form>
      <p>
        Vous avez déjà un compte ?{" "}
        <a href="pas_encore_de_page_connection">Connectez-vous</a>
      </p>
    </div>
  );
}

export default InscriptionPage;
