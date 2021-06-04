import { editPost } from "./posts-reducer";

const SET_WATCH_POST = 'SET_WATCH_POST';

const initialState = {
  post: {}
}

const watchPostReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_WATCH_POST: 
      return {
        ...state,
        post: action.post
        };
    default:
        return state;
  }
}

export const setWatchPost = (post) =>  ({type: SET_WATCH_POST, post});

export default watchPostReducer;

export const editPostThunkCreator = (post, id) => {
  return (dispatch) => {
    dispatch(setWatchPost(post));
    dispatch(editPost(post, id));
  }
}
