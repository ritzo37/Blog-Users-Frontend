import { useEffect, useState } from "react";
import AddComment from "./AddComment";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
let postUrl = "http://localhost:3000/posts";
import styles from "./ExpandedPost.module.css";

function ExpandedPost() {
  let params = useParams();
  const [post, setPost] = useState();
  const [state, setState] = useState("loading");
  const postId = params.postId;
  function getFormattedDate(oldDate) {
    let newDate = "";
    for (let i = 0; i < oldDate.length; i++) {
      if (oldDate[i] === "T") break;
      newDate += oldDate[i];
    }
    return newDate;
  }
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
      <div className={styles.postContainer}>
        <div className={styles.headingPost}>
          <p className={styles.title}>Title : {post.title}</p>
          <div className="rightContainer">
            {" "}
            <p className={styles.author}>Author :{post.author.name}</p>
            <p className={styles.createdDate}>
              Created At: {getFormattedDate(post.createdAt)}
            </p>
            <p className={styles.updatedDate}>
              Last Updated: {getFormattedDate(post.updatedAt)}
            </p>
          </div>
        </div>{" "}
        <p className={styles.content}>{post.content}</p>
        <h1 className={styles.commentsHeading}>Comments :</h1>
        <div className={styles.commentsContainer}>
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
