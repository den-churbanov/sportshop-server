import {
    FETCH_USER_INFO,
    CLEAR_USER_INFO,
    UPDATE_USER_INFO,
    UPDATE_USER_ADDRESS
} from "./actionTypes"

export const userReducer = (state = null, action) => {
    switch (action.type) {
        case FETCH_USER_INFO:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_USER_INFO:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_USER_ADDRESS:
            return {
                ...state,
                address: {
                    ...state.address,
                    ...action.payload
                }
            }
        case CLEAR_USER_INFO:
            return null
        default: return state
    }
}