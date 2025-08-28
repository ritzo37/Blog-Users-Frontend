import Post from "./Post";
import { useState, useEffect } from "react";
const postsUrl = "http://localhost:3000/posts";

function PostPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(postsUrl);
      const data = await response.json();
      setPosts(data);
    };
    getPosts();
  }, []);
  return (
    <>
      <h1>Posts : </h1>
      <div className="post-container">
        {posts.map((currPost) => {
          return (
            <Post
              key={currPost.postId}
              title={currPost.title}
              authorName={currPost.author.name}
              postId={currPost.postId}
            ></Post>
          );
        })}
      </div>
    </>
  );
}
export default PostPage;
