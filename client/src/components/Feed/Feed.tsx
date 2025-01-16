import Comment from "../Comment/Comment";
import "./Feed.css";

function Feed() {
  const fakeComments = [
    {
      id: 1,
      username: "alice",
      handle: "@alice123",
      avatar: "https://picsum.photos/50?random=1",
      time: "1h",
      text: "La vie est belle, mais les soldes sont encore mieux ! 😄",
      link: "bit.ly/45dfgT",
      stats: {
        comments: 5,
        retweets: 12,
        likes: 250,
      },
    },
    {
      id: 2,
      username: "bob",
      handle: "@bob_the_dev",
      avatar: "https://picsum.photos/50?random=2",
      time: "3h",
      text: `"Acheter maintenant, regretter plus tard" - Ma carte bancaire. 💳`,
      link: "bit.ly/47TkLM",
      stats: {
        comments: 8,
        retweets: 20,
        likes: 500,
      },
    },
    {
      id: 3,
      username: "charlie",
      handle: "@charlie_brown",
      avatar: "https://picsum.photos/50?random=3",
      time: "5h",
      text: "Je me demande si la 3e démarque sera encore mieux ? 🤔",
      link: null,
      stats: {
        comments: 2,
        retweets: 3,
        likes: 100,
      },
    },
    {
      id: 4,
      username: "diana",
      handle: "@diana_style",
      avatar: "https://picsum.photos/50?random=4",
      time: "7h",
      text: "Ce pull était à -50% et pourtant... il est trop grand. 😭",
      link: null,
      stats: {
        comments: 0,
        retweets: 2,
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
          handle={comment.handle}
          avatar={comment.avatar}
          time={comment.time}
          text={comment.text}
          link={comment.link}
          stats={comment.stats}
        />
      ))}
    </section>
  );
}

export default Feed;
