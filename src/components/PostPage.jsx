import Post from "./Post";
import { useState, useEffect } from "react";
const postsUrl = import.meta.env.VITE_BASEURL + "/posts";
import styles from "./PostPage.module.css";
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
      <div className={styles.postsContainer}>
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
