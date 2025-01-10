import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Feed from "./components/Feed";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false); // État pour gérer le thème global

  // Basculer entre clair et sombre
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      {" "}
      {/* Applique la classe globale */}
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <main className="container">
        <h1>InclusiVerse</h1>
        <Feed />
      </main>
      <Footer />
    </div>
  );
}

export default App;
