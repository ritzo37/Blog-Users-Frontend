function Reply({ authorName, content }) {
  return (
    <div className="reply-container">
      <p>Content : {content}</p>
      <p>Author : {authorName}</p>
    </div>
  );
}
export default Reply;
