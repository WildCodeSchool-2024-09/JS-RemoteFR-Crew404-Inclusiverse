import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <section className="not-found">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">
        Oups ! La page que vous recherchez semble introuvable.
      </p>
      <Link to="/" className="not-found-link">
        Retour à l'accueil
      </Link>
    </section>
  );
}

export default NotFound;
