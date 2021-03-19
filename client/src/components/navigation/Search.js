import React from "react";
import '../../styles/header.css';
import search_icon from '../images/searching-icon.png';

export const Search = ()=> {
    return(
        <div className="search-container">
            <div className="search-block">
                <input type="text" placeholder="Введите запрос"/>
                <div className="search-btn">
                    <img src={search_icon} alt='Поиск'/>
                </div>
            </div>
        </div>
    );
}
