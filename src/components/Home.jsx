import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "./PostsContent";
import Post from "./Post";
const postsUrl = "http://localhost:3000/posts";
let alreadyGotTheData = false;

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(postsUrl);
      const data = await response.json();
      setPosts(data);
    };
    if (!alreadyGotTheData) {
      getPosts();
      alreadyGotTheData = true;
    }
  }, []);
  return (
    <>
      <PostContext value={{ posts, setPosts }}>
        <h1>Hello Welcome to my app !</h1>
        <Link to="/sign-up">Sign-Up</Link>
        <Link to="/log-in">Log-in</Link>
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
    </>
  );
}

export default Home;
