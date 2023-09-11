import { Post } from "@post-vote/contract";
import { useState, useEffect } from "react";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setIsLoading(true);

        const response = await fetch("http://localhost:5000/posts", {
          signal: controller.signal,
        });
        const data = (await response.json()) as Post[];

        setPosts(data);
      } catch (error) {
        console.error({ error });
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  return { posts, isLoading };
}
