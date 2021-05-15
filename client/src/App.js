import React from "react"
import './styles/index.css'
import {Routes} from "./components/Router"
import {useAuth} from "./hooks/auth.hook"
import {AuthContext} from "./AuthContext"
import {BrowserRouter as Router} from "react-router-dom"
import {Provider} from "react-redux"
import store from '../src/redux/configureStore'

function App() {
    const {token, login, logout, userID} = useAuth()
    const isAuthenticated = !!token

    return (
        <Provider store={store}>
            <AuthContext.Provider value={
                {token, login, logout, userID, isAuthenticated}
            }>
                <Router>
                    <Routes isAuthenticated={isAuthenticated}/>
                </Router>
            </AuthContext.Provider>
        </Provider>
    )
}

export default App