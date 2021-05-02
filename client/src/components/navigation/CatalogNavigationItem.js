import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import '../../styles/catalog-navigation.css';
import {useDispatch, useSelector} from "react-redux";
import {fetchSubSections} from "../../redux/actions";

export const CatalogNavigationItem = ({text, id, idx}) => {
    const dispatch = useDispatch();

    const subItems = useSelector(state => state.sections.items[idx].subsections)

    useEffect(() => {
        dispatch(fetchSubSections(id, idx))
    }, []);

    return (
        <li className="catalog_item">
            <Link to= {'/'} className="catalog_link hide_href">{text}</Link>
            <label htmlFor={`link-${id}`} className="catalog_link hide_label">{text}</label>
            <input type="checkbox" id={`link-${id}`}/>
            <ul className="submenu-list">
                {subItems? subItems.map((item, idx) => {
                    return <li key={idx}><Link to={'/'}>{item.title}</Link></li>;
                }): ""
                }
            </ul>
        </li>
    );
}