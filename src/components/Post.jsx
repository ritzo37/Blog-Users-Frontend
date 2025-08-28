import { useNavigate } from "react-router-dom";
function Post({ postId, title, authorName }) {
  let navigate = useNavigate();
  function expandPost() {
    const navigateUrl = `/posts/${postId}`;
    navigate(navigateUrl);
  }
  return (
    <>
      <div className="postContainer">
        <p>Title : {title}</p>
        <p>Author : {authorName}</p>
        <button onClick={expandPost}>View More</button>
      </div>
    </>
  );
}

export default Post;
