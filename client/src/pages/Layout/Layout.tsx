import { Outlet } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "../../App.css";
import "./Layout.css";

function App() {
  const { theme } = useTheme();
  return (
    <div className={theme === "dark-mode" ? "dark-mode" : "light-mode"}>
      {/* Applique la classe globale */}
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
