import {FETCH_BRANDS, FETCH_SPORT_TYPES, FETCH_SECTIONS, FETCH_SUB_SECTIONS, FETCH_ALL_SIZES} from "./actionTypes";
import {combineReducers} from "redux";

const sectionsReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_SECTIONS:
            return action.payload
        case FETCH_SUB_SECTIONS:
            const items = state.slice()
            items[action.payload.idx] = {
                ...items[action.payload.idx],
                subsections: action.payload.items
            }
            return items
        default:
            return state
    }
}
const brandsReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_BRANDS:
            return action.payload
        default:
            return state
    }
}
const sportTypesReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_SPORT_TYPES:
            return action.payload
        default:
            return state
    }
}
const sizesReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_ALL_SIZES:
            return action.payload
        default:
            return state
    }
}

export const catalogReducer = combineReducers({
    sections: sectionsReducer,
    brands: brandsReducer,
    sport_types: sportTypesReducer,
    sizes: sizesReducer
})
