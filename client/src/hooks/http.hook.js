import {useCallback, useState} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }
            const response = await fetch(url, {method, body, headers})
            let data
            switch (response.headers.get('content-type')) {
                case 'image/jpeg':
                    data = URL.createObjectURL(await response.blob())
                    break
                default:
                    //application/json; charset=utf-8
                    data = await response.json()
            }
            if (!response.ok) {
                if (data.errors) throw new Error(data.errors[0].msg);
                throw new Error(data.message || 'Произошла ошибка на сервере');
            }
            setLoading(false);
            setSuccess(data.message);
            return data;
        } catch (e) {
            console.log(e)
            setLoading(false);
            setError(e.message);
        }
    }, []);

    const clearError = () => setError(null);
    const clearSuccess = () => setSuccess(null);
    return {loading, request, error, clearError, success, clearSuccess};
}