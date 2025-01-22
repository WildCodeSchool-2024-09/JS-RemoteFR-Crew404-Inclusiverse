import { CgProfile } from "react-icons/cg";
import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";

import "./Navbar.css";

interface NavbarProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

function Navbar({ toggleDarkMode, isDarkMode }: NavbarProps) {
  return (
    <nav className="navbar">
      <img
        src="/images/logo_inclusiverse.png"
        alt="Logo d'Inclusiverse, représentant l'accessibilité et l'inclusivité"
        className="navbar-logo"
      />

      <Link to="/" type="button" className="btn home" aria-label="Accueil">
        Accueil
      </Link>

      <div className="group-buttons">
        <Link
          to="/profil"
          className="btn profile"
          aria-label="Accéder au profil utilisateur"
        >
          <CgProfile />
        </Link>

        <Link to="/login" className="btn logout" aria-label="Se déconnecter">
          <LuLogOut />
        </Link>

        <button
          type="button"
          className="btn darkmode"
          onClick={toggleDarkMode}
          aria-label={
            isDarkMode ? "Passer en mode clair" : "Passer en mode sombre"
          }
        >
          {isDarkMode ? <IoSunny /> : <IoMoon />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
