import Post from "./Post";
import { useState, useEffect } from "react";
const postsUrl = "http://localhost:3000/posts";
import { PostContext } from "./PostsContent";
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
    <PostContext value={(posts, setPosts)}>
      <div className="post-container">
        {posts.map((currPost) => {
          return (
            <Post
              key={currPost.postId}
              title={currPost.title}
              content={currPost.content}
              author={currPost.author.name}
              comments={currPost.comments}
              postId={currPost.postId}
            ></Post>
          );
        })}
      </div>
    </PostContext>
  );
}
export default PostPage;
