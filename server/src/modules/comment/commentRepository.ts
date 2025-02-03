import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Comment = {
  id: number;
  publication_id: number;
  user_id: number;
  content: string;
  post_date?: string;
};

class CommentRepository {
  // Ajouter un commentaire
  async create(comment: Omit<Comment, "id" | "post_date">): Promise<number> {
    try {
      const [result] = await databaseClient.query<Result>(
        "INSERT INTO commentaire (publication_id, user_id, content) VALUES (?, ?, ?)",
        [comment.publication_id, comment.user_id, comment.content],
      );

      return result.insertId;
    } catch (error) {
      console.error("Error in create comment:", error);
      throw new Error("Unable to create comment");
    }
  }

  // Récupérer les commentaires d'une publication
  async getByPublication(publication_id: number): Promise<Comment[]> {
    try {
      const [rows] = await databaseClient.query<Rows>(
        "SELECT * FROM commentaire WHERE publication_id = ? ORDER BY post_date DESC",
        [publication_id],
      );

      return rows as Comment[];
    } catch (error) {
      console.error("Error in getByPublication:", error);
      throw new Error("Unable to retrieve comments");
    }
  }
}

export default new CommentRepository();
