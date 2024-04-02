import { combineReducers } from 'redux';
import { colorFilterReducer } from './colorFilters';

// Combine all reducers
const rootReducer = combineReducers({
    colorFilterReducer,
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})

export default rootReducer;