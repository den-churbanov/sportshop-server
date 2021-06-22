import {
    FETCH_SECTIONS,
    FETCH_SUB_SECTIONS,
    FETCH_BRANDS,
    FETCH_SPORT_TYPES,
    FETCH_ALL_SIZES,
    CONCAT_PRODUCTS_PREVIEW_INFO,
    UPDATE_PRODUCTS_PREVIEW_INFO,
    UPDATE_PRODUCTS_PREVIEW_COUNT,
    SORT_PRODUCTS_PREVIEW_INFO,
    ADD_FULL_INFO_ABOUT_CURRENT_PRODUCT,
    DELETE_FULL_INFO_ABOUT_CURRENT_PRODUCT,
    FETCH_USER_INFO,
    CLEAR_USER_INFO,
    UPDATE_USER_INFO,
    UPDATE_USER_ADDRESS,
    ADD_ALL_PREVIEWS_BASKET, ADD_ORDER_POSITION, DELETE_ORDER_POSITION
} from "./actionTypes"

export const fetchSubSections = (id, idx) => {
    return async dispatch => {
        const response = await fetch(
            '/api/catalog/subsections', {
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
            '/api/catalog/sections')
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

export function fetchAllSizes() {
    return async dispatch => {
        const response = await fetch(
            '/api/catalog/sizes')
        const sizes = await response.json()
        dispatch({type: FETCH_ALL_SIZES, payload: sizes})
    }
}

export function concatProductsPreviewInfo(previewInfo, sort) {
    return {
        type: CONCAT_PRODUCTS_PREVIEW_INFO,
        payload: previewInfo,
        sort
    }
}

export function updateProductsPreviewInfo(previewInfo, sort) {
    return {
        type: UPDATE_PRODUCTS_PREVIEW_INFO,
        payload: previewInfo,
        sort
    }
}

export function sortProductsPreviewInfo(sort) {
    return {
        type: SORT_PRODUCTS_PREVIEW_INFO,
        payload: sort
    }
}

export function updateProductsPreviewCount(count) {
    return {
        type: UPDATE_PRODUCTS_PREVIEW_COUNT,
        payload: count
    }
}

export function addFullInfoAboutCurrentProduct(productInfo) {
    return {
        type: ADD_FULL_INFO_ABOUT_CURRENT_PRODUCT,
        payload: productInfo
    }
}

export function deleteFullInfoAboutCurrentProduct() {
    return {
        type: DELETE_FULL_INFO_ABOUT_CURRENT_PRODUCT
    }
}

export function fetchUserInfo(token) {
    return async dispatch => {
        const response = await fetch(
            '/api/user/get_user_info',
            {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
        if (response.status === 401) return
        const info = await response.json()
        dispatch({type: FETCH_USER_INFO, payload: info})
    }
}

export function clearUserInfo() {
    return {
        type: CLEAR_USER_INFO
    }
}

export function updateUserInfo(info) {
    return {
        type: UPDATE_USER_INFO,
        payload: info
    }
}

export function updateUserAddress(info) {
    return {
        type: UPDATE_USER_ADDRESS,
        payload: info
    }
}

export function addAllPreviewsBasket(info) {
    return {
        type: ADD_ALL_PREVIEWS_BASKET,
        payload: info
    }
}

export function addOrderPosition(product_id) {
    return {
        type: ADD_ORDER_POSITION,
        payload: product_id
    }
}

export function deleteOrderPosition(product_id) {
    return {
        type: DELETE_ORDER_POSITION,
        payload: product_id
    }
}