import React from "react";
import { NavLink } from "react-router-dom";
import c from  './Post.module.css';

const Post = ({deletePost, post: {body, title, id}}) => {
  const deleteBtn = () => {
    deletePost(id);
  }

  return (
    <div className={c.postWrapper}>
      <NavLink className={c.link} to={'/watchPost/' + id} >
        <div className={c.titleWrapper}>
          {title}
        </div>
        <div className={c.bodyWrapper}>
          {body}
        </div>
      </NavLink>
      <div className={c.btnWrapper}>
        <button className={c.btn} onClick={deleteBtn}>Delete</button>
      </div>
    </div>
  );
};

export default Post;