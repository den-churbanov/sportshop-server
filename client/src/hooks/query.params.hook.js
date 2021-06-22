import {useCallback, useEffect, useState} from "react"
import {useLocation} from "react-router-dom"
import queryString from "query-string"

export const useQueryParams = () => {
    const location = useLocation()

    const parseSearchLocationToParams = useCallback(() => {
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
        console.debug('parseSearchLocationToParams useEffect called')
        setParams(parseSearchLocationToParams())
    }, [location.search, parseSearchLocationToParams])

    const getRequestParams = useCallback((limit, excludeProducts) => {
        return {
            is_new: params.new ? params.new : null,
            is_sale: params.sale ? params.sale : null,
            is_hit: params.hit ? params.hit : null,
            gender: params.gender ? Array.isArray(params.gender) ? '\'' + params.gender.join('\', \'') + '\'' : `'${params.gender}'` : null,
            brands: params.brand ? Array.isArray(params.brand) ? params.brand.join(',') : params.brand.toString() : null,
            sections: params.section ? Array.isArray(params.section) ? params.section.join(',') : params.section.toString() : null,
            subsection: params.subsection ? params.subsection.toString() : null,
            sizes: params.size ? Array.isArray(params.size) ? params.size.join(',') : params.size.toString() : null,
            sport_types: params.sport_type ? Array.isArray(params.sport_type) ? params.sport_type.join(',') : params.sport_type.toString() : null,
            excludeProducts: Array.isArray(excludeProducts) ? excludeProducts.length ? excludeProducts.join(',') : null : null,
            limit: limit.toString()
        }
    }, [params])

    const deleteByKey = useCallback((key, value) => {
        if (!Number.isNaN(Number.parseInt(value))) {
            value = Number.parseInt(value)
        }
        value = Array.isArray(params[key]) ? params[key].filter(item => item !== value) : params[key]
        if (value.length === 1) value = value[0]
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

    return {params, parseToQueryString, getRequestParams, deleteByKey, setByKey, setByKeyRadio}
}