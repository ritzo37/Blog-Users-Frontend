import { useEffect, useState } from "react";
import AddComment from "./AddComment";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
let postUrl = import.meta.env.VITE_BASEURL + "/posts";
import styles from "./ExpandedPost.module.css";
import Pagination from "./Pagination";
function ExpandedPost() {
  let params = useParams();
  const [post, setPostInfo] = useState();
  const [comments, setComments] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [state, setState] = useState("loading");
  const [totalComments, setTotalComments] = useState();
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
    const getData = async function () {
      const data1 = await fetch(postUrl + `/${postId}/comments/${pageNumber}`);
      const data2 = await fetch(postUrl + `/${postId}`);
      const data3 = await fetch(postUrl + `/${postId}/comments/total`);
      const currData1 = await data1.json();
      const currData2 = await data2.json();
      const currData3 = await data3.json();
      setComments(currData1);
      setTotalComments(currData3);
      setPostInfo(currData2);
      setState("Loaded");
    };
    getData();
  }, [postId, pageNumber]);

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
          {comments.length > 0 &&
            comments.map((currComment) => {
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
                  setComments={setComments}
                  commentsUrl={
                    import.meta.env.VITE_BASEURL +
                    `/posts/${postId}/comments/${pageNumber}`
                  }
                ></Comment>
              );
            })}
        </div>
        <Pagination
          pageNumber={pageNumber}
          totalComments={totalComments}
          setPageNumber={setPageNumber}
        ></Pagination>
        <AddComment
          postId={post.postId}
          setComments={setComments}
          commentsUrl={
            import.meta.env.VITE_BASEURL + `/posts/${postId}/comments/`
          }
          setTotalComments={setTotalComments}
          totalComments={totalComments}
          pageNumber={pageNumber}
        ></AddComment>
      </div>
    );
  }
}

export default ExpandedPost;
