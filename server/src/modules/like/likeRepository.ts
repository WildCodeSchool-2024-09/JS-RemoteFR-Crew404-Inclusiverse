import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

class LikeRepository {
  // Ajouter ou retirer un like
  async toggleLike(publication_id: number, user_id: number): Promise<boolean> {
    try {
      const [existing] = await databaseClient.query<Rows>(
        "SELECT id FROM likes WHERE publication_id = ? AND user_id = ?",
        [publication_id, user_id],
      );

      if (existing.length > 0) {
        await databaseClient.query(
          "DELETE FROM likes WHERE publication_id = ? AND user_id = ?",
          [publication_id, user_id],
        );
        return false;
      }
      await databaseClient.query<Result>(
        "INSERT INTO likes (publication_id, user_id) VALUES (?, ?)",
        [publication_id, user_id],
      );
      return true;
    } catch (error) {
      console.error("Error in toggleLike:", error);
      throw new Error("Unable to toggle like");
    }
  }

  // Compter le nombre de likes d'une publication
  async countLikes(publication_id: number): Promise<number> {
    try {
      const [rows] = await databaseClient.query<Rows>(
        "SELECT COUNT(*) as likeCount FROM likes WHERE publication_id = ?",
        [publication_id],
      );
      return rows[0].likeCount;
    } catch (error) {
      console.error("Error in countLikes:", error);
      throw new Error("Unable to count likes");
    }
  }
}

export default new LikeRepository();
