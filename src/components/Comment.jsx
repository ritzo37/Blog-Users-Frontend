import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Reply from "./Reply";
import styles from "./Comment.module.css";
const Comment = function Comment({
  postId,
  commentId,
  commentContent,
  author,
  upvotes,
  downvotes,
  replies,
  setComments,
  commentsUrl,
}) {
  const token = JSON.parse(localStorage.getItem("token"));
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [showReplyContainer, toggleReplyContainer] = useState(false);
  const [replyValue, setReplyValue] = useState("");
  let navigate = useNavigate();
  async function handleUpvote() {
    const headers = { Authorization: `Bearer ${token}` };
    const responseForReq = await fetch(
      import.meta.env.VITE_BASEURL +
        `/posts/${postId}/comments/${commentId}/upvote`,
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
      const response = await fetch(commentsUrl);
      const data = await response.json();
      setComments(data);
    }
  }
  async function handleDownvote() {
    const headers = { Authorization: `Bearer ${token}` };
    const responseForReq = await fetch(
      import.meta.env.VITE_BASEURL +
        `/posts/${postId}/comments/${commentId}/downvote`,
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
      const response = await fetch(commentsUrl);
      const data = await response.json();
      setComments(data);
    }
  }

  function handleReply() {
    toggleReplyContainer(!showReplyContainer);
  }

  async function submitReply(e) {
    e.preventDefault();
    const resObj = await fetch(
      import.meta.env.VITE_BASEURL +
        `/posts/${postId}/comments/${commentId}/reply`,
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
      const posts = await fetch(commentsUrl);
      const data = await posts.json();
      setComments(data);
      handleReply();
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
        {replies.length > 0 &&
          replies.map((currComment) => {
            return (
              <Comment
                key={currComment.cid}
                commentContent={currComment.content}
                author={currComment.user.name}
                upvotes={currComment.upvotes.length}
                downvotes={currComment.downvotes.length}
                commentId={currComment.cid}
                postId={postId}
                replies={currComment.replies}
                setComments={setComments}
                commentsUrl={commentsUrl}
              ></Comment>
            );
          })}
      </div>
      <button onClick={handleReply}>
        {showReplyContainer === true ? "Close" : "Reply"}
      </button>
      {showReplyContainer === true && (
        <form className="reply-container" onSubmit={submitReply}>
          <label htmlFor="replyContent">Comment</label>
          <input
            type="text"
            id="replyContent"
            onChange={(e) => setReplyValue(e.target.value)}
            value={replyValue}
            className={styles.inputFields}
            required
          />
          <button disabled={!replyValue.length}>Submit</button>
        </form>
      )}
    </div>
  );
};
export default Comment;
