import React, {useState} from "react";
import AddPostForm from "./AddPostForm/AddPostForm";
import Post from "./Post/Post";
import c from './Posts.module.css';
import SearchPanel from "./SearchPanel/SearchPanel";

const Posts = ({allPosts, AddPost, deletePost}) => {
  const newAllPosts =
  [...allPosts].reverse();

  // filter searchPanel
  const [term, setTerm] = useState('');
  const onSearchChange = (text) => {
    setTerm(text);
  }
  const searchPanel = (newAllPosts, term) => {
    if (term.length === 0) {
      return allPosts
    }
    return newAllPosts.filter(newAllPosts => {
      return newAllPosts.title.indexOf(term) > -1
    })
  }
  const visiblePosts = searchPanel(newAllPosts, term);

  const postsElements = 
  visiblePosts
  .map((post) => {
    return <Post post={post} key={post.id} deletePost={deletePost} /> 
    });

  const text = 'Bad deal! No post yet... :(';

  return (
    <div className={c.postsWrapper}>
      <div className={c.flex}>
        <div className={c.searchPanelWrapper}>
          <SearchPanel onSearchChange={onSearchChange} term={term}/>
        </div>
      </div>
      <div className={c.AddPostFormWrapper}>
        <AddPostForm onHandleSubmit={AddPost} btnText={"Add Post"} />
      </div>
      {postsElements.length === 0 ?
      <div className={c.noPostsText}>{text}</div>
      : postsElements}
    </div>
  );
};

export default Posts;