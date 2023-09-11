import { usePosts } from "../hooks/usePosts";

export function Posts() {
  const { posts, isLoading } = usePosts();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <article>
      <h1>Posts</h1>
      <h3>Look for posts, you can up/down vote too</h3>
      <ul className="posts">
        {posts.length === 0 && (
          <li className="post">
            <p>
              <i>No posts, yet</i>
            </p>
            <p>Zzz...</p>
          </li>
        )}
        {posts.map((post) => (
          <li key={post._id} className="post">
            <p>
              <strong>{post.title}</strong>
            </p>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
