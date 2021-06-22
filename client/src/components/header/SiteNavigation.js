import React, {useEffect, useState} from 'react'
import '../../styles/site-navigation.css'
import {SiteNavigationItem} from './SiteNavigationItem'
import {Search} from './Search'
import {SiteNavigationLinks} from './SiteNavigationLinks'

export const SiteNavigation = () => {
    const [mobileActive, setMobileActive] = useState(false)
    const [onTop, setOnTop] = useState(false)

    useEffect(() => {
        if (mobileActive) {
            setOnTop(true)
        }
        else {
            setTimeout(() => setOnTop(false), 1000)
        }
    }, [mobileActive])

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
            className={`site_navigation_header ${mobileActive ? ' site_navigation__fixed' : ''} ${onTop ? ' z-index-top' : ''}`}>
            <div className={`site_header_block ${mobileActive ? 'site_header_block_show' : ''}`}>
                <h4>Навигация по сайту</h4>
            </div>
            <div className="navigation_container">
                <div className="site_navigation_header_body">
                    <Search/>
                    <div className={`bars${mobileActive ? ' is-active' : ''}`} onClick={toggleMenu}>
                        <span/>
                    </div>
                    <nav className={`site_header_list ${mobileActive ? 'active ' : ''}`}>
                        {SiteNavigationLinks.map((item, index) => {
                            return <SiteNavigationItem text={item.title}
                                                       key={index}
                                                       link={item.link}
                                                       hideMobileMenu={hideMobileMenu}/>
                        })}
                    </nav>
                </div>
            </div>
        </header>
    );
}

