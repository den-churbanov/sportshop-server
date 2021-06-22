import React, {useContext, useState} from "react"
import '../styles/header.css'
import logo from '../images/logo/logo-long-transper.png'
import {Search} from "./header/Search"
import {LinksBlock} from "./header/LinksBlock"
import {Link} from "react-router-dom"

export const Header = () => {

    return (
        <header className="header-top">
            <div className="container">
                <div className="img-wrapper">
                    <Link to="/main">
                        <img src={logo} alt="На главную"/>
                    </Link>
                </div>
                <Search/>
                <div className="header-contacts">
                    <h6>Звонок по России бесплатный</h6>
                    <div className="number-block">
                        <a href="tel:79278988843">+7 (927) 898-88-43</a>
                    </div>
                    <p>Ежедневно с 8:00 до 24:00 (Самара)</p>
                </div>
                <LinksBlock/>
            </div>
        </header>
    );
}