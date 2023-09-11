import { Post } from "@post-vote/contract";
import { useState, ChangeEvent, FormEvent } from "react";

type LeanPost = Omit<Post, "_id">;
type AddPostProps = {
  onSaved: (post: Post) => void;
};

export function AddPost({ onSaved }: AddPostProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [post, setPost] = useState<LeanPost>({
    body: "",
    title: "",
  });

  const handleChange =
    (field: keyof LeanPost) =>
    ({
      target: { value },
    }: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      setPost((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    try {
      setIsSaving(true);

      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        body: JSON.stringify(post),
        headers: { "Content-Type": "application/json" },
      });
      const data = (await response.json()) as Post;

      onSaved(data);
      setPost({ body: "", title: "" });
    } catch (error) {
      console.error({ error });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="group">
        <label htmlFor="title-post-input">Title *</label>
        <input
          required
          type="text"
          name="title"
          minLength={5}
          maxLength={15}
          value={post.title}
          id="title-post-input"
          onChange={handleChange("title")}
        />
      </div>
      <div className="group">
        <label htmlFor="body-post-textarea">Message *</label>
        <textarea
          required
          rows={6}
          cols={30}
          name="body"
          minLength={15}
          maxLength={155}
          value={post.body}
          id="body-post-textarea"
          onChange={handleChange("body")}
        ></textarea>
      </div>
      <div className="btn">
        <button disabled={isSaving}>
          {isSaving ? "Saving..." : "Post it!"}
        </button>
      </div>
    </form>
  );
}
