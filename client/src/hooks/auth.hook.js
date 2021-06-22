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
        console.log('login')
        redirectPreviewPage && redirectPreviewPage()
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserID(null)
        localStorage.removeItem(STORAGE_NAME)
        console.log('logout')
    }, [])

    const checkTokenExpiresIn = useCallback(async () => {
        const data = JSON.parse(localStorage.getItem(STORAGE_NAME))
        if (data && data.token) {
            try {
                const response = await fetch(
                    '/api/user/check_jwt_expires',
                    {
                        method: 'GET',
                        headers: {
                            'content-type': 'application/json',
                            'Authorization': `Bearer ${data.token}`
                        }
                    })
                setReady(true)
                response.status === 401? logout(): login(data.token, data.userID)
                return response.status === 401
            } catch (e) {
                console.log(e)
            }
        }
        setReady(true)
        return true
    }, [])

    useEffect(() => {
        checkTokenExpiresIn()
    }, [checkTokenExpiresIn])

    return {login, logout, checkTokenExpiresIn, token, userID, ready}
}