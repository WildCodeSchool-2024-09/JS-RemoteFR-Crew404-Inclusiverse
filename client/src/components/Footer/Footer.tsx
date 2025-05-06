import { Link } from "react-router-dom";
import "./footer.css";
function Footer() {
  return (
    <footer className="footer">
      <p> InclusiVerse ©2025 </p>
      <div className="footer-links">
        <Link to="/about" type="button">
          À propos
        </Link>
        <Link to="!#" type="button">
          Conditions d'utilisation
        </Link>
        <Link to="!#" type="button">
          Contactez-Nous
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
