import { useState } from "react";
import "./Profil.css";

function Profil() {
  const [user, setUser] = useState({
    name: "Tom",
    email: "derrick@police.fr",
    password: "***********",
    confirmPassword: "***********",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <section className="profil-container">
      <h2>Informations du profil</h2>
      <div className="profil-content">
        <div className="profil-avatar">
          <img
            src="https://picsum.photos/200/300?random=1"
            alt="Avatar de l'utilisateur"
          />
          <label htmlFor="avatar-upload" className="sr-only">
            Changer votre avatar
          </label>
          <input
            type="file"
            id="avatar-upload"
            aria-describedby="avatar-info"
          />
          <small id="avatar-info">Formats acceptés : JPG, PNG</small>
        </div>

        <form>
          <div>
            <label htmlFor="name">Nom</label>
            <input
              onChange={handleChange}
              type="text"
              id="name"
              name="name"
              aria-required="true"
              value={user.name}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              value={user.email}
              disabled
            />
          </div>
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              aria-required="true"
              value={user.password}
              required
            />
          </div>
          <div>
            <label htmlFor="confirm-password">
              Confirmation du mot de passe
            </label>
            <input
              onChange={handleChange}
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={user.confirmPassword}
              aria-required="true"
              required
            />
          </div>

          <button
            type="submit"
            aria-label="Supprimer définitivement votre compte"
          >
            Supprimer le compte
          </button>
        </form>
      </div>
    </section>
  );
}

export default Profil;
