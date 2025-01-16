import "./Post.css";
function Post() {
  return (
    <section className="post">
      <div className="post-header">
        <img src="https://picsum.photos/200" alt="avatar" />
        <textarea className="post-content" placeholder="Quoi de neuf ?!" />
      </div>
      <div className="post-footer">
        <button type="submit">Poster</button>
      </div>
    </section>
  );
}

export default Post;
