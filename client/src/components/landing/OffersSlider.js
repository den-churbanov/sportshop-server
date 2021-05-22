import React, {useCallback, useEffect, useState} from 'react'
import {useHttp} from "../../hooks/http.hook"
import {Loader} from "../trivia/Loader"
import {Link} from "react-router-dom";
import {Icon} from "../trivia/svg-icons/Icon";

export const OffersSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [interval, setStateInterval] = useState(null)
    const [offers, setOffers] = useState([])
    const {request} = useHttp()

    let initial = 0
    const fetchOffers = useCallback(async () => {
        const offers = await request('api/catalog/special_offers')
        for (const offer of offers) {
            offer.image_path = await request('api/images/special_offers', 'POST', {imagepath: offer.image_path})
        }
        setOffers(offers)
    }, [request, setOffers])
    useEffect(() => {
        fetchOffers()
    }, [fetchOffers])
    //удаление blobObjectURL из памяти
    useEffect(() => {
        return () => {
            offers.map(offer =>
                URL.revokeObjectURL(offer.image_path)
            )
        }
    }, [offers])

    const createInfiniteScroll = () => {
        if (!offers.length || interval) return
        const handler = setInterval(() => {
            setActiveIndex((current) => {
                const res = current === offers.length - 1 ? 0 : current + 1
                return res
            })
        }, 6000)
        setStateInterval(handler)
        return () => clearInterval(handler)
    }

    useEffect(() => {
        return createInfiniteScroll()
    }, [offers])


    const clearInfiniteScroll = () => {
        if (!interval) return
        console.log('clearInfiniteScroll')
        clearInterval(interval)
        setStateInterval(null)
    }

    if (!offers.length) return (<Loader/>)

    const prevImgIndex = activeIndex ? activeIndex - 1 : offers.length - 1
    const nextImgIndex = activeIndex === offers.length - 1 ? 0 : activeIndex + 1

    const prevHandler = e => {
        setActiveIndex((current) => {
            const res = current ? current - 1 : offers.length - 1
            return res
        })
        clearInfiniteScroll()
    }

    const nextHandler = e => {
        setActiveIndex((current) => {
            const res = current === offers.length - 1 ? 0 : current + 1
            return res
        })
        clearInfiniteScroll()
    }

    const onTouchStartHandler = e => {
        e.preventDefault()
        initial = e.touches[0].clientX
    }

    const onTouchEndHandler = e => {
        e.preventDefault()
        if (initial === e.changedTouches[0].clientX) {
            e.target.click()
            return
        }
        initial - e.changedTouches[0].clientX < 0 ? prevHandler() : nextHandler()
    }

    return (
        <div className="slider"
             onMouseLeave={createInfiniteScroll}
             onTouchStart={onTouchStartHandler}
             onTouchEnd={onTouchEndHandler}>
            <div className="slider-button prev" onClick={prevHandler}>
                <Icon name="slider-arrow"/>
            </div>
            <Link to={`/catalog${offers[prevImgIndex].link}`}
                  className="slider-item slider-item-prev"
                  key={prevImgIndex}>
                <img src={offers[prevImgIndex].image_path} alt={offers[prevImgIndex].link}/>
            </Link>
            <Link to={`/catalog${offers[activeIndex].link}`}
                  className="slider-item"
                  key={activeIndex}>
                <img draggable="false" src={offers[activeIndex].image_path} alt={offers[activeIndex].link}/>
            </Link>
            <Link to={`/catalog${offers[nextImgIndex].link}`}
                  className="slider-item slider-item-next"
                  key={nextImgIndex}>
                <img src={offers[nextImgIndex].image_path} alt={offers[nextImgIndex].link}/>
            </Link>
            <div className="slider-button next" onClick={nextHandler}>
                <Icon name="slider-arrow"/>
            </div>
            <div className="dots-container">
                {
                    offers.map((_, idx) => {
                        return <div key={idx} className={`dot${idx === activeIndex ? ' active' : ''}`}/>
                    })
                }
            </div>
        </div>
    )
}