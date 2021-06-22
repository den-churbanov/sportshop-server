import React, {useCallback, useEffect, useState} from "react"
import {addAllPreviewsBasket} from "../../redux/actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Loader} from "../trivia/Loader";
import {Icon} from "../trivia/svg-icons/Icon";
import {useHttp} from "../../hooks/http.hook";

const BasketPositionPreviewComponent = ({product, sport_types, brands}) => {
    const [checked, setChecked] = useState(false)
    const [image, setImage] = useState()
    const {request, loading} = useHttp()

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
    }, [product.main_image_path])

    const checkboxHandler = e => {
        setChecked(prevState => !prevState)
    }
    const deleteBtnHandler = e => {

    }

    return (
        <div className="product-preview">
            <div className="content">
                <input type="checkbox"
                       className="option-input checkbox"
                       name={product.product_id}
                       checked={checked}
                       onChange={checkboxHandler}/>
                <Link to={`/catalog/product/${product.product_id}`} className="picture-wrapper">
                    {loading || !image ? <Loader/> : <img src={image} draggable="false" alt={product.name}/>}
                </Link>
                <div className="info-wrapper">
                    <div className="info-block">
                        <Link to={`/catalog/product/${product.product_id}`}>{product.name}</Link>
                        <p>{`${sport_types.length ? sport_types[product.sport_type - 1]?.title : ''}
                    / ${brands.length ? brands[product.brand - 1]?.title : ''}
                    / ${product.gender === 'male' ? 'Мужской' : product.gender === 'female' ? 'Женский' : 'Унисекс'} 
                    / ${product.prod_number}`}</p>
                    </div>
                    <div className="count-container">
                        <span>Количество: {product.count}</span>
                        <span>Размер: {product.size_value}</span>
                    </div>
                    <div className="price-container">
                        {product.new_price && <p className="old-price">{`${product.sale_price} ₽`}</p>}
                        <p className="new-price">{`${product.new_price ? product.new_price : product.sale_price} ₽`}</p>
                    </div>
                </div>
                <button className="delete-btn" onClick={deleteBtnHandler}>
                    <Icon name="delete-basket"/>
                </button>

            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    brands: state.catalog.brands,
    sport_types: state.catalog.sport_types
})

const mapDispatchToProps = dispatch => {
    return {
        addOrderPosition: info => dispatch(addAllPreviewsBasket(info))
    }
}

export const BasketPositionPreview = connect(mapStateToProps, mapDispatchToProps)(BasketPositionPreviewComponent)