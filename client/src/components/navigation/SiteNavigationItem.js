import React from "react";
import '../../styles/site-navigation.css';

export const SiteNavigationItem = ({link, text}) => {
    return (
        <div className="nav_item">
            <a href={link} className="nav_link">{text}</a>
        </div>
    );
}