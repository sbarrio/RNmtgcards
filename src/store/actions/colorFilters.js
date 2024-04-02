export const COLOR_FILTERS_UPDATED = "COLOR_FILTERS_UPDATED";

export function setColorFilters(colorFilters){

    return (dispatch, getState) => {
        dispatch({type: COLOR_FILTERS_UPDATED, colorFilters: colorFilters});
    }
}