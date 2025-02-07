import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

// Définition du type Post contenant les informations essentielles d'une publication et de son auteur + stats
type PostWithStats = {
  id: number;
  content: string;
  publication_date: Date;
  user_id: number;
  username: string;
  avatar: string;
  stats: {
    comments: number;
    likes: number;
  };
};

class PostRepository {
  // The C of CRUD - Create operation // Création d'un post
  async create(
    post: Omit<
      PostWithStats,
      "id" | "publication_date" | "username" | "avatar" | "stats"
    >
  ) {
    // Exécuter la requête SQL INSERT pour ajouter une nouvelle publication à la table "publication"
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO publication (content, user_id) VALUES (?, ?)",
      [post.content, post.user_id]
    );

    // Retourne l'ID de la publication nouvellement insérée
    return result.insertId;
  }

  // The Rs of CRUD - Read operations // Lecture d'un post spécifique avec stats (likes et comments)
  async read(id: number) {
    // Il faut récupérer toutes les informations de l'utilisateur qui a posté le message,
    // ainsi que le nombre de likes et de commentaires associés à cette publication.
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
          p.id, p.content, p.publication_date, 
          u.id AS user_id, u.name AS username, 
          COALESCE(u.avatar, 'default.jpg') AS avatar,
          COALESCE(COUNT(DISTINCT c.id), 0) AS comments,
          COALESCE(COUNT(DISTINCT l.id), 0) AS likes
       FROM publication p
       JOIN user u ON p.user_id = u.id
       LEFT JOIN commentaire c ON c.publication_id = p.id
       LEFT JOIN likes l ON l.publication_id = p.id
       WHERE p.id = ?
       GROUP BY p.id, u.id, u.name, u.avatar
       LIMIT 1`,
      [id]
    );

    return rows.length
      ? ({
          ...rows[0],
          stats: {
            comments: rows[0].comments,
            likes: rows[0].likes,
          },
        } as PostWithStats)
      : null;
  }

  // The Rs of CRUD - Read operations // Lecture de tous les posts avec stats
  async readAll() {
    /**
     * Il faut récupérer toutes les informations de l'utilisateur qui a posté le message ainsi que le message lui-même,
     * ainsi que le nombre total de likes et de commentaires par publication.
     */
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
          p.id, p.content, p.publication_date, 
          u.id AS user_id, u.name AS username, 
          COALESCE(u.avatar, 'default.jpg') AS avatar,
          COALESCE(COUNT(DISTINCT c.id), 0) AS comments,
          COALESCE(COUNT(DISTINCT l.id), 0) AS likes
       FROM publication p
       JOIN user u ON p.user_id = u.id
       LEFT JOIN commentaire c ON c.publication_id = p.id
       LEFT JOIN likes l ON l.publication_id = p.id
       GROUP BY p.id, u.id, u.name, u.avatar
       ORDER BY p.publication_date DESC`
    );

    return rows.map((post) => ({
      ...post,
      stats: {
        comments: post.comments,
        likes: post.likes,
      },
    })) as PostWithStats[];
  }
}

export default new PostRepository();
