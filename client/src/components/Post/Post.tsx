import { useState } from "react";
import "./Post.css";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { success } from "../../services/toast";

function Post({ handlePost }: { handlePost: () => void }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/api/posts", { content });
      success("Votre message a bien été publié !");
      handlePost();
      // Je nettoie l'input une fois soumis
      setContent("");
    } catch (error) {
      console.error("Erreur lors de la publication du message : ", error);
    }
  };

  return (
    <form className="post" onSubmit={handleSubmit}>
      <div className="post-header">
        <img
          src={`${import.meta.env.VITE_API_URL}/uploads/${user?.avatar}`}
          alt="Avatar de l'utilisateur"
          className="post-avatar"
        />

        <div className="post-input">
          <label htmlFor="post-content" className="visually-hidden">
            Écrivez votre message
          </label>
          <textarea
            id="post-content"
            name="post-content"
            className="post-content"
            placeholder="Quoi de neuf ?!"
            aria-label="Écrire un message"
            aria-describedby="post-instructions"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <p id="post-instructions" className="visually-hidden">
            Vous pouvez écrire et partager vos pensées ici.
          </p>
        </div>
      </div>

      <div className="post-footer">
        <button type="submit" aria-label="Publier votre message">
          Poster
        </button>
      </div>
    </form>
  );
}

export default Post;
