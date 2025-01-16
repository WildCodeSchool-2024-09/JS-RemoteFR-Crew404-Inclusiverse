import { FaRegCommentDots } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";
import "./Comment.css";

type CommentProps = {
  username: string;
  avatar: string;
  time: string;
  text: string;
  stats: {
    comments: number;
    likes: number;
  };
};

function Comment({ username, avatar, time, text }: CommentProps) {
  return (
    <div className="comment">
      <div className="comment-header">
        <img className="avatar" src={avatar} alt={username} />
        <div className="user-info">
          <span className="username">{username}</span>
          <span className="time">· {time}</span>
        </div>
      </div>
      <div className="comment-body">
        <p>{text}</p>
      </div>
      <div className="comment-footer">
        <div className="group-btn-comment">
          <button type="button" aria-label="Commenter">
            <FaRegCommentDots />
          </button>
          <button type="button" aria-label="J'aime">
            <FaRegThumbsUp />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
