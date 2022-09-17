import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import auth from './auth';
import comments from './comment';
import likes from './like';
import messages from './message';
import posts from './post';
import photos from './photo';
import users from './user';

const reducer = combineReducers({ auth, comments, likes, messages, posts, photos, users })
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}));
const store = createStore(reducer, middleware);


export * from './auth';
export * from './message';
export * from './like';
export * from './comment';
export * from './photo';
export * from './post';
export * from './user';
export default store;
