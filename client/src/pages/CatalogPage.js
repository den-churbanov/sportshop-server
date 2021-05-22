import React, {useEffect, useState} from "react"
import "../styles/catalog-page.css"
import {useQueryParams} from "../hooks/query.params.hook"
import {FiltersBlock} from "../components/catalog/FiltersBlock"
import {Icon} from "../components/trivia/svg-icons/Icon"
import {Helmet} from 'react-helmet-async'
import {useHttp} from "../hooks/http.hook";

export const CatalogPage = () => {

    const {params} = useQueryParams()
    const {request, loading} = useHttp()
    const [showProductsCount, setShowProductsCount] = useState(12)
    const [showFilters, setShowFilters] = useState(false)
    const [sortByPrice, setSortByPrice] = useState('ascending')

    useEffect(() => {
        console.log(params)
    }, [params])

    const getRequestParams = () => {
        return {

        }
    }
    const radioShowProductsCountHandler = event => setShowProductsCount(Number.parseInt(event.target.value))
    const showFiltersHandler = () => setShowFilters(prevState => !prevState)

    const sortByPriceHandler = event => {
        setSortByPrice(event.target.value)
    }

    return (
        <>
            <Helmet>
                <title>Каталог</title>
            </Helmet>
            <div className="catalog_container">
                <FiltersBlock/>
                <div className="content">
                    <div className="content-header">
                        <div className="catalog-filters-button" onClick={showFiltersHandler}>
                            <Icon name="catalog-filters-button"/>
                            <span>Фильтры</span>
                        </div>
                        <div className="sort-buttons-wrapper">
                            <label className="catalog-sort-button" title="Сначала дороже">
                                <input type="radio"
                                       name="sortByPrice"
                                       checked={sortByPrice === 'ascending'}
                                       value="ascending"
                                       onChange={sortByPriceHandler}/>
                                <Icon name="ascending-sort"/>
                            </label>
                            <label className="catalog-sort-button" title="Сначала дешевле">
                                <input type="radio"
                                       name="sortByPrice"
                                       checked={sortByPrice === 'descending'}
                                       value="descending"
                                       onChange={sortByPriceHandler}/>
                                <Icon name="descending-sort"/>
                            </label>
                        </div>
                        <div className="show-products-count">
                            <label>
                                <input type="radio"
                                       name="count"
                                       checked={showProductsCount === 12}
                                       value={12}
                                       onChange={radioShowProductsCountHandler}/>
                                <p>12</p>
                            </label>
                            <label>
                                <input type="radio"
                                       name="count"
                                       checked={showProductsCount === 24}
                                       value={24}
                                       onChange={radioShowProductsCountHandler}/>
                                <p>24</p>
                            </label>
                            <label>
                                <input type="radio"
                                       name="count"
                                       checked={showProductsCount === 36}
                                       value={36}
                                       onChange={radioShowProductsCountHandler}/>
                                <p>36</p>
                            </label>
                        </div>
                    </div>
                    <FiltersBlock isActive={showFilters} toggleActive={setShowFilters}/>
                    <div className="products-preview-container">

                    </div>
                </div>
            </div>
        </>
    );
}