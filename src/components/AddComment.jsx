import { useState } from "react";

function AddComment({ postId, setPost, postUrl }) {
  const addCommentUrl = `http://localhost:3000/posts/${postId}/comments/`;
  const [addCommentClicked, setAddCommentClicked] = useState(false);
  const [content, setContent] = useState("");

  async function handleAddComent(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await fetch(addCommentUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content, postId }),
    });
    const res = await fetch(postUrl);
    const data = await res.json();
    setPost(data);
  }

  function toggleAddComment() {
    setAddCommentClicked(!addCommentClicked);
  }
  if (addCommentClicked) {
    return (
      <div className="addCommentContainer">
        <label htmlFor="content">
          Comment
          <input
            type="text"
            name="content"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <button onClick={handleAddComent}>Submit</button>
        <button onClick={toggleAddComment}>Go Back</button>
      </div>
    );
  } else {
    return <button onClick={toggleAddComment}>Add Comment</button>;
  }
}
export default AddComment;
