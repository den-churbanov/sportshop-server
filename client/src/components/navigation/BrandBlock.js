import React from "react";
import {Link} from "react-router-dom";
import '../styles/brands.css';

export const BrandBlock = (item) => {
    return (
        <div className="brand-block">
            <Link to = {}>
                <div className="brand-hover">

                </div>
                <div className="brand-logo">
                    <img src={} />
                </div>
                <div className="brand-img">
                    <img src={}/>
                </div>
            </Link>
        </div>
    );
}