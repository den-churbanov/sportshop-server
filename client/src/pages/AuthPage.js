import React, {useContext, useEffect, useState} from "react";
import '../styles/auth-page.css';
import logo from '../components/images/white-logo.jpg'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const [pageState, setState] = useState(
        {type: 'login'});

    const [data, setData] = useState(
        {
            firstname: "",
            lastname: "",
            patronymic: "",
            login: "",
            password: ""
        });

    const {request, loading, error, clearError, success, clearSuccess} = useHttp();

    useEffect(() => {
        if(error)
            setTimeout(() => clearError(), 3000);
        if(success)
            setTimeout(() => clearSuccess(), 3000);
    }, [error, success, clearError, clearSuccess]);

    const inputNames = {
        firstname: "firstname",
        lastname: "lastname",
        patronymic: "patronymic",
        login: "login",
        password: "password"
    }

    const registerHandler = async () => {
        try {
            await request('/api/auth/signup', 'POST', {...data});
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const login = data.login;
            const password = data.password;
            const result = await request('/api/auth/signin', 'POST', {login, password});
            auth.login(result.token, result.userID)
        } catch (e) {}
    }

    const handleUserInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prevData =>{
            return {...prevData, [name]: value}
        });
    }

    const changeMode = () => {
        setState(prevState => {
            if (prevState.type === 'register') {
                return {
                    ...prevState,
                    type: 'login'
                };
            }
            return {
                ...prevState,
                type: 'register'
            };
        });
    }

    return (
        <div className="auth_container">
            <div className="logo">
                <img src={logo} alt="Логотип"/>
            </div>
            <div className="auth_content">
                <div className={`auth-button ${pageState.type === 'login' ? 'active' : ''}`}
                     onClick={changeMode}>Вход
                </div>
                <div className={`auth-button ${pageState.type === 'register' ? 'active' : ''}`}
                     onClick={changeMode}>Регистрация
                </div>
                <form className="auth_form">
                    <h1>{pageState.type === 'login' ? 'Вход' : 'Регистрация'}</h1>
                    <input type="text"
                           onChange={handleUserInput}
                           name={inputNames.login}
                           placeholder="E-mail"/>
                    <input type="password"
                           onChange={handleUserInput}
                           name={inputNames.password}
                           placeholder="Пароль"/>
                    <input type="text" className={pageState.type === 'login' ? 'hidden' : ''}
                           onChange={handleUserInput}
                           name={inputNames.firstname}
                           placeholder="Имя"/>
                    <input type="text" className={pageState.type === 'login' ? 'hidden' : ''}
                           onChange={handleUserInput}
                           name={inputNames.lastname}
                           placeholder="Фамилия"/>
                    <input type="text" className={pageState.type === 'login' ? 'hidden' : ''}
                           onChange={handleUserInput}
                           name={inputNames.patronymic}
                           placeholder="Отчество"/>
                    <button className="submit_button"
                            disabled={loading}
                            onClick={pageState.type === 'login' ? loginHandler : registerHandler}>
                        {pageState.type === 'login' ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                </form>
                <div className={`message_block ${error ? 'error': success ? 'success': ' hidden'} `}>
                    <span>
                        {error? error: ''}
                        {success? success: ''}
                    </span>
                </div>
            </div>
        </div>
    );
}