import { CgProfile } from "react-icons/cg";
import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

import "./Navbar.css";

function Navbar() {
  const { theme, handleThemeChange } = useTheme();
  return (
    <nav className="navbar">
      <img
        src="/images/logo_inclusiverse.png"
        alt="Logo d'Inclusiverse, représentant l'accessibilité et l'inclusivité"
        className="navbar-logo"
      />

      <Link
        to="/dashboard"
        type="button"
        className="btn home"
        aria-label="Accueil"
      >
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
          onClick={handleThemeChange}
          aria-label={
            theme === "light-mode"
              ? "Passer en mode clair"
              : "Passer en mode sombre"
          }
        >
          {theme === "light-mode" ? <IoSunny /> : <IoMoon />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
