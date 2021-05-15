import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {CatalogNavigationItem} from "./CatalogNavigationItem"
import {LinksBlock} from "./LinksBlock"
import {fetchSections} from "../../redux/actions"
import '../../styles/catalog-navigation.css'
import logo from '../../images/logo/logo-long-transper.png'

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
            <div className={`catalog_container${mobileVisible ? ' fixed' : ''}`}>
                <div className="catalog_container_body">
                    <div className={`catalog_button ${mobileVisible ? 'active' : ''}`}
                         onClick={toggleMenu}>
                        <span>{mobileVisible ? "Назад" : "Каталог"}</span>
                        <div className="arrow">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 55.752 55.752">
                                <path
                                    d="M43.006,23.916c-0.28-0.282-0.59-0.52-0.912-0.727L20.485,1.581c-2.109-2.107-5.527-2.108-7.637,0.001   c-2.109,2.108-2.109,5.527,0,7.637l18.611,18.609L12.754,46.535c-2.11,2.107-2.11,5.527,0,7.637c1.055,1.053,2.436,1.58,3.817,1.58   s2.765-0.527,3.817-1.582l21.706-21.703c0.322-0.207,0.631-0.444,0.912-0.727c1.08-1.08,1.598-2.498,1.574-3.912   C44.605,26.413,44.086,24.993,43.006,23.916z"/>
                            </svg>
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

