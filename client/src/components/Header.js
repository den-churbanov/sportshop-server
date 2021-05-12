import React, {useState} from "react";
import '../styles/header.css';
import logo from '../images/logo-long-transper.png';
import {Search} from "./navigation/Search";
import {LinksBlock} from "./navigation/LinksBlock";
import {Link} from "react-router-dom";

export const Header = () => {
    const [visible, setVisible] = useState(true)

    window.onscroll = () => {
        if (window.pageYOffset > 140) {
            setVisible(false);
        }
        else if (window.pageYOffset < 30) {
            setVisible(true);
        }
    }

    return (
        <header className={visible ? 'header-top' : 'header-top hide'}>
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
                <LinksBlock id={1}/>
            </div>
        </header>
    );
}