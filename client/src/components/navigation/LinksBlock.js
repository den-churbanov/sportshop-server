import React, {useContext} from "react";
import '../../styles/header.css';
import avatar from "../images/user.png";
import basket from "../images/basket.png";
import {AuthContext} from "../../AuthContext";

export const LinksBlock = ({id}) => {
    const {logout} = useContext(AuthContext);
    return (
        <div className="links_block">
            <div className="links_block__item">
                <label className="links_block__item__link" htmlFor={`link_label-${id}`}>
                    <img  src={avatar} alt="В личный кабинет"/>
                    <input type="checkbox" id={`link_label-${id}`}/>
                    <div className="submenu_block">
                        <a className="submenu_block__button" href="/profile">В личный кабинет</a>
                        <a className="submenu_block__button" onClick={logout}>Выйти</a>
                    </div>
                </label>
            </div>

            <div className="links_block__item">
                <a className="links_block__item__link" href="/basket">
                    <img src={basket} alt="Корзина"/>
                </a>
            </div>
        </div>
    );
}