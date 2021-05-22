import React from "react"
import './styles/index.css'
import {Routes} from "./components/Routes"
import {useAuth} from "./hooks/auth.hook"
import {AuthContext} from "./AuthContext"
import {Provider} from "react-redux"
import store from '../src/redux/configureStore'
import {BrowserRouter as Router} from "react-router-dom"
import {HelmetProvider} from 'react-helmet-async'
import {Loader} from "./components/trivia/Loader"

function App() {
    const {token, login, logout, userID, ready} = useAuth()
    const isAuthenticated = !!token
    if (!ready) return <Loader/>
    return (
        <Provider store={store}>
            <AuthContext.Provider value={
                {token, login, logout, userID, isAuthenticated, ready}
            }>
                <HelmetProvider>
                    <Router>
                        <Routes isAuthenticated={isAuthenticated}/>
                    </Router>
                </HelmetProvider>
            </AuthContext.Provider>
        </Provider>
    )
}

export default App