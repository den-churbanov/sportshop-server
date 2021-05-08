import React, {useState} from "react";
import '../styles/header.css';
import logo from '../images/logo-transparence.png';
import {Search} from "./navigation/Search";
import {LinksBlock} from "./navigation/LinksBlock";
import {Link} from "react-router-dom";

export const Header = () => {
    const [headerState, setState] = useState({visible: true})
    window.onscroll = () => {
        if (window.pageYOffset > 140) {
            setState(prevState => {
                return {
                    ...prevState,
                    visible: false
                }
            });
        }
        else if (window.pageYOffset < 30) {
            setState(prevState => {
                return {
                    ...prevState,
                    visible: true
                }
            });
        }
    }

    return (
        <header className={headerState.visible ? 'header-top' : 'header-top hide'}>
            <div className="container">
                <div className="header-content">
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
                    <LinksBlock id = {1}/>
                </div>
            </div>
        </header>
    );
}