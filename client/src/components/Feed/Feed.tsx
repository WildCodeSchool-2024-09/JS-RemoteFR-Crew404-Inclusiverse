import Comment from "../Comment/Comment";
import "./Feed.css";

function Feed() {
  const fakeComments = [
    {
      id: 1,
      username: "alice",
      avatar: "https://picsum.photos/50?random=1",
      time: "1h",
      text: "La vie est belle, mais les soldes sont encore mieux ! 😄",
      stats: {
        comments: 5,
        likes: 250,
      },
    },
    {
      id: 2,
      username: "bob",
      avatar: "https://picsum.photos/50?random=2",
      time: "3h",
      text: `"Acheter maintenant, regretter plus tard" - Ma carte bancaire. 💳`,
      stats: {
        comments: 8,
        likes: 500,
      },
    },
    {
      id: 3,
      username: "charlie",
      avatar: "https://picsum.photos/50?random=3",
      time: "5h",
      text: "Je me demande si la 3e démarque sera encore mieux ? 🤔",
      stats: {
        comments: 2,
        likes: 100,
      },
    },
    {
      id: 4,
      username: "diana",
      avatar: "https://picsum.photos/50?random=4",
      time: "7h",
      text: "Ce pull était à -50% et pourtant... il est trop grand. 😭",
      stats: {
        comments: 0,
        likes: 34,
      },
    },
  ];

  return (
    <section className="feed">
      {fakeComments.map((comment) => (
        <Comment
          key={comment.id}
          username={comment.username}
          avatar={comment.avatar}
          time={comment.time}
          text={comment.text}
          stats={comment.stats}
        />
      ))}
    </section>
  );
}

export default Feed;
