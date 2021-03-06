import {useCallback, useState} from "react"

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [status, setStatus] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(url, {method, body, headers})
            setStatus(response.status)
            let data
            if(response.status === 500) setError('Произошла непредвиденная ошибка, перезагрузите страницу')
            if(url === '/api/images/brands_image/logo/') response.headers.get('content-type')
            switch (response.headers.get('content-type')) {
                case 'image/jpeg':
                    data = URL.createObjectURL(await response.blob())
                    break
                default:
                    data = await response.json()
            }
            if (!response.ok) {
                if (data.errors) throw new Error(data.errors[0].msg)
                throw new Error(data.message || 'Произошла ошибка на сервере')
            }
            setLoading(false)
            setSuccess(data.message)
            return data;
        } catch (e) {
            // console.log(e)
            setLoading(false)
            setError(e.message)
        }
    }, []);

    const clearError = () => setError(null)
    const clearSuccess = () => setSuccess(null)
    return {loading, status, request, error, clearError, success, clearSuccess}
}