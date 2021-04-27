import React, {useContext} from "react";
import '../../styles/header.css';
import avatar from "../images/user.png";
import basket from "../images/basket.png";
import {AuthContext} from "../../AuthContext";
import {Link} from "react-router-dom";

export const LinksBlock = ({id}) => {
    const {logout} = useContext(AuthContext)

    return (
        <div className="links_block">
            <div className="links_block__item">
                <label className="links_block__item__link" htmlFor={`link_label-${id}`}>
                    <img  src={avatar} alt="В личный кабинет"/>
                    <input type="checkbox" id={`link_label-${id}`}/>
                    <div className="submenu_block">
                        <Link className="submenu_block__button" to="/profile">В личный кабинет</Link>
                        <Link className="submenu_block__button" onClick={logout}>Выйти</Link>
                    </div>
                </label>
            </div>

            <div className="links_block__item">
                <Link className="links_block__item__link" to="/basket">
                    <img src={basket} alt="Корзина"/>
                </Link>
            </div>
        </div>
    );
}