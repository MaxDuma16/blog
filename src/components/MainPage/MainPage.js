import React from "react";
// import AuthorsContainer from "../Authors/AuthorsContainer";
import PostsContainer from "../Posts/PostsContainer";
import c from './MainPage.module.css';

const MainPage = (props) => {
  return (
    <div className={c.mainPage}>
        <div className={c.PostsContainerWrapper}>
          <div className={c.postsTitle}>Posts</div>
          <PostsContainer />
        </div>
    </div>
  );
};

export default MainPage;