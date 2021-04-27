import React from "react";
import {Link} from "react-router-dom";
import '../../styles/site-navigation.css';


export const SiteNavigationItem = ({link, text}) => {
    return (
        <div className="nav_item">
            <Link to={link} className="nav_link">{text}</Link>
        </div>
    );
}