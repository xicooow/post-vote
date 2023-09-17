import { Post } from "@post-vote/contract";
import { useState, useEffect } from "react";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setIsLoading(true);

        const response = await fetch("http://localhost:5000/posts");
        const data = (await response.json()) as Post[];

        if (cancelled) return;

        setPosts(data);
      } catch (error) {
        console.error({ error });
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { posts, isLoading };
}
