import { COLOR_FILTERS_UPDATED } from '../actions';

let colorFilterState = { colorFilters : [] };

export const colorFilterReducer = (state = colorFilterState, action) => {

    switch (action.type) {

        case COLOR_FILTERS_UPDATED :
            // Important : If we dont clone the colorFilters object the shallow equal comparison will always be true when only a true/false value has changed
            // and therefore will no trigger an update on the connected components as we expect it to do
            return Object.assign( {}, state, { colorFilters : Object.assign({}, action.colorFilters) });

        default : 
            return state;

    }

}
