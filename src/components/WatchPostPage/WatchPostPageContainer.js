import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "redux";
import { getAllPosts} from "../../redux/posts-selectors";
import { getPost } from "../../redux/watchPage-selectors";
import { setWatchPost, editPostThunkCreator } from "../../redux/watchPost-reducer";
import WatchPostPage from "./WatchPostPage";
import { deletePost, toggleCommentThunkCreator, setAllPosts } from "../../redux/posts-reducer";
import { postsAPI } from "../../api/api";

class WatchPostPageContainer extends Component {
  componentDidMount() {
    let postId = this.props.match.params.id;
    //set Post
    const p = new Promise((resolve) => {
        postsAPI.getPost(postId)
        .then((p) => {resolve(p)})
      })
      p.then((p) => {
        this.props.setWatchPost(p);
        console.log("set post", p);
      });
  }

  editPost = (inputValue, textareaValue, id, comments) => {
    console.log("comments", comments)
    const items = comments ? comments : [];
    console.log("items", items)
    const post = {
      title: inputValue,
      body: textareaValue,
      id: id,
      comments: [
        ...items
      ]
    }

  const p = new Promise((resolve) => {
    this.props.editPostThunkCreator(post, id);
    resolve();
  })
  .then(() => {
    postsAPI.putPost(post, id);
  })
}

  deletePostFun = (id) => {
    const newAllPosts = this.props.allPosts.filter(p => p.id !== id);
    this.props.deletePost(newAllPosts);
    postsAPI.deletePost(id);
    this.props.history.push('/main');
  }

  addComment = (text, id) => {
    const post = this.props.allPosts.filter(p => p.id == id);
    const cleanPost = {...post[0]};
    cleanPost.comments = cleanPost.comments ? cleanPost.comments : [];
    const comment = {
      body: text,
      id: 'P' + id + 'C' + cleanPost.comments.length + 1
      }
    const newPost = {
      title: cleanPost.title,
      body: cleanPost.body,
      id: cleanPost.id,
      comments: [
        ...cleanPost.comments, comment
      ]
    }
    this.props.toggleCommentThunkCreator(newPost, id);
    postsAPI.addComments(text, comment.id)
    .then((res) => {console.log("res", res)})
  }

  deleteCommentFun = (id, commentsId) => {
      const post = this.props.allPosts.filter(p => p.id === id);
      const cleanPost = {...post[0]};
      const newPost = {
        title: cleanPost.title,
        body: cleanPost.body,
        id: cleanPost.id,
        comments: [
          ...cleanPost.comments.filter(comments => comments.id !== commentsId)
        ]
      }
      this.props.toggleCommentThunkCreator(newPost, id);
      postsAPI.deleteComments(commentsId);
   }


 render() {
    return (
      <div>
          <WatchPostPage post={this.props.post} editPost={this.editPost} deletePostFun={this.deletePostFun} history={this.props.history} addComment={this.addComment} deleteCommentFun={this.deleteCommentFun}/>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    post: getPost(state),
    allPosts: getAllPosts(state)
  }
}

export default compose(
  connect (mapStateToProps, {setAllPosts, setWatchPost, editPostThunkCreator, deletePost, toggleCommentThunkCreator}),
  withRouter
)(WatchPostPageContainer);