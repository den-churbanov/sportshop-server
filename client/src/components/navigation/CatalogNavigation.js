import React, {useEffect, useState} from 'react';
import '../../styles/catalog-navigation.css';
import {CatalogNavigationItem} from "./CatalogNavigationItem";
import logo from '../images/logo-long-transper.png';
import arrow from '../images/arrow.png';
import {LinksBlock} from "./LinksBlock";
import {useDispatch, useSelector} from "react-redux";
import {fetchSections} from "../../redux/actions";
import {Link} from "react-router-dom";

export const CatalogNavigation = () => {
    const [menuState, setState] = useState({
        mobileVisible: false,
        fixed: false
    });
    const dispatch = useDispatch();

    const items = useSelector(state => state.sections.items);

    useEffect(() => {
        if(!items)
        dispatch(fetchSections())
    }, []);


    window.onscroll = () => {
        if (window.pageYOffset > 140 & !menuState.fixed) {
            setState(prevState => {
                return {
                    ...prevState,
                    fixed: true
                }
            });
        }
        else if (window.pageYOffset === 0 & menuState.fixed) {
            setState(prevState => {
                return {
                    ...prevState,
                    fixed: false
                }
            });
        }
    }

    const lockBodyScroll = () => {
        if (menuState.mobileVisible === false) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'scroll';
        }
    }

    const toggleMenu = () => {
        lockBodyScroll();
        setState(prevState => {
            return {
                ...prevState,
                mobileVisible: !prevState.mobileVisible
            }
        });
    }

    return (
        <header
            className={menuState.fixed || menuState.mobileVisible ? 'catalog_header fixed' : 'catalog_header'}>
            <div className={`catalog_header_block ${menuState.mobileVisible ? 'show' : ''}`}/>
            <div className="catalog_container">
                <div className="catalog_container_body">
                    <div className={`catalog_button ${menuState.mobileVisible ? 'active' : ''}`}
                         onClick={toggleMenu}>
                        <span>{menuState.mobileVisible ? "Назад" : "Каталог"}</span>
                        <div className="arrow">
                            <img src={arrow} alt=""/>
                        </div>
                    </div>
                    <Link to="/main" className={`header_logo__hidden ${menuState.fixed ? 'header_logo' : ''}`}>
                        <img src={logo} alt="На главную"/>
                    </Link>
                    <nav className={`catalog_nav_list ${menuState.mobileVisible ? 'active' : ''}`}>
                        {items ? items.map((item, idx) => {
                            return <CatalogNavigationItem text={item.name} id={item.id} idx = {idx} key={idx}/>
                        }) : ""}
                    </nav>
                    <LinksBlock id={2}/>
                </div>
            </div>
        </header>
    );
}


