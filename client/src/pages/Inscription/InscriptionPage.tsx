import "./Inscription.css";
import { Link } from "react-router-dom";

function InscriptionPage() {
  return (
    <div className="container-inscription">
      <h2>Inscription</h2>
      <form>
        <div className="input-form">
          <label htmlFor="lastname">Nom</label>
          <input type="text" name="lastname" placeholder="Potter" />
        </div>
        <div className="input-form">
          <label htmlFor="firstname">Prénom</label>
          <input type="text" name="firstname" placeholder="Harry" />
        </div>
        <div className="input-form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="harrypotter@poudlard.moldu"
          />
        </div>
        <div className="input-form">
          <label htmlFor="password">Mot de passe</label>
          <input type="password" name="password" placeholder="********" />
        </div>
        <button type="button" className="btn signup" aria-label="Inscription">
          Créer un compte
        </button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        Vous avez déjà un compte ? <Link to="/connexion">Connectez-vous</Link>
      </p>
    </div>
  );
}

export default InscriptionPage;
