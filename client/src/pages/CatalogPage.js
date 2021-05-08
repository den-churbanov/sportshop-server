import React, {useEffect} from "react";
import {useUrlParams} from "../hooks/URL.params.hook";

export const CatalogPage = ({location}) => {

    const {params, toURLString, deleteByKey, setByKey} = useUrlParams(location)

    useEffect(() => {
        console.log(params)
    }, [params])

    return (
        <div className="">
            <h1>Catalog</h1>
        </div>
    );
}