import { FaRegCommentDots } from "react-icons/fa";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import "./Post.css";
function Post() {
  return (
    <section className="post">
      <div className="post-header">
        <img src="https://picsum.photos/200" alt="avatar" />
        <textarea className="post-content" placeholder="Quoi de neuf ?!" />
      </div>
      <div className="post-footer">
        <div className="group-btn">
          <button type="button" aria-label="Commenter">
            <FaRegCommentDots />
          </button>
          <button type="button" aria-label="J'aime">
            <FaRegThumbsUp />
          </button>
          <button type="button" aria-label="Je n'aime pas">
            <FaRegThumbsDown />
          </button>
        </div>
        <button type="submit">Poster</button>
      </div>
    </section>
  );
}

export default Post;
