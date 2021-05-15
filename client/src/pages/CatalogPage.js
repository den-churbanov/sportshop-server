import React, {useEffect} from "react";
import {useUrlParams} from "../hooks/URL.params.hook";

export const CatalogPage = ({location}) => {

    const {params, toURLString, deleteByKey, setByKey} = useUrlParams(location)

    useEffect(() => {

    }, [params])

    return (
        <div className="catalog_container">
            <h1>Catalog</h1>
            <pre>
                {JSON.stringify(params, 2)}
            </pre>
        </div>
    );
}