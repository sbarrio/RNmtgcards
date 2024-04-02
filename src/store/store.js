import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducers from './reducers/index';

//Configure and create logger
const logger = createLogger({predicate: (getState, action) => __DEV__})

// Connect our store to the reducers
export default createStore(reducers, applyMiddleware(thunk, logger));