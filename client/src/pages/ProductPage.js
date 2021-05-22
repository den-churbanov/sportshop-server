import React from "react"
import {Helmet} from "react-helmet-async";

export const ProductPage = () => {
    return (
        <>
            <Helmet>
                <title>Название продукта</title>
            </Helmet>
            <div className="">
                <h1>Product</h1>
            </div>
        </>
    );
}