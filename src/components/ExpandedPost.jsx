import { useEffect, useState } from "react";
import AddComment from "./AddComment";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
let postUrl = "http://localhost:3000/posts";

function ExpandedPost() {
  let params = useParams();
  const [post, setPost] = useState();
  const [state, setState] = useState("loading");
  const postId = params.postId;

  useEffect(() => {
    const getPostData = async function () {
      const data = await fetch(postUrl + `/${postId}`);
      const currPost = await data.json();
      setPost(currPost);
      setState("loaded");
    };
    getPostData();
  }, [postId]);

  if (state === "loading") {
    return <h1>Loading....</h1>;
  } else {
    return (
      <div className="postContainer">
        <p>Title : {post.title}</p>
        <p>Content :{post.content}</p>
        <p>Author : {post.author.name}</p>
        <h4>Comments :</h4>
        <div className="commentsContainer">
          {post.comments.map((currComment) => {
            return (
              <Comment
                key={currComment.cid}
                commentContent={currComment.content}
                author={currComment.user.name}
                upvotes={currComment.upvotes.length}
                downvotes={currComment.downvotes.length}
                commentId={currComment.cid}
                postId={post.postId}
                replies={currComment.replies}
                setPost={setPost}
                postUrl={`http://localhost:3000/posts/${postId}`}
              ></Comment>
            );
          })}
        </div>
        <AddComment
          postId={post.postId}
          setPost={setPost}
          postUrl={`http://localhost:3000/posts/${postId}`}
        ></AddComment>
      </div>
    );
  }
}

export default ExpandedPost;
