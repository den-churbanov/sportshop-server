import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import '../../styles/catalog-navigation.css';
import {connect} from "react-redux";
import {fetchSubSections} from "../../redux/actions";

export const CatalogNavigationItemComponent = ({text, id, subsections,  getSubSections}) => {

    useEffect(() => {
        if (!subsections) getSubSections()
    }, []);

    return (
        <li className="catalog_item">
            <Link to={`/catalog?section=${id}`} className="catalog_link hide_href">{text}</Link>
            <label htmlFor={`link-${id}`} className="catalog_link hide_label">{text}</label>
            <input type="checkbox" id={`link-${id}`}/>
            <ul className="submenu-list">
                {subsections ? subsections.map((item, idx) => {
                    return <li key={idx}><Link to={`/catalog?subsection=${item.id}`}>{item.title}</Link></li>;
                }) : ""
                }
            </ul>
        </li>
    );
}

const mapStateToProps = (state, props) => {
    return {
        subsections: state.catalog.sections[props.idx].subsections,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getSubSections: async () => dispatch(fetchSubSections(props.id, props.idx))
    }
}

export const CatalogNavigationItem = connect(mapStateToProps, mapDispatchToProps)(CatalogNavigationItemComponent)