import { FaHouseUser } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";

import "./Navbar.css";

interface NavbarProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

function Navbar({ toggleDarkMode, isDarkMode }: NavbarProps) {
  return (
    <nav className="navbar">
      <img src="/images/logo_inclusiverse.png" alt="logo_inclusiverse" />

      <button type="button" className="btn home">
        Home
      </button>

      <div className="group-buttons">
        <button type="button" className="btn profile" aria-label="Profile">
          <FaHouseUser />
        </button>

        {/* Lien vers la page d'inscription */}

        <button type="button" className="btn logout" aria-label="Logout">
          <LuLogOut />
        </button>

        <button type="button" className="btn darkmode" onClick={toggleDarkMode}>
          {isDarkMode ? <IoSunny /> : <IoMoon />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
