import * as axios from 'axios';

// instance
const instance = axios.create({
  baseURL: 'https://bloggy-api.herokuapp.com/'
});

// get post
export const postsAPI = {
  getAllPosts() {
    return instance.get(`posts`)
    .then(response => {
      return response.data});
  },
  getPost(postId) {
    return axios.get(`https://bloggy-api.herokuapp.com/posts/${postId}?_embed=comments`)
    .then(response => {
      return response.data});
  },
  postPost(post) {
    return instance.post('posts', {
      title: post.title,
      body: post.body,
      id: post.id,
    })
    .then(response => {
      return response.data});
  },
  putPost(post, id) {
    return instance.put(`posts/${id}`, {
      title: post.title,
      body: post.body,
      id: post.id,
    })
    .then(response => {
      return response.data});
  },
  deletePost(id) {
    return instance.delete(`posts/${id}`)
    .then(response => {
      return response.data});
  },
  addComments(text, id) {
    return instance.post('comments', {
      postId: id,
    	body: text
    }) 
    .then(response => {
      return response.data});
  },
  deleteComments(id) {
    return instance.delete(`comments/${id}`) 
    .then(response => {
      return response.data});
  },
}




