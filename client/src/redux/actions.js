import {FETCH_SECTIONS, FETCH_SUB_SECTIONS} from "./actionTypes";

/***
 * fetch sections request
 * ***/
export const fetchSubSections = (id, idx) => {
    return async dispatch =>{
        const response = await fetch(
            'api/catalog/subsections',{
                method: 'POST',
                body: JSON.stringify({ id }),
                headers: {
                    'content-type': 'application/json'
                }
            })
        const items = await response.json();
        dispatch({type: FETCH_SUB_SECTIONS, payload: {items, idx}})
    }
}

export function fetchSections() {
    return async dispatch => {
        const response = await fetch(
            'api/catalog/sections')
        const items = await response.json();
        items.forEach(item =>{item.subsections = undefined})
        dispatch({type: FETCH_SECTIONS, payload: items})
    }
}

/***
 * user logout
 * ***/