import React, {useContext} from "react"
import {AuthContext} from "../AuthContext"
import "../styles/profile-page.css"
import {Helmet} from "react-helmet-async"

export const ProfilePage = () => {
    const {logout} = useContext(AuthContext)
    return (
        <>
            <Helmet>
                <title>Личный кабинет</title>
            </Helmet>
            <div className="profile-page-container">
                <button className="logout-btn" onClick={logout}>Выйти</button>
            </div>
        </>
    );
}