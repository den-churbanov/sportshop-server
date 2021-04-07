import {FETCH_SECTIONS, FETCH_SUB_SECTIONS} from "./actionTypes";

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
            items[action.payload.idx] = {...items[action.payload.idx],
                subsections: action.payload.items
            }
            return {
                ...state, items
            }
        default: return state
    }
}