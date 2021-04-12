import { combineReducers } from 'redux';

// import reducers
import homeReducer from './home';
import currentUserReducer from './currentUser';
import globalLoadingReducers from './globalLoading';
import postListReducer from './postList';
import postReducer from './post';
import userReducer from './user';

const rootReducer = combineReducers({
  home: homeReducer,
  globalLoading: globalLoadingReducers,
  currentUser: currentUserReducer,
  postList: postListReducer,
  post: postReducer,
  user: userReducer,
});

export default rootReducer;
