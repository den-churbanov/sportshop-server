import React, {useContext} from "react";
import '../../styles/header.css';
import avatar from "../../images/user.png";
import basket from "../../images/basket.png";
import {AuthContext} from "../../AuthContext";
import {Link} from "react-router-dom";

export const LinksBlock = ({id}) => {
    const {logout} = useContext(AuthContext)

    return (
        <div className="links_block">
            <div className="links_block__item">
                <label className="links_block__item__link" htmlFor={`link_label-${id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 512 512">
                        <path d="M256,0C114.844,0,0,114.844,0,256s114.844,256,256,256s256-114.844,256-256S397.156,0,256,0z M256,74.667    c67.635,0,122.667,55.031,122.667,122.667S323.635,320,256,320s-122.667-55.031-122.667-122.667S188.365,74.667,256,74.667z     M256,469.333c-69.707,0-131.52-33.755-170.473-85.615c42.676-20.534,103.621-42.385,170.473-42.385    c66.857,0,127.807,21.854,170.474,42.383C387.521,435.577,325.708,469.333,256,469.333z"/>
                    </svg>
                    <input type="checkbox" id={`link_label-${id}`}/>
                    <div className="submenu_block">
                        <Link className="submenu_block__button" to="/profile">В личный кабинет</Link>
                        <Link className="submenu_block__button" to="/authorization" onClick={logout}>Выйти</Link>
                    </div>
                </label>
            </div>

            <div className="links_block__item">
                <Link className="links_block__item__link" to="/basket">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 512 512">
                        <path d="m497 181h-52.791l-115.496-144.37c-5.174-6.467-14.613-7.518-21.083-2.342-6.469 5.175-7.518 14.614-2.342 21.083l100.503 125.629h-299.582l100.504-125.629c5.175-6.469 4.126-15.909-2.342-21.083-6.47-5.176-15.909-4.126-21.083 2.342l-115.497 144.37h-52.791c-8.284 0-15 6.716-15 15v30c0 8.284 6.716 15 15 15h482c8.284 0 15-6.716 15-15v-30c0-8.284-6.716-15-15-15z"/>
                        <path d="m90.577 470.121c1.84 6.44 7.726 10.879 14.423 10.879h302c6.697 0 12.583-4.439 14.423-10.879l56.891-199.121h-444.628zm234.127-66.586 15-90c1.362-8.172 9.09-13.696 17.262-12.33 8.172 1.362 13.692 9.09 12.33 17.262l-15 90c-1.223 7.337-7.578 12.537-14.778 12.537-.819 0-1.649-.067-2.484-.207-8.172-1.362-13.692-9.091-12.33-17.262zm-83.704-87.535c0-8.284 6.716-15 15-15s15 6.716 15 15v90c0 8.284-6.716 15-15 15s-15-6.716-15-15zm-84.966-14.795c8.173-1.361 15.9 4.158 17.262 12.33l15 90c1.362 8.171-4.158 15.9-12.33 17.262-.834.139-1.665.207-2.484.207-7.201 0-13.555-5.199-14.778-12.537l-15-90c-1.362-8.172 4.158-15.901 12.33-17.262z"/>
                    </svg>
                </Link>
            </div>
        </div>
    );
}