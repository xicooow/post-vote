import { z } from "zod";

import { PostSchema } from "../schemas/post.schema";

export type Post = z.infer<typeof PostSchema>;
