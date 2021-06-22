import {
    FETCH_BRANDS,
    FETCH_SPORT_TYPES,
    FETCH_SECTIONS,
    FETCH_SUB_SECTIONS,
    FETCH_ALL_SIZES,
    CONCAT_PRODUCTS_PREVIEW_INFO,
    UPDATE_PRODUCTS_PREVIEW_INFO,
    SORT_PRODUCTS_PREVIEW_INFO,
    ADD_FULL_INFO_ABOUT_CURRENT_PRODUCT,
    DELETE_FULL_INFO_ABOUT_CURRENT_PRODUCT,
    UPDATE_PRODUCTS_PREVIEW_COUNT
} from "./actionTypes"
import {combineReducers} from "redux"

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

const productsInitialState = {
    count: 0,
    previews: [],
    current: null
}

const ascendingSort = (array) => {
    return array.sort((first, second) =>
        (first.new_price ? first.new_price : first.sale_price) >=
        (second.new_price ? second.new_price : second.sale_price) ? -1 : 1
    )
}

const descendingSort = (array) => {
    return array.sort((first, second) =>
        (first.new_price ? first.new_price : first.sale_price) <=
        (second.new_price ? second.new_price : second.sale_price) ? -1 : 1
    )
}

const productsReducer = (state = productsInitialState, action) => {
    switch (action.type) {
        case CONCAT_PRODUCTS_PREVIEW_INFO: {
            const newPreviews = state.previews ?
                state.previews.concat(action.payload) :
                action.payload
            return {
                ...state,
                previews: action.sort === 'ascending' ?
                    ascendingSort(newPreviews) :
                    descendingSort(newPreviews)
            }
        }
        case UPDATE_PRODUCTS_PREVIEW_INFO:
            return {
                ...state,
                previews: action.sort === 'ascending' ?
                    ascendingSort(action.payload) :
                    descendingSort(action.payload)
            }
        case UPDATE_PRODUCTS_PREVIEW_COUNT:
            return {
                ...state,
                count: action.payload
            }
        case SORT_PRODUCTS_PREVIEW_INFO: {
            return {
                ...state,
                previews: action.payload === 'ascending' ?
                    ascendingSort(state.previews.slice()) :
                    descendingSort(state.previews.slice())
            }
        }

        case ADD_FULL_INFO_ABOUT_CURRENT_PRODUCT: {
            return {
                ...state,
                current: action.payload
            }
        }
        case DELETE_FULL_INFO_ABOUT_CURRENT_PRODUCT:
            return {
                ...state,
                current: null
            }
        default:
            return state
    }
}

export const catalogReducer = combineReducers({
    sections: sectionsReducer,
    brands: brandsReducer,
    sport_types: sportTypesReducer,
    sizes: sizesReducer,
    products: productsReducer,
})
