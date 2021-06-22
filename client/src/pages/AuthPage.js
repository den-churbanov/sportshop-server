import React, {useContext, useEffect, useState} from "react"
import {
    useHistory,
    useLocation
} from "react-router-dom"
import '../styles/auth-page.css'
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../AuthContext"
import {Tooltip} from "../components/trivia/Tooltip"
import {Helmet} from "react-helmet-async"

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const location = useLocation()
    const [pageState, setState] = useState('login')
    const {from} = location.state || {from: {pathname: "/main"}}

    const [data, setData] = useState(
        {
            firstname: "",
            lastname: "",
            patronymic: "",
            login: "",
            password: ""
        })

    const {request, loading, error, clearError, success, clearSuccess} = useHttp()

    useEffect(() => {
        if (error)
            setTimeout(() => clearError(), 3000)
        if (success)
            setTimeout(() => clearSuccess(), 3000)
    }, [error, success, clearError, clearSuccess])

    const inputNames = {
        firstname: "firstname",
        lastname: "lastname",
        patronymic: "patronymic",
        login: "login",
        password: "password"
    }

    const registerHandler = async () => {
        try {
            await request('/api/auth/signup', 'POST', {...data})
        } catch (e) {
        }
    }

    const loginHandler = async () => {
        try {
            const login = data.login;
            const password = data.password;
            const result = await request('/api/auth/signin', 'POST', {login, password})
            auth.login(result.token, result.userID, () => {
                history.push(from)
            })
        } catch (e) {
        }
    }

    const handleUserInput = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(prevData => {
            return {...prevData, [name]: value}
        })
    }

    const changeMode = () => {
        setState(prevState => prevState === 'login' ? 'register' : 'login')
    }


    return (
        <>
            <Helmet>
                <title>Авторизация</title>
            </Helmet>
            <div className="auth_container">
                <div className="auth_content">
                    <p>Чтобы использовать {from.pathname === '/profile' ? 'личный кабинет':
                        from.pathname === '/basket' ? 'корзину': 'все возможности сайта'}, необходимо авторизоваться</p>
                    {from && <button onClick={() => {
                        history.goBack()
                    }} className="back-btn">Назад</button>}
                    <div className="auth-button-wrapper">
                        <div className={`auth-button ${pageState === 'login' ? 'active' : ''}`}
                             onClick={changeMode}>Вход
                        </div>
                        <div className={`auth-button ${pageState === 'register' ? 'active' : ''}`}
                             onClick={changeMode}>Регистрация
                        </div>
                    </div>
                    <form className="auth_form">
                        <h1>{pageState === 'login' ? 'Вход' : 'Регистрация'}</h1>
                        <input type="text"
                               onChange={handleUserInput}
                               name={inputNames.login}
                               placeholder="E-mail"/>
                        <div>
                            <input type="password"
                                   onChange={handleUserInput}
                                   name={inputNames.password}
                                   placeholder="Пароль"/>
                            <Tooltip
                                title="?" message="Минимальная длина пароля 6 символов.
                        Допускаются символы латинского алфавита,
                        буквы и знаки препинания"/>
                        </div>
                        {
                            pageState === 'register' &&
                            <>
                                <input type="text"
                                       onChange={handleUserInput}
                                       name={inputNames.lastname}
                                       placeholder="Фамилия"/>
                                <input type="text"
                                       onChange={handleUserInput}
                                       name={inputNames.firstname}
                                       placeholder="Имя"/>
                                <input type="text"
                                       onChange={handleUserInput}
                                       name={inputNames.patronymic}
                                       placeholder="Отчество"/>
                            </>
                        }
                        <button className="submit_button"
                                disabled={loading}
                                onClick={pageState === 'login' ? loginHandler : registerHandler}>
                            {pageState === 'login' ? 'Войти' : 'Зарегистрироваться'}
                        </button>
                    </form>
                    {(error || success) &&
                    <div className={`message_block ${error ? 'error' : 'success'} `}>
                        <span>
                            {error ? error : ''}
                            {success ? success : ''}
                        </span>
                    </div>
                    }
                </div>
            </div>
        </>
    )
}