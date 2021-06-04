import React from "react";
import c from  './Comment.module.css';

const Comment = ({deleteComment, comment, id}) => {
  const deleteCommentBtn = () => {
    deleteComment(id)
  }

  return (
    <div>
      <div className={c.flex}>
        <div className={c.commentWrapper}>
          {comment}
        </div>
        <div>
          <button className={c.btnDeleteComment} onClick={deleteCommentBtn}>X</button>
        </div>
      </div>
    </div>
  );
};

export default Comment;