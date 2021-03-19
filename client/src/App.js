import React from "react";
import './styles/index.css'
import {Routes} from "./components/Router";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./AuthContext";
import {BrowserRouter as Router} from "react-router-dom";

function App() {
    const {token, login, logout, userID} = useAuth();
    const isAuthenticated = !!token;
    return (
        <AuthContext.Provider value={
            {token, login, logout, userID, isAuthenticated}
        }>
            <Router>
                <Routes isAuthenticated={isAuthenticated}/>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;