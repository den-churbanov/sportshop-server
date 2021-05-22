import {useState, useCallback, useEffect} from 'react'

const STORAGE_NAME = 'auth_data'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userID, setUserID] = useState(null)

    const login = useCallback((jwtToken, id, redirectPreviewPage) => {
        setToken(jwtToken)
        setUserID(id)
        localStorage.setItem(STORAGE_NAME, JSON.stringify({
            userID: id,
            token: jwtToken
        }))
        redirectPreviewPage && redirectPreviewPage()
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserID(null)
        localStorage.removeItem(STORAGE_NAME)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(STORAGE_NAME))
        if (data && data.token) {
            login(data.token, data.userID)
        }
        setReady(true)
    }, [login])

    return {login, logout, token, userID, ready}
}