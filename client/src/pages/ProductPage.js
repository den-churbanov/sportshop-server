import React, {useCallback, useEffect, useState} from "react"
import "../styles/product-page.css"
import {Helmet} from "react-helmet-async"
import {useParams} from "react-router-dom"
import {useHttp} from "../hooks/http.hook"
import {ProductImagesPreview} from "../components/product/ProductImagesPreview"
import {Loader} from "../components/trivia/Loader"
import {connect} from "react-redux"
import {
    addFullInfoAboutCurrentProduct,
    deleteFullInfoAboutCurrentProduct
} from "../redux/actions"
import Media from "react-media"
import {Icon} from "../components/trivia/svg-icons/Icon"
import {useBasket} from "../hooks/basket.hook"
import {MessagePopup} from "../components/trivia/MessagePopup";

const ProductPageComponent = ({product, addCurrentProduct, deleteCurrentProduct}) => {

    const {id} = useParams()
    const {request, loading} = useHttp()
    const [count, setCount] = useState(1)
    const [selectedSize, setSelectedSize] = useState(0)
    const [activeTab, setActiveTab] = useState(0)

    const {
        addToBasket,
        addToFavorite,
        is_loading,
        err, clearErr,
        succ,
        clearSucc
    } = useBasket()

    const downloadInfoAboutProduct = useCallback(async () => {
        const info = await request('/api/catalog/products/product_info', 'POST', {id})
        addCurrentProduct(info)
    }, [request, addCurrentProduct])

    useEffect(() => {
        if (!product) {
            downloadInfoAboutProduct()
        }
        return () => deleteCurrentProduct()
    }, [id, downloadInfoAboutProduct])

    const reduceHandler = () => {
        if (count === 1) return
        setCount(prevState => prevState - 1)
    }

    const increaseHandler = () => {
        setCount(prevState => prevState + 1)
    }

    const changeSizeHandler = e => {
        setSelectedSize(+e.target.value)
    }

    const openTabHandler = e => setActiveTab(+e.target.dataset.index)

    const addProductToBasketHandler = e => {
        e.preventDefault()
        e.stopPropagation()
        addToBasket(id, count, selectedSize)
    }

    const addProductToFavoriteHandler = e => {
        e.preventDefault()
        e.stopPropagation()
        addToFavorite()
    }

    if (!product) return (
        <div className="product_page_container">
            <Loader/>
        </div>
    )

    return (
        <>
            <Helmet>
                <title>{product.name}</title>
            </Helmet>
            {(succ || err) && <MessagePopup success={succ}
                                            error={err}
                                            clearError={clearErr}
                                            clearSuccess={clearSucc}/>}
            {loading ?
                <Loader/> :
                <div className="product_page_container">
                    <div className="product-page-row">
                        <Media query="(max-width:676px)" render={() => (
                            <h4>{product.name}</h4>
                        )}/>
                        <ProductImagesPreview product={product}/>
                        <div className="product-description">
                            <Media query="(min-width:676px)" render={() => (
                                <h4>{product.name}</h4>
                            )}/>
                            <span>Артикул: {product.prod_number}</span>
                            <div className="count-price-wrapper">
                                <div className="count-container">
                                    <button className="count-btn" onClick={reduceHandler}>-</button>
                                    <span>{count}</span>
                                    <button className="count-btn" onClick={increaseHandler}>+</button>
                                </div>
                                <div className="price-container">
                                    {product.new_price &&
                                    <div className="old-price-wrapper">
                                        <p className="old-price">{`${product.sale_price} ₽`}</p>
                                        <span>Старая цена</span>
                                    </div>}
                                    <div className="new-price-wrapper">
                                        <p className="new-price">{`${product.new_price ? product.new_price : product.sale_price} ₽`}</p>
                                        <span>Розничная цена</span>
                                    </div>
                                </div>
                            </div>
                            <div className="sizes-block">
                                <div className="sizes-block-header-wrapper">
                                    <span>Выберите размер:</span>
                                    <span className="sizes-table">Таблица размеров</span>
                                </div>
                                {product.sizes &&
                                <div className="sizes-wrapper">
                                    {product.sizes.map((size, idx) =>
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
                                </div>}
                                <div className="buttons-wrapper">
                                    <button className="btn-block-button"
                                            disabled={is_loading}
                                            onClick={addProductToBasketHandler}>
                                        <Icon name="basket"/>
                                        <span>В корзину</span>
                                    </button>
                                    <button className="btn-block-button product-favorites-button"
                                            disabled={is_loading}
                                            onClick={addProductToFavoriteHandler}>
                                        <Icon name="star"/>
                                        <span>В избранное</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-page-row row-tabs">
                        <div className="tab">
                            {['Описание', 'Отзывы'].map((name, idx) => (
                                <button
                                    key={idx}
                                    className={`tab-links ${idx === activeTab ? 'active' : ''}`}
                                    onClick={openTabHandler}
                                    data-index={idx}
                                >{name}</button>
                            ))}
                        </div>
                        {activeTab === 0 ?
                            <div className="tab-content">
                                <h4>{product.name}</h4>
                                {Object.values(JSON.parse(product.description)).map((par, idx) => {
                                    if (typeof par === 'object') {
                                        return (
                                            <div key={idx}>
                                                <span>{Object.keys(JSON.parse(product.description))[idx]}</span>
                                                <ul>
                                                    {Object.values(par).map((p, idx) =>
                                                        <li key={idx}>
                                                            <p>
                                                                <span>{Object.keys(par)[idx]}</span>
                                                                {p.toString()}
                                                            </p>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        )
                                    }
                                    else {
                                        return <p key={idx}>{par.toString()}</p>
                                    }
                                })}
                            </div> :
                            <div className="tab-content">
                                <h4>Отзывы скоро появятся</h4>
                            </div>
                        }
                    </div>
                    <div className="product-page-row params">
                        <h4>Характеристики:</h4>
                        <ul>
                            {Object.values(JSON.parse(product.params)).map((param, idx) =>
                                <li key={idx}><span>{Object.keys(JSON.parse(product.params))[idx].endsWith(':') ?
                                    Object.keys(JSON.parse(product.params))[idx] :
                                    Object.keys(JSON.parse(product.params))[idx] + ': '
                                }</span>{param}</li>
                            )}
                        </ul>
                    </div>
                </div>
            }
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        product: state.catalog.products.current,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCurrentProduct: productInfo => dispatch(addFullInfoAboutCurrentProduct(productInfo)),
        deleteCurrentProduct: id => dispatch(deleteFullInfoAboutCurrentProduct())
    }
}
export const ProductPage = connect(mapStateToProps, mapDispatchToProps)(ProductPageComponent)
