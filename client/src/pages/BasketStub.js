import React from "react"
import {Helmet} from "react-helmet-async";
import "../styles/basket-page.css"

export const BasketPage = () => {

    return (
        <>
            <Helmet>
                <title>Корзина</title>
            </Helmet>
            <div className="basket-page">
                <div className="text-wrapper">
                    <h4>Увы, ни мозгов, ни времени на разработку этого раздела сайта у меня не хватило.</h4>
                    <p>Когда нибудь в другой... жизни</p>
                </div>
            </div>
        </>
    );

}