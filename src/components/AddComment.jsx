import { useState } from "react";
import styles from "./AddComment.module.css";
import { useNavigate } from "react-router-dom";
function AddComment({ postId, setPost, postUrl }) {
  const addCommentUrl = `http://localhost:3000/posts/${postId}/comments/`;
  const [addCommentClicked, setAddCommentClicked] = useState(false);
  const [content, setContent] = useState("");
  let navigate = useNavigate();

  async function handleAddComment(e) {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(addCommentUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content, postId }),
    });

    if (response.status === 401) {
      navigate("/log-in");
    } else {
      const res = await fetch(postUrl);
      const data = await res.json();
      setPost(data);
      toggleAddComment();
    }
  }

  function toggleAddComment() {
    setAddCommentClicked(!addCommentClicked);
  }
  if (addCommentClicked) {
    return (
      <form onSubmit={handleAddComment} className={styles.addCommentContainer}>
        <label htmlFor="content">Comment</label>
        <input
          type="text"
          name="content"
          id="content"
          value={content}
          className={styles.inputFields}
          required
          onChange={(e) => setContent(e.target.value)}
        />
        <div className={styles.buttonContainer}>
          <button className={styles.button} disabled={!content.length}>
            Submit
          </button>
          <button onClick={toggleAddComment} className={styles.button}>
            Close
          </button>
        </div>
      </form>
    );
  } else {
    return (
      <button onClick={toggleAddComment} className={styles.button}>
        Add Comment
      </button>
    );
  }
}
export default AddComment;
