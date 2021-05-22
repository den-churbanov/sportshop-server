import {useCallback, useEffect, useState} from "react"
import {useLocation} from "react-router-dom"
import queryString from "query-string"

export const useQueryParams = () => {
    const location = useLocation()

    const parseSearchLocationToParams = useCallback(()=> {
        return queryString.parse(location.search, {
            parseNumbers: true,
            parseBooleans: true,
            arrayFormat: 'separator',
            arrayFormatSeparator: '|',
            decode: true,
        })
    }, [location.search])

    const [params, setParams] = useState(parseSearchLocationToParams())

    useEffect(() => {
        console.debug('useEffect  setParams(parseSearchLocationToParams())')
        setParams(parseSearchLocationToParams())
    }, [location.search, parseSearchLocationToParams])

    const deleteByKey = useCallback((key, value) => {
        if (!Number.isNaN(Number.parseInt(value))) {
            value = Number.parseInt(value)
        }
        value = params[key].filter(item => item !== value)
        if(value.length === 1) value = value[0]
        if (Array.isArray(params[key])) {
            setParams(prevParams => (
                {...prevParams, [key]: value}
            ))
            return
        }
        setParams(prevParams => (
            {...prevParams, [key]: undefined}
        ))
    }, [params, setParams])

    const setByKey = useCallback((key, value) => {
        if (!Number.isNaN(Number.parseInt(value))) {
            value = Number.parseInt(value)
        }
        if (params[key] === undefined) {
            setParams(prevParams => (
                {...prevParams, [key]: value}
            ))
            return
        }
        if (Array.isArray(params[key])) {
            setParams(prevParams => (
                {...prevParams, [key]: params[key].concat([value])}
            ))
            return
        }
        setParams(prevParams => (
            {...prevParams, [key]: [params[key], value]}
        ))
    }, [params, setParams])

    const setByKeyRadio = useCallback((key, value) => {
        if (!Number.isNaN(Number.parseInt(value))) {
            value = Number.parseInt(value)
        }
        setParams(prevParams => (
            {...prevParams, [key]: value}
        ))
    }, [setParams])

    const parseToQueryString = useCallback(() => {
        return new URLSearchParams(queryString.stringify(params, {
            arrayFormat: 'separator',
            arrayFormatSeparator: '|',
            encode: true,
            skipEmptyString: true,
            skipNull: true,
            strict: true
        })).toString()
    }, [params])

    return {params, parseToQueryString, deleteByKey, setByKey, setByKeyRadio}
}