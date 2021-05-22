import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {CatalogNavigationItem} from "./CatalogNavigationItem"
import {LinksBlock} from "./LinksBlock"
import {fetchSections} from "../../redux/actions"
import '../../styles/catalog-navigation.css'
import logo from '../../images/logo/logo-long-transper.png'
import {Icon} from "../trivia/svg-icons/Icon"

const Navigation = ({sections, getSections}) => {
    const [fixed, setFixed] = useState(false)
    const [mobileActive, setMobileActive] = useState(false)

    useEffect(() => {
        getSections()
    }, [getSections])

    window.onscroll = () => {
        if (window.pageYOffset > 140 & !fixed) {
            setFixed(true)
        }
        else if (window.pageYOffset < 140 & fixed) {
            setFixed(false)
        }
    }

    const toggleMenu = () => {
        document.body.style.overflowY = document.body.style.overflowY === 'hidden' ? 'scroll' : 'hidden'
        setMobileActive(prevState => !prevState)
    }

    const hideMobileMenu = () => {
        setMobileActive(prevState => {
            if (prevState) {
                document.body.style.overflowY = 'scroll'
                return !prevState
            }
            return prevState
        })

    }

    return (
        <header
            className={`catalog_header${fixed ? ' fixed' : ''}`}>
            <div className={`catalog_header_block${mobileActive ? ' show' : ''}`}/>
            <div className={`catalog_nav_container${mobileActive ? ' fixed' : ''}`}>
                <div className="catalog_container_body">
                    <div className={`catalog_button ${mobileActive ? 'active' : ''}`}
                         onClick={toggleMenu}>
                        <span>{mobileActive ? "Назад" : "Каталог"}</span>
                        <div className="arrow">
                            <Icon name="right-arrow"/>
                        </div>
                    </div>
                    <Link to="/main"
                          className={`header_logo__hidden ${fixed && !mobileActive ? 'header_logo' : ''}`}>
                        <img src={logo} alt="На главную"/>
                    </Link>
                    <nav className={`catalog_nav_list ${mobileActive ? 'active' : ''}`}>
                        {sections ? sections.map((item, idx) => {
                            return <CatalogNavigationItem text={item.title}
                                                          id={item.id}
                                                          idx={idx}
                                                          key={idx}
                                                          hideMobileMenu={hideMobileMenu}
                            />
                        }) : ""}
                    </nav>
                    <LinksBlock/>
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
