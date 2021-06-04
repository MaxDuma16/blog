import React, { useState } from "react";
import FormComment from "../Common/FormComment/FormComment";
import AddPostForm from "../Posts/AddPostForm/AddPostForm";
import Comments from "./Comments/Comments";
import c from './WatchPostPage.module.css';

const WatchPostPage = ({deleteCommentFun, addComment, history, deletePostFun, editPost, post: {body, title, id, comments}}) => {
  const [editMode, setEditMode ] = useState(false);

  const editPostBtn = (inputValue, textareaValue) => {
    editPost(inputValue, textareaValue, id, comments);
    setEditMode(false);
  }

  const deletePostBtn = () => {
    deletePostFun(id);
  }

  const redirectToMain = () => {
    history.push('/main');
  }

  const addCommentWatchPost = (text) => {
    addComment(text, id);
  }

  const deleteComment = (commentsId) => {
    deleteCommentFun(id, commentsId);
  }

  return (
    <div className={c.WatchPostPageWrapper}>
      <div className={c.btnRedirectToMainWrapper}>
        <button className={c.btnRedirectToMain} onClick={redirectToMain}>Main</button>
      </div>
      {editMode ?
        <div className={c.EditFormFormWrapper}>
          <div className={c.btnCancelWrapper}>
            <button className={c.btn} onClick={() => {setEditMode(false)}} >Cancel</button>
          </div>
        <AddPostForm onHandleSubmit={editPostBtn} btnText={"Edit Post"} />
        </div>
         :
         <div className={c.watchPostWrapper}>
           <div className={c.postTitle}>
              Post
           </div>
            <div className={c.btnEditWrapper}>
              <button className={c.btn} onClick={() => {setEditMode(true)}} >Edit</button>
             </div>
            <div className={c.postContainer}>
                {/* Header Post */}
              <div className={c.titleWrapper}>
                  {title}
              </div>
              {/* Body Post */}
              <div className={c.titleBody}>
                  {body}
              </div>
              {/* Footer Post */}
              <div className={c.titleFooter}>
                <div className={c.btnDeleteWrapper}>
                   <button className={c.btnDelete}  onClick={deletePostBtn}>Delete</button>
                </div>
              </div>
            </div>
            <div className={c.addCommentWrapper}>
                {/* Add Comment */}
              <div>
                <FormComment  onHandleSubmit={addCommentWatchPost} btnText={"Add Comment"} />
              </div>
                {/* Comment List*/}
              <div className={c.commentsWrapper}>
                { comments && comments.length !== 0 && <Comments comments={comments} deleteComment={deleteComment} /> }
              </div>
            </div>
          </div>
      }
    </div>
  );
};

export default WatchPostPage;



