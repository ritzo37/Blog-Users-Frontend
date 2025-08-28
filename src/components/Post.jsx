import AddComment from "./AddComment";
import Comment from "./Comment";

function Post({ postId, content, title, author, comments }) {
  return (
    <>
      <div className="postContainer">
        <p>Title : {title}</p>
        <p>Content :{content}</p>
        <p>Author : {author}</p>
        <h4>Comments :</h4>
        <div className="commentsContainer">
          {comments.map((currComment) => {
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
              ></Comment>
            );
          })}
        </div>
        <AddComment postId={postId}></AddComment>
      </div>
    </>
  );
}

export default Post;
