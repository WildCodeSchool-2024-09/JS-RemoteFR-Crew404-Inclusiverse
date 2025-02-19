import { useEffect, useState } from "react";
import { FaRegCommentDots, FaRegThumbsUp } from "react-icons/fa";
import "./Comment.css";
import api from "../../services/api";
import { failure, success } from "../../services/toast";

type CommentProps = {
  id: number;
  username: string;
  avatar: string;
  time: string;
  text: string;
  stats: {
    comments: number;
    likes: number;
  };
};

function Comment({ id, username, avatar, time, text, stats }: CommentProps) {
  const [updateStats, setUpdateStats] = useState(stats);
  const [, setMyLike] = useState<{ publication_id: number }[]>([]);
  const [userHasLiked, setUserHasLiked] = useState(false);

  // Récupérer les likes au chargement du composant
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likes = await api.get("/api/likes");
        const likesData = likes.data as { publication_id: number }[];
        setMyLike(likesData);

        // Vérifier si l'utilisateur a déjà liké ce post
        const hasLiked = likesData.some(
          (like: { publication_id: number }) => like.publication_id === id,
        );
        setUserHasLiked(hasLiked);
      } catch (error) {
        console.error("Erreur lors du chargement des likes", error);
      }
    };

    fetchLikes();
  }, [id]);

  const handleLike = async () => {
    try {
      if (userHasLiked) {
        await handleDislike();
        return;
      }

      const response = await api.post(`/api/posts/${id}/like`);

      if (response.status !== 200) {
        failure("Oups, un problème est survenu");
        return;
      }

      // Mettre à jour l'état des likes
      setUpdateStats((prev) => ({ ...prev, likes: prev.likes + 1 }));
      setUserHasLiked(true);
      success("Merci pour votre like !");
    } catch (error) {
      failure("Oups, un problème est survenu");
    }
  };

  const handleDislike = async () => {
    try {
      const response = await api.post(`/api/posts/${id}/dislike`);

      if (response.status !== 200) {
        failure("Oups, un problème est survenu");
        return;
      }

      // Mettre à jour l'état des likes
      setUpdateStats((prev) => ({ ...prev, likes: prev.likes - 1 }));
      setUserHasLiked(false);
      success("Like retiré !");
    } catch (error) {
      failure("Oups, un problème est survenu");
    }
  };

  return (
    <article className="comment">
      <header className="comment-header">
        <img
          className="avatar"
          src={`${import.meta.env.VITE_API_URL}/uploads/${avatar}`}
          alt={`Avatar de ${username}`}
          width="50"
          height="50"
        />
        <div className="user-info">
          <span className="username" id={`comment-username-${username}`}>
            {username}
          </span>
          <time className="time" dateTime={time}>
            · {new Date(time).toLocaleString("fr-FR")}
          </time>
        </div>
      </header>

      <div className="comment-body">
        <p aria-labelledby={`comment-username-${username}`}>{text}</p>
      </div>

      <footer className="comment-footer">
        <div className="group-btn-comment">
          <button type="button" aria-label={`Commenter (${stats.comments})`}>
            <FaRegCommentDots />
            <span className="visually-hidden">
              {" "}
              {stats.comments} commentaires
            </span>
          </button>
          <button
            type="button"
            aria-label={`J'aime (${updateStats.likes})`}
            onClick={handleLike}
            className={`like ${userHasLiked ? "liked" : ""}`}
          >
            <FaRegThumbsUp />{" "}
            <span className="nb_likes">{updateStats.likes}</span>
            <span className="visually-hidden">
              {" "}
              {updateStats.likes} mentions j'aime
            </span>
          </button>
        </div>
      </footer>
    </article>
  );
}

export default Comment;
