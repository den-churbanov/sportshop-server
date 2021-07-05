import React, {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";
import {Loader} from "../trivia/Loader";

export const BrandPreview = ({brand}) => {
    const [images, setImages] = useState({
        logo: undefined,
        back: undefined
    })
    const {request} = useHttp()

    const fetchImages = useCallback(async () => {
        if (images.logo && images.back) return
        const logo = await request('/api/images/brands_image/logo/', 'POST', {imagepath: brand.logo_path})
        const back = await request('/api/images/brands_image/back/', 'POST', {imagepath: brand.back_path})
        setImages({
            back,
            logo
        })
    }, [setImages, images, request, brand])

    useEffect(() => {
        fetchImages()
    }, [fetchImages])

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(images.logo)
            URL.revokeObjectURL(images.back)
        }
    }, [images])

    return (
        <div className="brand-preview-block">
            <Link to={`/catalog?brand=${brand.id}`} style={images.back ? {backgroundImage: `url(${images.back})`} : {}}>
                {images.logo ?
                    <img src={images.logo} className="logo" alt={brand.title}/> :
                    <Loader/>}
            </Link>
        </div>
    );
}