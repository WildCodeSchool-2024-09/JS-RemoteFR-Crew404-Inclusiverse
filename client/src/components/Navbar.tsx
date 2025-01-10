import "./Navbar.css";

interface NavbarProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <nav className="navbar">
      {/* Section gauche */}
      <div className="navbar-left">
        <img
          src="public/images/logo_inclusiverse.png"
          alt="logo_inclusiverse"
          width={100}
          height={70}
        />
      </div>

      <div className="navbar-center">
        <button type="button" className="btn-home">
          Home
        </button>
      </div>

      <div className="navbar-right">
        <button type="button" className="btn-profile">
          Profile
        </button>
        <button type="button" className="btn-logout">
          Déconnexion
        </button>
        <button type="button" className="btn-darkmode" onClick={toggleDarkMode}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
