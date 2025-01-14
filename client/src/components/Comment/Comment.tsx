import { FaRegComment, FaRegHeart, FaRetweet } from "react-icons/fa";
import "./Comment.css";

type CommentProps = {
  username: string;
  handle: string;
  avatar: string;
  time: string;
  text: string;
  link: string | null;
  stats: {
    comments: number;
    retweets: number;
    likes: number;
  };
};

function Comment({
  username,
  handle,
  avatar,
  time,
  text,
  link,
  stats,
}: CommentProps) {
  return (
    <div className="comment">
      <div className="comment-header">
        <img className="avatar" src={avatar} alt={username} />
        <div className="user-info">
          <span className="username">{username}</span>
          <span className="user-handle">{handle}</span>
          <span className="time">· {time}</span>
        </div>
      </div>
      <div className="comment-body">
        <p>{text}</p>
        {link && (
          <a href="!#" className="link">
            📢 {link}
          </a>
        )}
      </div>
      <div className="comment-footer">
        <button type="button">
          <FaRegComment />
          <span>{stats.comments}</span>
        </button>
        <button type="button">
          <FaRetweet />
          <span>{stats.retweets}</span>
        </button>
        <button type="button">
          <FaRegHeart />
          <span>{stats.likes}</span>
        </button>
      </div>
    </div>
  );
}

export default Comment;
