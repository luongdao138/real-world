import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddle from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddle();

const configureStore = (initState) => {
  const store = createStore(
    rootReducer,
    initState,
    composeEnhancer(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
