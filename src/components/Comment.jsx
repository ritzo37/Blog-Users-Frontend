import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Reply from "./Reply";
import styles from "./Comment.module.css";
function Comment({
  postId,
  commentId,
  commentContent,
  author,
  upvotes,
  downvotes,
  replies,
  setPost,
  postUrl,
}) {
  const token = localStorage.getItem("token");
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [showReplyContainer, toggleReplyContainer] = useState(false);
  const [replyValue, setReplyValue] = useState("");
  let navigate = useNavigate();
  async function handleUpvote() {
    const headers = { Authorization: `Bearer ${token}` };
    const responseForReq = await fetch(
      `http://localhost:3000/posts/${postId}/comments/${commentId}/upvote`,
      {
        method: "POST",
        headers,
      }
    );
    if (responseForReq.status === 401) {
      navigate("/log-in");
    } else if (responseForReq.status === 409) {
      setUpvoted(true);
    } else {
      const response = await fetch(postUrl);
      const data = await response.json();
      setPost(data);
    }
  }
  async function handleDownvote() {
    const headers = { Authorization: `Bearer ${token}` };
    const responseForReq = await fetch(
      `http://localhost:3000/posts/${postId}/comments/${commentId}/downvote`,
      {
        method: "POST",
        headers,
      }
    );
    if (responseForReq.status === 401) {
      navigate("/log-in");
    } else if (responseForReq.status === 409) {
      setDownvoted(true);
    } else {
      const response = await fetch(postUrl);
      const data = await response.json();
      setPost(data);
    }
  }

  function handleReply() {
    toggleReplyContainer(!showReplyContainer);
  }

  async function submitReply() {
    const resObj = await fetch(
      `http://localhost:3000/posts/${postId}/comments/${commentId}/reply`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: replyValue }),
      }
    );
    if (resObj.status === 401) {
      navigate("/log-in");
    } else {
      const posts = await fetch(postUrl);
      const data = await posts.json();
      setPost(data);
    }
  }
  return (
    <div className={styles.commentContainer}>
      <p className={styles.commentContent}>{commentContent}</p>
      <p>Author : {author}</p>
      <div className={styles.upvoteDownvoteContainer}>
        <button className={styles.upvoteBtn} onClick={handleUpvote}>
          Upvotes : {upvotes}
        </button>
        <button className={styles.downvoteBtn} onClick={handleDownvote}>
          Downvotes : {downvotes}
        </button>
      </div>

      {upvoted === true && <p>You already have upvoted this comment!</p>}
      {downvoted === true && <p>You already have downvoted this comment</p>}
      <div className={styles.replyContainer}>
        <h1>Replies : </h1>
        {replies.map((currReply) => {
          return (
            <Reply
              key={currReply.id}
              authorName={currReply.user.name}
              content={currReply.content}
            ></Reply>
          );
        })}
      </div>
      <button onClick={handleReply}>
        {showReplyContainer === true ? "Close" : "Reply"}
      </button>
      {showReplyContainer === true && (
        <div className="reply-container">
          <label htmlFor="replyContent"></label>
          <input
            type="text"
            id="replyContent"
            onChange={(e) => setReplyValue(e.target.value)}
            value={replyValue}
          />
          <button onClick={submitReply}>Submit</button>
        </div>
      )}
    </div>
  );
}
export default Comment;
