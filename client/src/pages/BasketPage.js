import React, {useCallback, useContext, useEffect, useState} from "react"
import {Helmet} from "react-helmet-async"
import "../styles/basket-page.css"
import {connect} from "react-redux"
import {
    addAllPreviewsBasket,
    concatProductsPreviewInfo,
    sortProductsPreviewInfo,
    updateProductsPreviewCount,
    updateProductsPreviewInfo
} from "../redux/actions"
import {useHttp} from "../hooks/http.hook";
import {useBasket} from "../hooks/basket.hook";
import {AuthContext} from "../AuthContext";
import {BasketPositionPreview} from "../components/basket/BasketPositionPreview";
import {Loader} from "../components/trivia/Loader";
import {MessagePopup} from "../components/trivia/MessagePopup";

const BasketPageComponent = ({previews, order_products, addPreviews}) => {

    const {request, loading, success, error, clearError, clearSuccess} = useHttp()
    const {token} = useContext(AuthContext)
    const {deleteFromBasket} = useBasket()
    const [show, setShow] = useState(false)
    const selectAllFromBasket = useCallback(async () => {
        const previews = await request('/api/basket/select_all_basket', 'GET',
            null, {
                'Authorization': `Bearer ${token}`
            })
        addPreviews(previews)
    }, [request])

    useEffect(() => {
        selectAllFromBasket()
    }, [selectAllFromBasket])

    const orderButtonHandler = () => {
        setShow(true)
    }

    return (
        <>
            <Helmet>
                <title>Корзина</title>
            </Helmet>
            {show &&  <MessagePopup success={`Заказ №${Date.now()} оформлен`} clearSuccess={()=>{setShow(false)}}/>}
            <div className="basket-page">
                <div className="basket-page-container">
                    <div className="profile-header row">
                        <div className="profile-header-content">
                            <h4>Корзина</h4>
                            <button className="order-button" onClick={orderButtonHandler}>Оформить заказ</button>
                        </div>
                    </div>
                    {loading ? <Loader/> :
                        previews.map((preview, idx) =>
                            <BasketPositionPreview product={preview} key={idx}/>
                        )
                    }
                </div>
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    previews: state.basket.previews,
    order_products: state.basket.order_products
})

const mapDispatchToProps = dispatch => {
    return {
        addPreviews: info => dispatch(addAllPreviewsBasket(info))
    }
}

export const BasketPage = connect(mapStateToProps, mapDispatchToProps)(BasketPageComponent)