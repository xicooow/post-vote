import { z } from "zod";

export const PostSchema = z.object({
  _id: z.string(),
  body: z.string(),
  title: z.string(),
});
