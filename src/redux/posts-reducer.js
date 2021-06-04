import { postsAPI } from "../api/api";
import { setWatchPost } from "./watchPost-reducer";

const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_POSTS_DATA = 'SET_POSTS_DATA';
const SET_ALL_POSTS = 'SET_ALL_POSTS';
const EDIT_POST = 'EDIT_POST';
const TOGGLE_COMMENT = 'TOGGLE_COMMENT';

const initialState = {
  allPosts: [],
  isFetching: false
}

const postsReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_ALL_POSTS: 
      return {
        ...state,
        allPosts: action.allPosts
        };
    case ADD_POST: 
      return {
        ...state,
        allPosts: [ 
          action.post,
          ...state.allPosts
        ]
        };
    case DELETE_POST: 
      return {
        ...state,
        allPosts: action.posts 
      }
    case TOGGLE_COMMENT: 
      return {
        ...state,
        allPosts: [...state.allPosts.map(p => p.id === action.id ? action.newPost : p)]
      }
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching }
    case SET_POSTS_DATA:
       if (action.data.partPosts) {
        return { ...state, 
          allPosts: action.data.allPosts,
          partPosts: action.data.partPosts,
          currentPage : action.data.currentPage,
          pageSize: action.data.pageSize,
          totalItemsCount: action.data.totalItemsCount,
          portionSize: action.data.portionSize,
          isFetching: false,
          AuthorsList: action.data.AuthorsList
         }
       } else {
         return {
          ...state,
           allPosts: action.data.allPosts
         }
       }
      case EDIT_POST:
        return {
          ...state, 
          allPosts: [
            ...state.allPosts.map(p => p.id === action.id ? action.post : p)
          ]
        }
      default:
        return state;
  }
}

export const setAllPosts = (allPosts) =>  ({type: SET_ALL_POSTS, allPosts});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const addPost = (post) => ({type: ADD_POST, post });
export const setPostsData = (data) => ({type: SET_POSTS_DATA, data});
export const deletePost = (posts) => ({type: DELETE_POST, posts});
export const editPost = (post, id) => ({type: EDIT_POST, post, id});
export const toggleComment = (newPost, id) => ({type: TOGGLE_COMMENT, newPost, id});

export default postsReducer;

export const setAllPostsThunkCreator = () => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    const p = new Promise((resolve) => {
      postsAPI.getAllPosts()
      .then((res) => {
        resolve(res.data)
      })
    })
    p.then((posts) => {
      dispatch(setAllPosts(posts))
      dispatch(toggleIsFetching(false));
    })
  }
}

export const toggleCommentThunkCreator = (newPost, id) => {
  return (dispatch) => {
    dispatch(toggleComment(newPost, id));
    dispatch(setWatchPost(newPost));
  }
}






