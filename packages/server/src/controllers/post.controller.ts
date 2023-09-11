import { Post } from "@post-vote/contract";
import { ObjectId, Collection, Db } from "mongodb";

import { mongo } from "../db";
import { objectIdToString } from "../utils/objectIdToString";

type LeanPost = Omit<Post, "_id">;

class $PostController {
  #collection: Collection<LeanPost>;

  constructor(db: Db) {
    this.#collection = db.collection("posts");
  }

  async getPosts(): Promise<Post[]> {
    const posts = await this.#collection.find().toArray();

    return posts.map((post) => objectIdToString(post));
  }

  async getPost(id: string): Promise<Post> {
    const _id = new ObjectId(id);
    const post = await this.#collection.findOne({ _id });

    if (!post) {
      throw new Error(`Failed to get post with id of ${id}`);
    }

    return objectIdToString(post);
  }

  async createPost(payload: LeanPost): Promise<Post> {
    const { acknowledged, insertedId } = await this.#collection.insertOne(
      payload
    );

    if (!acknowledged) {
      throw new Error("Failed to create post");
    }

    const post = await this.getPost(insertedId.toString());
    return post;
  }
}

export const PostController = new $PostController(mongo.db());
