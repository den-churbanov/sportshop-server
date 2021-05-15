import {FETCH_SECTIONS, FETCH_SUB_SECTIONS, FETCH_BRANDS, FETCH_SPORT_TYPES} from "./actionTypes";

/***
 * fetch sections request
 * ***/
export const fetchSubSections = (id, idx) => {
    return async dispatch => {
        const response = await fetch(
            'api/catalog/subsections', {
                method: 'POST',
                body: JSON.stringify({id}),
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
        items.forEach(item => {
            item.subsections = undefined
        })
        dispatch({type: FETCH_SECTIONS, payload: items})
    }
}

export function fetchBrands() {
    return async dispatch => {
        const response = await fetch(
            '/api/catalog/brands')
        const brands = await response.json()
        dispatch({type: FETCH_BRANDS, payload: brands})
    }
}

export function fetchSportTypes() {
    return async dispatch => {
        const response = await fetch(
            '/api/catalog/sport_types')
        const types = await response.json()
        dispatch({type: FETCH_SPORT_TYPES, payload: types})
    }
}

/***
 * user logout
 * ***/