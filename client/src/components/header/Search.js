import React from "react";
import '../../styles/header.css';
import {Icon} from "../svg-icons/Icon";

export const Search = () => {
    return (
        <div className="search-block">
            <input type="text" placeholder="Введите запрос"/>
            <div className="search-btn">
                <Icon name="search"/>
            </div>
        </div>
    );
}
