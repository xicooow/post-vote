import { z } from "zod";
import { initContract } from "@ts-rest/core";

import { PostSchema } from "./schemas/post.schema";

const c = initContract();
export const contract = c.router({
  getPosts: {
    method: "GET",
    path: "/posts",
    summary: "Gets the list of posts",
    responses: { 200: z.array(PostSchema) },
  },
  getPost: {
    method: "GET",
    path: "/posts/:id",
    summary: "Gets a post by id",
    responses: { 200: PostSchema },
  },
  createPost: {
    method: "POST",
    path: "/posts",
    summary: "Creates a post",
    responses: { 201: PostSchema },
    body: PostSchema.omit({ _id: true }),
  },
});

export * from "./types";
