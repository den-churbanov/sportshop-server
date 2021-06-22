import React, {useCallback, useEffect, useMemo, useState} from "react"
import "../styles/catalog-page.css"
import {useQueryParams} from "../hooks/query.params.hook"
import {FiltersBlock} from "../components/catalog/FiltersBlock"
import {Icon} from "../components/trivia/svg-icons/Icon"
import {Helmet} from 'react-helmet-async'
import {useHttp} from "../hooks/http.hook"
import Media from 'react-media'
import {Loader} from "../components/trivia/Loader"
import {connect} from "react-redux"
import {
    concatProductsPreviewInfo,
    updateProductsPreviewInfo,
    updateProductsPreviewCount,
    sortProductsPreviewInfo
} from "../redux/actions"
import {CatalogProductPreview} from "../components/catalog/CatalogProductPreview"
import {useBasket} from "../hooks/basket.hook"
import {MessagePopup} from "../components/trivia/MessagePopup"
import {CatalogProductPreviewContext} from "../CatalogProductPreviewContext"

const CatalogPageComponent = ({
                                  productPreviews,
                                  count,
                                  sortPreviews,
                                  addProductsPreviewInfo,
                                  updateProductsPreviewInfo,
                                  updateProductsPreviewCount
                              }) => {
    const {params, getRequestParams} = useQueryParams()
    const {request, loading, error, clearError, success, clearSuccess} = useHttp()
    const [showProductsCount, setShowProductsCount] = useState(12)
    const [currentPage, setCurrentPage] = useState(1)
    const [showFilters, setShowFilters] = useState(false)
    const [sortByPrice, setSortByPrice] = useState('ascending')
    const [selectedProduct, setSelectedProduct] = useState(0)
    const [productCount, setProductCount] = useState(1)
    const [sizes, setSizes] = useState([])
    const [selectedSize, setSelectedSize] = useState(0)

    const {
        addToBasket,
        addToFavorite,
        is_loading,
        err, clearErr,
        succ, clearSucc
    } = useBasket()

    //server requests
    const updateProductsByFilters = async () => {
        try {
            const previews = await request('api/catalog/products/by_filters', 'POST',
                getRequestParams(showProductsCount))
            updateProductsPreviewInfo(previews, sortByPrice)
        } catch (e) {
        }
    }

    const addProductsByFilters = async () => {
        try {
            if (productPreviews.length >= count || !currentPage * showProductsCount >= productPreviews.length) return
            const previews = await request('api/catalog/products/by_filters', 'POST',
                getRequestParams(
                    currentPage * showProductsCount - productPreviews.length,
                    getAlreadySelectedProductsID()))
            addProductsPreviewInfo(previews, sortByPrice)
        } catch (e) {
        }
    }

    const getCountPreviewsByFilters = async () => {
        try {
            const result = await request('api/catalog/products/count/by_filters', 'POST',
                getRequestParams(showProductsCount))
            updateProductsPreviewCount(result[0].count)
        } catch (e) {
        }
    }

    //get products id, that already added to store
    function getAlreadySelectedProductsID() {
        return productPreviews.map(preview => preview.id);
    }

    //every time the max count products or showProductsCount changed,
    //recalculate productsPageCount

    const productsPageCount = useMemo(() => {
        return Math.ceil(count / showProductsCount)
    }, [count, showProductsCount])

    //every time the catalog filters are changed,
    //new products are loaded(according to the limit)
    //and the maximum number of them according to these filters
    useEffect(() => {
        if (currentPage !== 1) setCurrentPage(1)
        getCountPreviewsByFilters()
        updateProductsByFilters()
    }, [params])

    useEffect(() => {
        addProductsByFilters()
    }, [currentPage])

    useEffect(() => {
        sortPreviews(sortByPrice)
    }, [sortPreviews, sortByPrice])

    useEffect(() => {
        if (error)
            setTimeout(() => clearError(), 3000)
        if (success)
            setTimeout(() => clearSuccess(), 3000)
    }, [error, success, clearError, clearSuccess])

    const getProductSizes = useCallback(async (product_id) => {
        try {
            const sizes = await request('api/catalog/products/product_sizes', 'POST', {product_id})
            setSizes(sizes)
        } catch (e) {
        }
    }, [request, setSizes])

    useEffect(() => {
        if (selectedProduct)
            getProductSizes(selectedProduct)
    }, [selectedProduct, getProductSizes])

    const setSelected = id => {
        setSelectedProduct(id)
    }

    //handlers
    const radioShowProductsCountHandler = event => setShowProductsCount(Number.parseInt(event.target.value))
    const showFiltersHandler = useCallback(() => {
        setShowFilters(prevState => !prevState)
    }, [setShowFilters])

    const addProductToBasket = e => {
        e.preventDefault()
        e.stopPropagation()
        if (selectedSize === 0) return
        addToBasket(selectedProduct, productCount, selectedSize)
        setSelectedProduct(0)
        setProductCount(1)
        setSelectedSize(0)
    }

    const setProduct = useCallback((id) => {
        setSelectedProduct(id)
    }, [setSelectedProduct])

    const changeSizeHandler = e => {
        setSelectedSize(+e.target.value)
    }

    const sortByPriceHandler = event => {
        setSortByPrice(event.target.value)
    }

    const changeCurrentPageHandler = event => {
        setCurrentPage(Number.parseInt(event.target.value))
    }

    return (
        <>
            <Helmet>
                <title>Каталог</title>
            </Helmet>
            {(succ || err) && <MessagePopup success={succ}
                                            error={err}
                                            clearError={clearErr}
                                            clearSuccess={clearSucc}/>}
            {selectedProduct && sizes ?
                <MessagePopup isActive={selectedProduct !== 0} setActive={setSelected}>
                    <h4>Выберите размер:</h4>
                    <div className="sizes-wrapper">
                        {loading ?
                            <Loader/> :
                            sizes.map((size, idx) =>
                                <label className={`sizes-button${selectedSize === size.id ? ' active' : ''}`}
                                       key={idx}
                                       title={size.value}>
                                    <input type="radio"
                                           name="sizes"
                                           checked={selectedSize === size.id}
                                           value={size.id}
                                           onChange={changeSizeHandler}/>
                                    <span>{size.value}</span>
                                </label>
                            )}
                    </div>
                    <button className="btn-block-button" onClick={addProductToBasket}>В корзину</button>
                </MessagePopup> :
                null
            }
            <div className="catalog_container">
                <Media query="(min-width: 992px)" render={() => (
                    <FiltersBlock loading={loading}/>
                )}/>
                <div className="catalog-content">
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
                            <label title="Выводить 12 товаров">
                                <input type="radio"
                                       name="count"
                                       checked={showProductsCount === 12}
                                       value={12}
                                       onChange={radioShowProductsCountHandler}/>
                                <p>12</p>
                            </label>
                            <label title="Выводить 24 товара">
                                <input type="radio"
                                       name="count"
                                       checked={showProductsCount === 24}
                                       value={24}
                                       onChange={radioShowProductsCountHandler}/>
                                <p>24</p>
                            </label>
                            <label title="Выводить 36 товаров">
                                <input type="radio"
                                       name="count"
                                       checked={showProductsCount === 36}
                                       value={36}
                                       onChange={radioShowProductsCountHandler}/>
                                <p>36</p>
                            </label>
                        </div>
                    </div>
                    <Media query="(max-width: 992px)" render={() => (
                        <FiltersBlock isActive={showFilters} toggleActive={setShowFilters} loading={loading}/>
                    )}/>
                    <div className="products-preview-container">
                        {(error || success) &&
                        <MessagePopup success={success}
                                      error={error}
                                      clearError={clearError}
                                      clearSuccess={clearSuccess}/>
                        }
                        <CatalogProductPreviewContext.Provider value={{setSelected: setProduct, setProductCount}}>
                            {loading ? <Loader/> :
                                productPreviews.length ?
                                    productPreviews.map((product, idx) => {
                                        if (idx < (currentPage - 1) * showProductsCount ||
                                            idx >= currentPage * showProductsCount) return null
                                        return <CatalogProductPreview
                                            product={product}
                                            key={product.name + idx}/>
                                    })
                                    : <div className="no-products-wrapper">
                                        <h4>Товаров по вашим фильтрам не найдено!</h4>
                                    </div>
                            }
                        </CatalogProductPreviewContext.Provider>
                    </div>
                    <div className="page-previews-count-nav">
                        {Array(productsPageCount).fill('').map((_, idx) =>
                            <label className={`page-previews-nav-btn ${currentPage === idx + 1 ? ' active' : ''}`}
                                   key={idx}
                                   title={idx + 1}>
                                <input type="radio"
                                       name="page-previews-nav-btn"
                                       checked={currentPage === idx + 1}
                                       value={idx + 1}
                                       onChange={changeCurrentPageHandler}/>
                                {idx + 1}
                            </label>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    productPreviews: state.catalog.products.previews,
    count: state.catalog.products.count
})

const mapDispatchToProps = dispatch => {
    return {
        addProductsPreviewInfo: (previewInfo, sortByPrice) => dispatch(concatProductsPreviewInfo(previewInfo, sortByPrice)),
        updateProductsPreviewInfo: (previewInfo, sortByPrice) => dispatch(updateProductsPreviewInfo(previewInfo, sortByPrice)),
        updateProductsPreviewCount: count => dispatch(updateProductsPreviewCount(count)),
        sortPreviews: sortType => dispatch(sortProductsPreviewInfo(sortType))
    }
}
export const CatalogPage = connect(mapStateToProps, mapDispatchToProps)(CatalogPageComponent)