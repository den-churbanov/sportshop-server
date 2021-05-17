import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {CatalogNavigationItem} from "./CatalogNavigationItem"
import {LinksBlock} from "./LinksBlock"
import {fetchSections} from "../../redux/actions"
import '../../styles/catalog-navigation.css'
import logo from '../../images/logo/logo-long-transper.png'
import {Icon} from "../svg-icons/Icon"

const Navigation = ({sections, getSections}) => {
    const [fixed, setFixed] = useState(false)
    const [mobileVisible, setMobileVisible] = useState(false)

    useEffect(() => {
        if (!sections.length) getSections()
    }, [])


    window.onscroll = () => {
        if (window.pageYOffset > 140 & !fixed) {
            setFixed(true)
            console.log('fixed')
        }
        else if (window.pageYOffset < 140 & fixed) {
            setFixed(false)
            console.log('not fixed')
        }
    }

    const lockBodyScroll = () => {
        if (mobileVisible === false) {
            document.body.style.overflowY = 'hidden';
        }
        else {
            document.body.style.overflowY = 'scroll';
        }
    }

    const toggleMenu = () => {
        lockBodyScroll()
        setMobileVisible(prevState => !prevState)
    }

    return (
        <header
            className={`catalog_header${fixed? ' fixed' : ''}`}>
            <div className={`catalog_header_block${mobileVisible ? ' show' : ''}`}/>
            <div className={`catalog_nav_container${mobileVisible ? ' fixed' : ''}`}>
                <div className="catalog_container_body">
                    <div className={`catalog_button ${mobileVisible ? 'active' : ''}`}
                         onClick={toggleMenu}>
                        <span>{mobileVisible ? "Назад" : "Каталог"}</span>
                        <div className="arrow">
                            <Icon name="right-arrow"/>
                        </div>
                    </div>
                    <Link to="/main" className={`header_logo__hidden ${fixed && !mobileVisible ? 'header_logo' : ''}`}>
                        <img src={logo} alt="На главную"/>
                    </Link>
                    <nav className={`catalog_nav_list ${mobileVisible ? 'active' : ''}`}>
                        {sections ? sections.map((item, idx) => {
                            return <CatalogNavigationItem text={item.title} id={item.id} idx={idx} key={idx}/>
                        }) : ""}
                    </nav>
                    <LinksBlock id={2}/>
                </div>
            </div>
        </header>
    );
}

const mapStateToProps = state => {
    return {
        sections: state.catalog.sections,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSections: async () => dispatch(fetchSections())
    }
}

export const CatalogNavigation = connect(mapStateToProps, mapDispatchToProps)(Navigation)

