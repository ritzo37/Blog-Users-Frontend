import styles from "./Reply.module.css";
function Reply({ authorName, content }) {
  return (
    <div className={styles.reply}>
      <p>Content : {content}</p>
      <p>Author : {authorName}</p>
    </div>
  );
}
export default Reply;
