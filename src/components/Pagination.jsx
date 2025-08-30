import styles from "./Pagination.module.css";
import { useState } from "react";
export default function Pagination({
  setStartingCommentIndex,
  setEndingCommentIndex,
  totalComments,
}) {
  const [clickedPage, setClickedPage] = useState(1);
  let pages = [];
  const pagesReq = Math.ceil(totalComments / 5);
  for (let i = 1; i <= pagesReq; i++) {
    pages.push(i);
  }
  function handlePageClick(currPage) {
    let prevIndexes = (currPage - 1) * 5;
    let startingCommentIndex = prevIndexes;
    let endingCommentIndex = Math.min(startingCommentIndex + 5, totalComments);
    setStartingCommentIndex(startingCommentIndex);
    setEndingCommentIndex(endingCommentIndex);
    setClickedPage(currPage);
  }
  return (
    <div className={styles.pageContainer}>
      {pages.map((currPage) => {
        if (currPage === clickedPage) {
          return (
            <button
              className={styles.clickedPageDiv}
              onClick={() => handlePageClick(currPage)}
              key={currPage}
            >
              {currPage}
            </button>
          );
        } else {
          return (
            <button
              className={styles.pageDiv}
              onClick={() => handlePageClick(currPage)}
              key={currPage}
            >
              {currPage}
            </button>
          );
        }
      })}
    </div>
  );
}
