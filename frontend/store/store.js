import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import rootReducer from '../reducers/root_reducer';
import createLogger from 'redux-logger';

const logger = createLogger();


export default createStore(
    rootReducer,
    {},
    applyMiddleware(promise, logger)
)

// export default configureStore;
