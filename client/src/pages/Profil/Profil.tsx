import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import api from "../../services/api";
import type { UserType } from "../../types/User";
import "./Profil.css";
import { failure, info, success } from "../../services/toast";

function Profil() {
  const data = useLoaderData() as UserType;

  const [avatar, setAvatar] = useState<File | string>(data.avatar);
  const [preview, setPreview] = useState("");

  // Initialisation des données de l'utilisateur
  const [user, setUser] = useState({
    name: data.name,
    email: data.email,
    biography: data.biography,
    avatar: data.avatar,
  });

  // Initialisation des données du mot de passe
  const [passwordData, setPasswordData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Permet de gérer le changement de l'avatar
  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    /**
     * Si le champ est un champ de mot de passe, on met à jour le state
     */
    if (
      name === "password" ||
      name === "newPassword" ||
      name === "confirmPassword"
    ) {
      setPasswordData((prev) => ({ ...prev, [name]: value }));
    } else {
      // Sinon, on met à jour le state de l'utilisateur
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const fd = new FormData();
      /**
       * On vérifie si l'utilisateur a modifié son avatar, son nom, son email ou sa biographie
       */
      let updateProfile = false;
      let updatePassword = false;

      // On vérifie si l'avatar est une instance de Files
      if (avatar instanceof File) {
        // Si oui, on l'ajoute à la FormData
        fd.append("avatar", avatar);
        updateProfile = true;
      }

      // On vérifie si l'utilisateur a modifié son nom, son email ou sa biographie
      if (
        user.name !== data.name ||
        user.email !== data.email ||
        user.biography !== data.biography
      ) {
        // Si oui, on ajoute les données à la FormData
        fd.append("user", JSON.stringify(user));
        updateProfile = true;
      }

      // On vérifie si l'utilisateur a modifié son mot de passe
      if (
        passwordData.password ||
        passwordData.newPassword ||
        passwordData.confirmPassword
      ) {
        // On vérifie si l'utilisateur a rempli tous les champs du mot de passe
        if (
          !passwordData.password ||
          !passwordData.newPassword ||
          !passwordData.confirmPassword
        ) {
          failure("Veuillez remplir tous les champs du mot de passe.");
          return;
        }

        // On vérifie si le nouveau mot de passe et la confirmation sont identiques
        if (passwordData.newPassword !== passwordData.confirmPassword) {
          failure("Les mots de passe ne correspondent pas.");
          return;
        }

        // On vérifie si l'ancien mot de passe est différent du nouveau mot de passe
        const passwordPayload = {
          password: passwordData.password,
          newPassword: passwordData.newPassword,
          email: user.email,
        };

        await api.put("/api/me/password", passwordPayload);
        updatePassword = true;
      }

      // Si tout est bon, on envoie la requête
      if (updateProfile) {
        await api.put("/api/me", fd);
      }
      // Si la mise à jour du profil ou du mot de passe a été effectuée, on affiche un message de succès
      if (updateProfile || updatePassword) {
        success("Mise à jour effectuée avec succès !");
      } else {
        info("Aucune modification détectée.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      failure("Une erreur est survenue.");
    }
  };

  return (
    <section className="profil-container">
      <h2>Informations du profil</h2>
      <div className="profil-content">
        <div className="profil-avatar">
          {preview ? (
            <img src={preview} alt="Avatar de l'utilisateur" />
          ) : (
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${data.avatar}`}
              alt="Avatar de l'utilisateur"
            />
          )}

          <label htmlFor="avatar-upload" className="sr-only">
            Changer votre avatar
          </label>
          <input
            onChange={handleAvatar}
            type="file"
            accept=".jpg, .jpeg, .png"
            id="avatar-upload"
            aria-describedby="avatar-info"
          />
          <small id="avatar-info">Formats acceptés : JPG, PNG</small>
        </div>

        <form onSubmit={handleSubmit} className="profil-form">
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
            <label htmlFor="biography">Description</label>
            <textarea
              onChange={handleChange}
              name="biography"
              id="biography"
              value={user.biography}
            />
          </div>
          <div>
            <label htmlFor="old-password">Ancien mot de passe</label>
            <input
              onChange={handleChange}
              type="password"
              id="old-password"
              name="password"
            />
          </div>
          <div>
            <label htmlFor="new-password">Nouveau mot de passe</label>
            <input
              onChange={handleChange}
              type="password"
              id="new-password"
              name="newPassword"
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
              name="confirmPassword"
            />
          </div>

          <button
            type="submit"
            id="update"
            aria-label="Mettre à jour vos informations"
          >
            Mettre à jour
          </button>
        </form>
      </div>
    </section>
  );
}

export default Profil;
