import React, {useEffect, useState} from "react"
import {useHttp} from "../../hooks/http.hook"
import {ProductPreview} from "../catalog/ProductPreview"
import {Loader} from "../Loader"
import cx from 'classnames'
import TouchCarousel from "react-touch-carousel"
import touchWithMouseHOC from "react-touch-carousel/lib/touchWithMouseHOC"

export const ProductSlider = ({productsType}) => {

    const {request} = useHttp()
    const [products, setProducts] = useState()

    useEffect(() => {
        if (!products)
            fetchProductByType()
    }, [])

    async function fetchProductByType() {
        if (!!productsType.toString().match('^(?:new|sales|hits)$') ?? [0]) {
            const products = await request(`/api/catalog/products/${productsType}`, 'POST', {lim: 20})
            setProducts(products)
        }
    }

    const carouselWidth = window.innerWidth;
    let cardSize =
        carouselWidth < 576 ?
            carouselWidth :
            carouselWidth < 992 ?
                carouselWidth * 0.5 :
                carouselWidth < 1500 ?
                    carouselWidth * 0.25 :
                    carouselWidth * 0.2;

    const cardPadCount = 3

    function CarouselContainer(props) {
        const {cursor, carouselState: {active, dragging}, ...rest} = props
        let current = -Math.round(cursor) % products.length
        while (current < 0) {
            current += products.length
        }
        const translateX = (cursor - cardPadCount) * cardSize + (carouselWidth - cardSize)

        return (
            <div
                className={cx(
                    'carousel-container',
                    {
                        'is-active': active,
                        'is-dragging': dragging
                    }
                )}>
                <div
                    className='carousel-track'
                    style={{transform: `translate3d(${translateX}px, 0, 0)`}}
                    {...rest}
                />
            </div>
        )
    }

    function renderCard(index, modIndex) {
        const product = products[modIndex]
        return (<ProductPreview key={index} product={product}/>)
    }

    const Container = touchWithMouseHOC(CarouselContainer)

    return (
        products ?
            <TouchCarousel
                component={Container}
                cardCount={products.length}
                cardSize={cardSize}
                renderCard={renderCard}
                loop
                autoplay={6000}
            />
            : <Loader/>
    );
}



