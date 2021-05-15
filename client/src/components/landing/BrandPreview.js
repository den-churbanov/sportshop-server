import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";
import {Loader} from "../Loader";

export const BrandPreview = ({brand}) => {
    const [images, setImages] = useState({
        logo: undefined,
        back: undefined
    })
    const {request} = useHttp()

    useEffect(() => {
        fetchImages()
    }, [])

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(images.logo)
            URL.revokeObjectURL(images.back)
        }
    }, [images])

    async function fetchImages() {
        if(images.logo && images.back) return
        const logo = await request('api/images/brands_image/logo/', 'POST', {imagepath: brand.logo_path})
        const back = await request('api/images/brands_image/back/', 'POST', {imagepath: brand.back_path})
        setImages({
            logo,
            back
        })
    }

    return (
        <div className="brand-preview-block">
            <Link to={`/catalog?brand=${brand.id}`} style={ images.back ? {backgroundImage: `url(${images.back})`}: {}}>
                {images.logo ? <img src={images.logo} className="logo"/> : <Loader/>}
            </Link>
        </div>
    );
}