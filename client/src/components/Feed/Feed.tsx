import { useEffect, useState } from "react";
import Comment from "../Comment/Comment";
import "./Feed.css";

function Feed() {
  // Définition de l'état pour stocker les publications
  interface Post {
    id: number;
    username: string;
    avatar: string;
    publication_date: string;
    content: string;
    stats: {
      comments: number;
      likes: number;
    };
  }

  const [posts, setPosts] = useState<Post[]>([]);

  // Récupérer les posts au chargement du composant
  useEffect(() => {
    fetch("http://localhost:3000/api/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des posts");
        }
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((error) =>
        console.error("Erreur lors du chargement des posts :", error),
      );
  }, []);

  return (
    <section className="feed">
      {posts.length === 0 ? (
        <p>Aucune publication pour le moment.</p>
      ) : (
        posts.map((post) => (
          <Comment
            key={post.id}
            username={post.username}
            avatar={post.avatar}
            time={post.publication_date}
            text={post.content}
            stats={post.stats} // Inclut le nombre de commentaires et de likes
          />
        ))
      )}
    </section>
  );
}

export default Feed;

/**
   * Exemple de données récupérées depuis une API
   * {
    "id": 1,
    "publication_date": "2025-02-03T19:18:38.000Z",
    "content": "J'aime aussi les burgers.",
    "user_id": 1,
    "name": "admin"
  },
   * Nous devons donc, faire en sorte que mon postRepository, me renvoie les données comme ci-dessous.
  
  Nous devons faire une jointure entre la table user, publication ainsi que le nombre de commentaires et de likes. dans une clé stats.
  {
			id: 1,
			username: "alice",
			avatar: "https://picsum.photos/50?random=1",
			time: "2024-01-21T10:00:00Z",
			text: "La vie est belle, mais les soldes sont encore mieux ! 😄",
			stats: {
				comments: 5,
				likes: 250,
			},
		},
   */
