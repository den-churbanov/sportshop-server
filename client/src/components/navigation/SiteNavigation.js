import React, {useState} from 'react';
import '../../styles/site-navigation.css';
import {SiteNavigationItem} from "./SiteNavigationItem";
import {Search} from "./Search";

export const SiteNavigation = () => {
    const [menuState, setState] = useState({
        mobileVisible: false
    });

    const linksNames = ['Наши магазины',
                        'Доставка и оплата',
                        'Возврат и обмен',
                        'Оптовым клиентам',
                        'Размерная сетка',
                        'Нанесение на форму',
                        'Наши вакансии'];

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
            className={menuState.mobileVisible ? 'site_navigation_header site_navigation__fixed' : 'site_navigation_header'}>
            <div className={`site_header_block ${menuState.mobileVisible ? 'site_header_block_show' : ''}`}>
                <h4>Навигация по сайту</h4>
            </div>
            <div className="navigation_container">
                <div className="site_navigation_header_body">
                    <Search/>
                    <div className={`header_burger ${menuState.mobileVisible ? 'header_burger_active' : ''}`}
                         onClick={toggleMenu}>
                        <span/>
                    </div>
                    <nav className={`site_header_list ${menuState.mobileVisible ? 'active ' : ''}`}>
                        {linksNames.map((name, index) =>{
                            return <SiteNavigationItem text={name} key = {index} link="/stub"/>
                        })}
                    </nav>
                </div>
            </div>
        </header>
    );
}

