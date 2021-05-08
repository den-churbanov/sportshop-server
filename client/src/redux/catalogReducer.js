import {ADD_BRANDS, ADD_SPORT_TYPES, FETCH_SECTIONS, FETCH_SUB_SECTIONS} from "./actionTypes";

const initialState = {
    items: undefined
}

export const sectionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SECTIONS:
            return {
                ...state, items: action.payload
            }
        case FETCH_SUB_SECTIONS:
            const items = state.items.slice()
            items[action.payload.idx] = {
                ...items[action.payload.idx],
                subsections: action.payload.items
            }
            return {
                ...state, items
            }
        default:
            return state
    }
}

export const brandsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BRANDS:
            return {
                ...state, items: action.payload
            }
        default:
            return state
    }
}

export const sportTypesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SPORT_TYPES:
            return {
                ...state, items: action.payload
            }
        default:
            return state
    }
}

