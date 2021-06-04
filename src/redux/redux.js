import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import postsReducer from './posts-reducer';
import watchPostReducer from './watchPost-reducer';
import thunkMiddleware from "redux-thunk";

const reducers = combineReducers({
    postsPage: postsReducer,
    watchPage: watchPostReducer
});

// Redux Dev Tools
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)) );

// const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;