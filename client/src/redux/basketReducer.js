import {
    ADD_ALL_PREVIEWS_BASKET,
    ADD_ORDER_POSITION, DELETE_ORDER_POSITION
} from "./actionTypes"

const basketInitialState = {
    previews: []
}
export const basketReducer = (state = basketInitialState, action) => {
    switch (action.type) {
        case ADD_ALL_PREVIEWS_BASKET:
            return {
                ...state,
                previews: action.payload
            }
        case ADD_ORDER_POSITION:
            return {
                ...state,
                previews: state.previews.slice().map(preview=>{
                    if(preview.product_id === action.payload){
                        preview.checked = 1
                    }
                    return preview
                })
            }
        case DELETE_ORDER_POSITION:
            return {
                ...state,
                previews: state.previews.slice().map(preview=>{
                    if(preview.product_id === action.payload){
                        preview.checked = 1
                    }
                    return preview
                })
            }
        default: return state
    }
}