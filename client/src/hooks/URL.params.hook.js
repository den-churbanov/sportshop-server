import {useCallback, useEffect, useState} from "react";

export const useUrlParams = (location) => {
    const [params, setParams] = useState({})
    const [URL, setURL] = useState(new URLSearchParams(location.search))

    useEffect(() => {
        // console.log('useEffect setURL')
        setURL(new URLSearchParams(location.search))
    }, [location.search])

    useEffect(() => {
        //console.log('useEffect setParams')
        if (!URL) return
        const params = {}
        for (let key of URL.keys()) {
            params[key] = URL.get(key)
        }
        setParams(params)
    }, [URL])

    const deleteByKey = useCallback(key => {
        URL.delete(key)
        setURL(new URLSearchParams(URL))
    }, [])

    const setByKey = useCallback((key, value) => {
        URL.set(key, value)
        //console.log(URL.toString())
        setURL(new URLSearchParams(URL))
    }, [])

    const toURLString = useCallback(() => URL.toString(), [])

    return {params, toURLString, deleteByKey, setByKey};
}