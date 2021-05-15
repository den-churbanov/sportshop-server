import React from "react";
import {Header} from "../components/Header";
import {SiteNavigation} from "../components/header/SiteNavigation";
import {CatalogNavigation} from "../components/header/CatalogNavigation";
import {Footer} from "../components/Footer";

export const WrapperPage = ({children}) => {
    return (
        <div className="wrapper">
            <Header/>
            <SiteNavigation/>
            <CatalogNavigation/>
            <div className="content-container">
                {children}
            </div>
            <Footer/>
        </div>
    );
}