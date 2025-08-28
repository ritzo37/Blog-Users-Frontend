import { useContext } from "react";
import { PostContext } from "./PostsContent";
import { useState } from "react";
import Reply from "./Reply";
const postsUrl = "http://localhost:3000/posts";

function Comment({
  postId,
  commentId,
  commentContent,
  author,
  upvotes,
  downvotes,
  replies,
}) {
  const token = localStorage.getItem("token");
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [showReplyContainer, toggleReplyContainer] = useState(false);
  const [replyValue, setReplyValue] = useState("");
  const { setPosts } = useContext(PostContext);
  async function handleUpvote() {
    const headers = { Authorization: `Bearer ${token}` };
    const responseForReq = await fetch(
      `http://localhost:3000/posts/${postId}/comments/${commentId}/upvote`,
      {
        method: "POST",
        headers,
      }
    );
    if (responseForReq.status === 409) {
      setUpvoted(true);
    } else {
      const response = await fetch(postsUrl);
      const data = await response.json();
      setPosts(data);
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
    if (responseForReq.status === 409) {
      setDownvoted(true);
    } else {
      const response = await fetch(postsUrl);
      const data = await response.json();
      setPosts(data);
    }
  }

  function handleReply() {
    toggleReplyContainer(!showReplyContainer);
  }

  async function submitReply() {
    await fetch(
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
    const posts = await fetch(postsUrl);
    const data = await posts.json();
    setPosts(data);
  }
  return (
    <div className="commentContainer">
      <p className="comment">{commentContent}</p>
      <p>Author : {author}</p>
      <button className="upvote-btn" onClick={handleUpvote}>
        {upvotes}
      </button>
      <button className="downvote-btn" onClick={handleDownvote}>
        {downvotes}
      </button>
      {upvoted === true && <p>You already have upvoted this comment!</p>}
      {downvoted === true && <p>You already have downvoted this comment</p>}
      {replies.map((currReply) => {
        return (
          <Reply
            authorName={currReply.user.name}
            content={currReply.content}
          ></Reply>
        );
      })}
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
