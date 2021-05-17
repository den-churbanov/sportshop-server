import React, {useState} from 'react'
import '../../styles/site-navigation.css'
import {SiteNavigationItem} from './SiteNavigationItem'
import {Search} from './Search'
import {SiteNavigationLinks} from './SiteNavigationLinks'

export const SiteNavigation = () => {
    const [menuState, setState] = useState({
        mobileVisible: false
    });

    const lockBodyScroll = () => {
        if (menuState.mobileVisible === false) {
            document.body.style.overflowY = 'hidden'
        }
        else {
            document.body.style.overflowY = 'scroll'
        }
    }

    const toggleMenu = () => {
        lockBodyScroll();
        setState(prevState => {
            return {
                ...prevState,
                mobileVisible: !prevState.mobileVisible
            }
        })
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
                    <div className="bars" onClick={toggleMenu}>
                        <span className={`${menuState.mobileVisible ? 'is-active' : ''}`}/>
                    </div>
                    <nav className={`site_header_list ${menuState.mobileVisible ? 'active ' : ''}`}>
                        {SiteNavigationLinks.map((item, index) =>{
                            return <SiteNavigationItem text={item.title} key = {index} link={item.link}/>
                        })}
                    </nav>
                </div>
            </div>
        </header>
    );
}

