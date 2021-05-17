import React, {useContext} from "react";
import '../../styles/header.css';
import {AuthContext} from "../../AuthContext";
import {Link} from "react-router-dom";
import {Icon} from "../svg-icons/Icon";

export const LinksBlock = ({id}) => {
    const {logout} = useContext(AuthContext)

    return (
        <div className="links_block">
            <div className="links_block__item">
                <label className="links_block__item__link" htmlFor={`link_label-${id}`}>
                    <Icon name="user"/>
                    <input type="checkbox" id={`link_label-${id}`}/>
                    <div className="submenu_block">
                        <Link className="submenu_block__button" to="/profile">В личный кабинет</Link>
                        <Link className="submenu_block__button" to="/authorization" onClick={logout}>Выйти</Link>
                    </div>
                </label>
            </div>

            <div className="links_block__item">
                <Link className="links_block__item__link" to="/basket">
                    <Icon name="basket"/>
                </Link>
            </div>
        </div>
    );
}