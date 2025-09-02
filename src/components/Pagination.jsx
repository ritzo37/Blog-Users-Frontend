import styles from "./Pagination.module.css";
import { useState } from "react";
export default function Pagination({
  pageNumber,
  setPageNumber,
  totalComments,
}) {
  const [clickedPage, setClickedPage] = useState(pageNumber);
  let pages = [];
  const pagesReq = Math.ceil(totalComments / 5);
  for (let i = 1; i <= pagesReq; i++) {
    pages.push(i);
  }
  function handlePageClick(currPage) {
    setClickedPage(currPage);
    setPageNumber(currPage);
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
