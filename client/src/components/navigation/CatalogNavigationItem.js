import React from "react";
import '../../styles/catalog-navigation.css';

export const CatalogNavigationItem = ({text, id}) => {
    return (
        <li className="catalog_item">
            <a className="catalog_link hide_href">{text}</a>
            <label htmlFor={`link-${id}`} className="catalog_link hide_label">{text}</label>
            <input type="checkbox" id={`link-${id}`}/>
            {/*<ul className="submenu-list">*/}
            {/*    {subitems.map((item, idx) => {*/}
            {/*        return <li key={idx}><a href={"/"}>{item.toString()}</a></li>;*/}
            {/*    })*/}
            {/*    }*/}
            {/*</ul>*/}
        </li>
    );
}