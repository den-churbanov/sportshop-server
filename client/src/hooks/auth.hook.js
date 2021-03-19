import {useState, useCallback, useEffect} from 'react';

const STORAGE_NAME = 'auth_data';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userID, setUserID] = useState(null);

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setUserID(id);

        localStorage.setItem(STORAGE_NAME, JSON.stringify({
            userID: id,
            token: jwtToken
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserID(null);

        localStorage.removeItem(STORAGE_NAME);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(STORAGE_NAME));
        if (data && data.token) {
            login(data.token, data.userID);
        }
    }, [login]);

    return {login, logout, token, userID};
}