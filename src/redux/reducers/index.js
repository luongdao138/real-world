import { combineReducers } from 'redux';

// import reducers
import homeReducer from './home';
import currentUserReducer from './currentUser';
import globalLoadingReducers from './globalLoading';

const rootReducer = combineReducers({
  home: homeReducer,
  globalLoading: globalLoadingReducers,
  currentUser: currentUserReducer,
});

export default rootReducer;
