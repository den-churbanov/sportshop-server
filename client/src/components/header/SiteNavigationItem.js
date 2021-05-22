import React from "react";
import {Link} from "react-router-dom";
import '../../styles/site-navigation.css';

const SiteNavigationItemComponent = ({link, text, hideMobileMenu}) => {
    return (
        <div className="nav_item">
            <Link to={link} className="nav_link" onClick={hideMobileMenu}>{text}</Link>
        </div>
    );
}

const propsAreEqual = (prevProps, nextProps) => prevProps.text === nextProps.text
export const SiteNavigationItem = React.memo(SiteNavigationItemComponent, propsAreEqual)