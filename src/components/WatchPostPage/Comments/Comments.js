import React from "react";
import Comment from "./Comment/Comment";
import c from  './Comments.module.css';

const Comments = ({ comments, deleteComment }) => {
  const renderComments = comments.map((comment) => {
     return <Comment comment={comment.body} deleteComment={deleteComment} id={comment.id} key={comment.id}/>
  })

  return (
    <div className={c.commentsContainer}>
      {renderComments}
    </div>
  );
};

export default Comments;