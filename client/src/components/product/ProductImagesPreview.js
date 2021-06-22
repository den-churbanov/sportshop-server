import React, {useCallback, useEffect, useRef, useState} from "react"
import {useHttp} from "../../hooks/http.hook"
import {Loader} from "../trivia/Loader"

export const ProductImagesPreview = ({product}) => {

    const [imageURLs, setImageURLs] = useState([])
    const {request} = useHttp()
    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState(0)

    const downloadImages = useCallback(async () => {
        setLoading(true)
        const URLs = []
        for (const img of product.images) {
            const URL = await request('/api/images/products', 'POST', {imagepath: img.image_path})
            if (URL)
                URLs.push(URL)
        }
        setImageURLs(URLs)
        setLoading(false)
    }, [setLoading, setImageURLs, request])

    useEffect(() => {
        downloadImages()
        return () => {
            imageURLs.forEach(url=>{
                URL.revokeObjectURL(url)
            })
        }
    }, [product])


    if (loading) return <Loader/>
    return (
        <div className="products-image-preview-container">
            <div className="products-image-preview-wrapper">
                {imageURLs.map((URL, idx) =>
                    <div className="img-block" key={idx}>
                        <img draggable="false" src={URL} onClick={() => setActive(idx)}/>
                    </div>
                )}
            </div>
            <div className="main-image">
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
                <img draggable="false" src={imageURLs[active]}/>
            </div>
        </div>
    )
}