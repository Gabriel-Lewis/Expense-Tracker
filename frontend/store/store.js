import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import rootReducer from '../reducers/root_reducer';
import createLogger from 'redux-logger';

const logger = createLogger();

const configureStore = (preloadedState = {}) => (
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(promise, logger)
  )
);

export default configureStore;
