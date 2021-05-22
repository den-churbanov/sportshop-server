import React from "react"
import '../styles/stub-page.css'
import {Helmet} from "react-helmet-async"

export const _404Page = () => {

    return(
        <>
            <Helmet>
                <title>404 ERROR</title>
            </Helmet>
            <div className="stub_container">
                <h1>Страница не найдена или находится в разработке</h1>
            </div>
        </>
    );
}