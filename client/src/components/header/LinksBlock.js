import React from "react"
import '../../styles/header.css'
import {Link} from "react-router-dom"
import {Icon} from "../trivia/svg-icons/Icon"

export const LinksBlock = () => {
    return (
        <div className="links_block">
            <div className="links_block__item">
                <Link className="links_block__item__link" to="/profile">
                    <Icon name="user"/>
                </Link>
            </div>

            <div className="links_block__item">
                <Link className="links_block__item__link" to="/basket">
                    <Icon name="basket"/>
                </Link>
            </div>
        </div>
    );
}