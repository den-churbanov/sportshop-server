import React, {useContext} from "react"
import {AuthContext} from "../AuthContext"
import {useHttp} from "./http.hook"
import {useHistory} from "react-router-dom"

export const useBasket = () => {

    const {token, isAuthenticated, checkTokenExpiresIn} = useContext(AuthContext)
    const history = useHistory()
    const {request, loading, error, success, clearSuccess, clearError} = useHttp()

    //size - size id from table sizes
    const deleteFromBasket = async (basket_id) => {
        if (!isAuthenticated || await checkTokenExpiresIn()) return history.push('/authorization', {from: history.location})
        await request('/api/basket/delete', 'POST',
            {basket_id}, {
                'Authorization': `Bearer ${token}`
            })
    }

    //size - size id from table sizes
    const addToBasket = async (product, count, size) => {
        if (!isAuthenticated || await checkTokenExpiresIn()) return history.push('/authorization', {from: history.location})
        await request('/api/basket/add', 'POST',
            {product, count, size}, {
                'Authorization': `Bearer ${token}`
            })
    }

    //TODO
    const addToFavorite = () => {

    }

    return {
        addToBasket,
        deleteFromBasket,
        addToFavorite,
        is_loading: loading,
        err: error,
        clearErr: clearError,
        succ: success,
        clearSucc: clearSuccess
    }
}