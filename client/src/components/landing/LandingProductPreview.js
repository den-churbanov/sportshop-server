import React, {useCallback, useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {Loader} from "../trivia/Loader"
import {useHttp} from "../../hooks/http.hook"

const ProductPreviewComponent = ({product, sport_types}) => {

    const [image, setImage] = useState(false)
    const {request} = useHttp()
    const fetchImage = useCallback(async () => {
        const image = await request('api/images/products', 'POST', {imagepath: product.main_image_path})
        setImage(image)
    }, [request, product, setImage])

    useEffect(() => {
        fetchImage()
    }, [fetchImage])

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(image)
        }
    }, [image])

    return (
        <div className="product-preview">
            <div className="content">
                <Link to={`catalog/product?product_id=${product.id}`} className="picture-wrapper">
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
                    {image ? <img src={image} draggable="false" alt={product.name}/> : <Loader/>}
                </Link>
                <div className="info-block">
                    <Link to={`catalog/product?product_id=${product.id}`}>{product.name}</Link>
                    <p>{`${sport_types.length ? sport_types[product.sport_type - 1].title : ''} 
                    / ${product.gender === 'male' ? 'Мужской' : product.gender === 'female' ? 'Женский' : 'Унисекс'} 
                    / ${product.prod_number}`}</p>
                </div>
                <div className="price-block">
                    <Link to={`catalog/product?product_id=${product.id}`}
                          className="product-preview-button">Подробнее</Link>
                    <div className="price-container">
                        {product.new_price && <p className="old-price">{`${product.sale_price} ₽`}</p>}
                        <p className="new-price">{`${product.new_price ? product.new_price : product.sale_price} ₽`}</p>
                    </div>
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

export const LandingProductPreview = connect(mapStateToProps)(ProductPreviewComponent)