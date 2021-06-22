import React, {useCallback, useContext, useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {Loader} from "../trivia/Loader"
import {useHttp} from "../../hooks/http.hook"
import {Icon} from "../trivia/svg-icons/Icon"
import {CatalogProductPreviewContext} from "../../CatalogProductPreviewContext";

const ProductPreviewComponent = ({product, sport_types}) => {
    const [image, setImage] = useState()
    const {request, loading} = useHttp()
    const [count, setCount] = useState(1)
    const {setSelected, setProductCount} = useContext(CatalogProductPreviewContext)

    const fetchImage = useCallback(async () => {
        const image = await request('api/images/products', 'POST', {imagepath: product.main_image_path})
        setImage(image)
    }, [product.main_image_path, request])

    useEffect(() => {
        if (typeof product.main_image_path === 'undefined') return
        fetchImage()
        return () => {
            URL.revokeObjectURL(image)
            setImage(null)
        }
    }, [product?.main_image_path])


    const reduceHandler = () => {
        if (count === 1) return
        setCount(prevState => prevState - 1)
    }

    const increaseHandler = () => {
        setCount(prevState => prevState + 1)
    }

    const setSelectedHandler = useCallback(e => {
        e.preventDefault()
        e.stopPropagation()
        setSelected(product.id)
        setProductCount(count)
    }, [setSelected, product.id, setProductCount, count])

    const addProductToFavoriteHandler = e => {

    }

    if (typeof product === 'undefined') return null
    if (typeof product.name === 'undefined') return null
    return (
        <div className="product-preview">
            <div className="content">
                <Link to={`/catalog/product/${product.id}`} className="picture-wrapper">
                    <div className="labels-block">
                        <div className="labels-row">
                            {product.new_price ?
                                <div className="is-sale">
                                    {Math.round((product.sale_price - product.new_price) / product.sale_price * 100) + '%'}
                                </div> : null
                            }
                            {product.is_hit ? <div className="is-hit">HIT</div> : null}
                            {product.is_new && <div className="is-new">NEW</div>}
                        </div>
                    </div>
                    {loading || !image ? <Loader/> : <img src={image} draggable="false" alt={product.name}/>}
                </Link>
                <div className="info-block">
                    <Link to={`/catalog/product/${product.id}`}>{product.name}</Link>
                    <p>{`${sport_types.length ? sport_types[product.sport_type - 1]?.title : ''} 
                    / ${product.gender === 'male' ? 'Мужской' : product.gender === 'female' ? 'Женский' : 'Унисекс'} 
                    / ${product.prod_number}`}</p>
                </div>
                <div className="price-block">
                    <div className="count-container">
                        <button className="count-btn" onClick={reduceHandler}>-</button>
                        <span>{count}</span>
                        <button className="count-btn" onClick={increaseHandler}>+</button>
                    </div>
                    <div className="price-container">
                        {product.new_price && <p className="old-price">{`${product.sale_price} ₽`}</p>}
                        <p className="new-price">{`${product.new_price ? product.new_price : product.sale_price} ₽`}</p>
                    </div>
                </div>
                <div className="btn-block">
                    <button className="btn-block-button"
                            onClick={setSelectedHandler}>
                        <Icon name="basket"/>
                        <span>Купить</span>
                    </button>
                    <button className="btn-block-button product-favorites-button"
                            onClick={addProductToFavoriteHandler}>
                        <Icon name="star"/>
                        <span>В избранное</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        sport_types: state.catalog.sport_types
    }
}

export const CatalogProductPreview = React.memo(
    connect(mapStateToProps)(ProductPreviewComponent),
    (prevProps, nextProps) => prevProps.product.main_image_path !== nextProps.product.main_image_path
)