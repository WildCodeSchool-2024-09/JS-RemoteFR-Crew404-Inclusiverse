import { CgProfile } from "react-icons/cg";
import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

import "./Navbar.css";

function Navbar() {
  const { theme, handleThemeChange } = useTheme();
  const { user, handleLogout } = useAuth();
  return (
    <nav className="navbar">
      <img
        src="/images/logo_inclusiverse.png"
        alt="Logo d'Inclusiverse, représentant l'accessibilité et l'inclusivité"
        className="navbar-logo"
      />

      {user && (
        <>
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

            <button
              type="button"
              className="btn logout"
              aria-label="Se déconnecter"
              onClick={handleLogout}
            >
              <LuLogOut />
            </button>

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
        </>
      )}
      {user && user.role_id === 1 && (
        <Link
          to="/admin"
          type="button"
          className="btn admin"
          aria-label="Accéder à l'interface administrateur"
        >
          Admin
        </Link>
      )}
      {!user && (
        <div>
          <Link
            to="/inscription"
            type="button"
            className="btn signup"
            aria-label="S'inscrire"
          >
            S'inscrire
          </Link>
          <Link
            to="/"
            type="button"
            className="btn login"
            aria-label="Se connecter"
          >
            Se connecter
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
