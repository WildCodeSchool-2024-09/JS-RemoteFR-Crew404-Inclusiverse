import "./Post.css";

function Post() {
  return (
    <form className="post">
      <div className="post-header">
        <img
          src="https://picsum.photos/200"
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
