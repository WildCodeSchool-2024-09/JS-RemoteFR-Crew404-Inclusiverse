import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Post = {
  content: string;
  user_id: number;
};

class PostRepository {
  // The C of CRUD - Create operation
  async create(post: Omit<Post, "id">) {
    // Execute the SQL INSERT query to add a new post to the "post" table
    const [result] = await databaseClient.query<Result>(
      "insert into publication (content, user_id) values (?, ?)",
      [post.content, post.user_id],
    );

    // Return the ID of the newly inserted post
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Il faut récupérer toutes les informations de l'utilisateur qui a posté le message ainsi que le message lui-même.
    // Il faut donc faire une jointure entre la table publication et la table user à la condition que publication.user_id = user.id
    const [rows] = await databaseClient.query<Rows>(
      "Select * from publication where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the post
    return rows[0] as Post;
  }

  async readAll() {
    /**
     * Il faut récupérer toutes les informations de l'utilisateur qui a posté le message ainsi que le message lui-même.
     * Il faut donc faire une jointure entre la table publication et la table user.
     */
    const [rows] = await databaseClient.query<Rows>(
      "Select * from publication",
    );

    // Return the array of posts
    return rows as Post[];
  }
}

export default new PostRepository();
