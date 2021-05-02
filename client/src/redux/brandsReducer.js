import {ADD_BRANDS} from "./actionTypes";

const initialState = {
    items: undefined
}

export const brandsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BRANDS:
            return {
                ...state, items: action.payload
            }
        default: return state
    }
}