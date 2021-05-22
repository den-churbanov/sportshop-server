import React, {useEffect} from "react"
import {Link} from "react-router-dom"
import '../../styles/catalog-navigation.css'
import {connect} from "react-redux"
import {fetchSubSections} from "../../redux/actions"

export const CatalogNavigationItemComponent = ({text, id, subsections, getSubsections, hideMobileMenu}) => {

    useEffect(() => {
        getSubsections()
    }, [getSubsections])

    return (
        <li className="catalog_item">
            <Link to={`/catalog?section=${id}`} className="catalog_link">{text}</Link>
            <label htmlFor={`link-${id}`} className="catalog_link">{text}</label>
            <input type="checkbox" id={`link-${id}`}/>
            <ul className="submenu-list">
                {subsections ? subsections.map((item, idx) => {
                    return <li key={idx}><Link to={`/catalog?subsection=${item.id}`}
                                               onClick={hideMobileMenu}>{item.title}</Link>
                    </li>;
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
        getSubsections: async () => dispatch(fetchSubSections(props.id, props.idx)),
    }
}

const propsAreEqual = (prevProps, nextProps) => prevProps.subsections === nextProps.subsections
export const CatalogNavigationItem = React.memo(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CatalogNavigationItemComponent), propsAreEqual)