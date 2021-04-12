import { combineReducers } from 'redux';

// import reducers
import homeReducer from './home';
import currentUserReducer from './currentUser';
import globalLoadingReducers from './globalLoading';
import postListReducer from './postList';
import postReducer from './post';

const rootReducer = combineReducers({
  home: homeReducer,
  globalLoading: globalLoadingReducers,
  currentUser: currentUserReducer,
  postList: postListReducer,
  post: postReducer,
});

export default rootReducer;
