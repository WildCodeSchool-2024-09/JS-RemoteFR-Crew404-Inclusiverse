import { FaRegCommentDots } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";
import "./Comment.css";

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

function Comment({ username, avatar, time, text, stats }: CommentProps) {
  return (
    <article className="comment">
      <header className="comment-header">
        <img
          className="avatar"
          src={avatar}
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
          <button type="button" aria-label={`J'aime (${stats.likes})`}>
            <FaRegThumbsUp />
            <span className="visually-hidden">
              {" "}
              {stats.likes} mentions j'aime
            </span>
          </button>
        </div>
      </footer>
    </article>
  );
}

export default Comment;
