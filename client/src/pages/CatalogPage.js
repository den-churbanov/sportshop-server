import React, {useEffect} from "react"
import "../styles/catalog-page.css"
import {useUrlParams} from "../hooks/URL.params.hook"
import {FiltersBlock} from "../components/catalog/FiltersBlock"

export const CatalogPage = ({location}) => {

    const {params, toURLString, deleteByKey, setByKey} = useUrlParams(location)

    useEffect(() => {

    }, [params])

    return (
        <div className="catalog_container">
            <FiltersBlock/>
            <div className="content">
            <pre>
                {JSON.stringify(params, 2)}
            </pre>
            </div>
        </div>
    );
}