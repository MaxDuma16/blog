import React, { Component }  from "react";
import { connect } from "react-redux";
import { postsAPI } from "../../api/api";
import { addPost, deletePost, setAllPosts } from "../../redux/posts-reducer";
import { getIsFetching, getAllPosts} from "../../redux/posts-selectors";
import Spinner from "../Spinner/Spinner";
import Posts from "./Posts";

class PostsContainer extends Component  {
  componentDidMount() {
    postsAPI.getAllPosts()
    .then((res) => {
      this.props.setAllPosts(res)
    })
  }

  AddPost = (inputValue, textareaValue) => {
    const newId = this.props.allPosts.length + 2;
    const post = {
      title: inputValue,
      body: textareaValue,
      id: newId
    }
    const p = new Promise((resolve) => {
      this.props.addPost(post)
      resolve(post)
    })
    p.then((post) => {
      postsAPI.postPost(post);
    })
  }

  deletePost = (id) => {
    const newAllPosts = this.props.allPosts.filter(p => p.id !== id);
    const p = new Promise((resolve) => {
      this.props.deletePost(newAllPosts);
      resolve();
    })
    p.then(() => {
      postsAPI.deletePost(id);
    })
  }

render() {
  return (
    <div>
      {this.props.isFetching 
      ? <Spinner />
      : <Posts allPosts={this.props.allPosts} partPosts={this.props.partPosts} AddPost={this.AddPost} deletePost={this.deletePost}/> }
    </div>
  );
 }
};

const mapStateToProps = (state) => {
  return {
    allPosts: getAllPosts(state),
    isFetching: getIsFetching(state),
  }
}

export default connect(mapStateToProps, {addPost, deletePost, setAllPosts})(PostsContainer);
