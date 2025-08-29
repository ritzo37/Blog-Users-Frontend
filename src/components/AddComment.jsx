import { useState } from "react";
import styles from "./AddComment.module.css";
import { useNavigate } from "react-router-dom";
function AddComment({ postId, setPost, postUrl }) {
  const addCommentUrl = `http://localhost:3000/posts/${postId}/comments/`;
  const [addCommentClicked, setAddCommentClicked] = useState(false);
  const [content, setContent] = useState("");
  let navigate = useNavigate();

  async function handleAddComent() {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(addCommentUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content, postId }),
    });
    console.log(response);
    if (response.status === 401) {
      navigate("/log-in");
    } else {
      const res = await fetch(postUrl);
      const data = await res.json();
      setPost(data);
    }
  }

  function toggleAddComment() {
    setAddCommentClicked(!addCommentClicked);
  }
  if (addCommentClicked) {
    return (
      <div className={styles.addCommentContainer}>
        <label htmlFor="content">
          Comment
          <input
            type="text"
            name="content"
            id="content"
            value={content}
            className={styles.inputField}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <button onClick={handleAddComent} className={styles.button}>
          Submit
        </button>
        <button onClick={toggleAddComment} className={styles.button}>
          Go Back
        </button>
      </div>
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
