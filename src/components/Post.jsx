import { useNavigate } from "react-router-dom";
import styles from "./Post.module.css";
function Post({ postId, title, authorName }) {
  let navigate = useNavigate();
  function expandPost() {
    const navigateUrl = `/posts/${postId}`;
    navigate(navigateUrl);
  }
  return (
    <>
      <div className={styles.postContainer}>
        <p>Title : {title}</p>
        <p>Author : {authorName}</p>
        <button onClick={expandPost} className={styles.button}>
          View More
        </button>
      </div>
    </>
  );
}

export default Post;
