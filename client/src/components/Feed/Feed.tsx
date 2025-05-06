import { useEffect, useState } from "react";
import Comment from "../Comment/Comment";
import "./Feed.css";
import api from "../../services/api";
import { failure } from "../../services/toast";

function Feed({ isPost }: { isPost: boolean }) {
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
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await api.get("/api/posts");

      if (response.status !== 200) {
        failure("Oups, un probleme est survenu");
      }
      const allPost = response.data as Post[];

      setPosts(allPost);
    };
    fetchPosts();
  }, [isPost]);

  return (
    <section className="feed">
      {posts.length === 0 ? (
        <p>Aucune publication pour le moment.</p>
      ) : (
        posts.map((post) => (
          <Comment
            key={post.id}
            id={post.id}
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
