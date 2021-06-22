import React, {useContext, useEffect, useMemo, useState} from "react"
import {connect} from "react-redux"
import {AuthContext} from "../AuthContext"
import "../styles/profile-page.css"
import {Helmet} from "react-helmet-async"
import {useHttp} from "../hooks/http.hook";
import {MessagePopup} from "../components/trivia/MessagePopup";
import {updateUserAddress, updateUserInfo} from "../redux/actions"

export const ProfilePageComponent = ({user, updateUserInfo, updateUserAddress}) => {

    const {logout, token} = useContext(AuthContext)
    const [editInfo, setEditInfo] = useState(false)
    const [editAddress, setEditAddress] = useState(false)
    const [editPass, setEditPass] = useState(false)
    const [data, setData] = useState(
        {
            lastname: "",
            firstname: "",
            patronymic: "",
            phone_number: "",
            email: "",
            address: {
                country: "",
                city: "",
                street: "",
                home: "",
                entrance: "",
                apartment: "",
                mail_index: ""
            },
            old_password: "",
            new_password: "",
            confirm_password: ""
        })
    const {
        request,
        loading,
        error,
        success,
        clearSuccess,
        clearError,
        status
    } = useHttp()

    useEffect(() => {
        setData(prevState => {
            return {
                ...prevState,
                ...user
            }
        })
    }, [user])

    const inputNames = {
        lastname: "lastname",
        firstname: "firstname",
        patronymic: "patronymic",
        phone_number: "phone_number",
        email: "email",
        country: "country",
        city: "city",
        street: "street",
        home: "home",
        entrance: "entrance",
        apartment: "apartment",
        mail_index: "mail_index",
        old_password: "old_password",
        new_password: "new_password",
        confirm_password: "confirm_password"
    }

    const iterNames = useMemo(() => {
        return Object.values(inputNames)
    }, [inputNames])

    const placeholders = [
        'Фамилия', 'Имя', 'Отчество',
        'Номер телефона', 'E-mail',
        'Страна', 'Город', 'Улица',
        'Дом', 'Подъезд', 'Квартира',
        'Почтовый индекс',
        'Старый пароль', 'Новый пароль',
        'Повторите пароль'
    ]

    const handleUserInput = (event) => {
        const name = event.target.name
        const value = event.target.value
        if (name === inputNames.country || name === inputNames.city
            || name === inputNames.street || name === inputNames.home
            || name === inputNames.entrance || name === inputNames.apartment
            || name === inputNames.mail_index) {
            setData(prevData => {
                return {
                    ...prevData,
                    address: {
                        ...prevData.address,
                        [name]: value
                    }
                }
            })
        }
        else {
            setData(prevData => {
                return {...prevData, [name]: value}
            })
        }
    }

    const editInfoHandler = async e => {
        e.preventDefault()
        e.stopPropagation()
        if (!editInfo) return setEditInfo(true)
        const params = {}
        for (const key in data) {
            params[key] = user[key] === data[key] ? user[key] : data[key]
            if (key === "email") break
        }

        const response = await request(
            'api/user/update_user_info',
            'POST',
            {...params},
            {
                'Authorization': `Bearer ${token}`
            })
        if (response && response.status === 200) {
            updateUserInfo(params)
            setEditInfo(false)
        }
    }

    const editAddressHandler = async e => {
        e.preventDefault()
        e.stopPropagation()
        if (!editAddress) return setEditAddress(true)
        const params = {}
        for (const key in data.address) {
            if (key === 'id') continue
            params[key] = user.address[key] === data.address[key] ?
                user.address[key] : data.address[key]
        }
        const response = await request(
            'api/user/update_user_address',
            'POST',
            {...params},
            {
                'Authorization': `Bearer ${token}`
            })
        if (response && response.status === 200) {
            updateUserAddress(params)
            setEditAddress(false)
        }
    }

    const editPasswordHandler = async e => {
        e.preventDefault()
        e.stopPropagation()
        if (!editPass) return setEditPass(true)

        const params = {
            old_password: data.old_password,
            new_password: data.new_password,
            confirm_password: data.confirm_password
        }
        const response = await request(
            'api/user/update_user_password',
            'POST',
            {...params},
            {
                'Authorization': `Bearer ${token}`
            })
        if (response && response.status === 200) setEditPass(false)
    }

    return (
        <>
            <Helmet>
                <title>Личный кабинет</title>
            </Helmet>
            {(error || success) &&
            <MessagePopup success={success}
                          error={error}
                          clearSuccess={clearSuccess}
                          clearError={clearError}/>}
            <div className="profile-page-container">
                <div className="profile-header row">
                    <div className="profile-header-content">
                        <h4>Личный кабинет</h4>
                        <button className="logout-btn" onClick={logout}>Выйти</button>
                    </div>
                </div>
                <div className="profile-info-block row">
                    <div className="profile-content">
                        <span>Личные данные</span>
                        <div className="inputs-wrapper">
                            {Object.values(data).map((value, idx) => {
                                if (idx > 4) return null
                                return <input type="text"
                                              onChange={handleUserInput}
                                              name={iterNames[idx]}
                                              value={value}
                                              maxLength={20}
                                              placeholder={placeholders[idx]}
                                              disabled={!editInfo}
                                              key={iterNames[idx]}/>
                            })}
                        </div>
                        <button onClick={editInfoHandler}
                                disabled={loading}>{editInfo ? 'сохранить' : 'изменить'}</button>
                    </div>
                </div>
                <div className="address-block row">
                    <span>Адрес</span>
                    <div className="inputs-wrapper">
                        {Object.values(data.address).map((value, idx) => {
                            if (idx === 0) return null
                            return <div className="input-block" key={iterNames[4 + idx]}>
                                <p>{placeholders[4 + idx]}</p>
                                <input type="text"
                                       onChange={handleUserInput}
                                       name={iterNames[4 + idx]}
                                       value={value}
                                       maxLength={25}
                                       placeholder={placeholders[4 + idx]}
                                       disabled={!editAddress}/>
                            </div>
                        })}
                    </div>
                    <button onClick={editAddressHandler}
                            disabled={loading}>{editAddress ? 'сохранить' : 'изменить'}</button>
                </div>
                <div className="password-block row">
                    <span>Изменить данные входа</span>
                    {editPass &&
                    <div className="inputs-wrapper">
                        <input type="password"
                               onChange={handleUserInput}
                               name={inputNames.old_password}
                               placeholder="Старый пароль"
                               maxLength={30}
                               disabled={!editPass}/>
                        <input type="password"
                               onChange={handleUserInput}
                               name={inputNames.new_password}
                               placeholder="Новый пароль"
                               maxLength={30}
                               disabled={!editPass}/>
                        <input type="password"
                               onChange={handleUserInput}
                               name={inputNames.confirm_password}
                               placeholder="Повторите пароль"
                               maxLength={30}
                               disabled={!editPass}/>
                    </div>}
                    <button onClick={editPasswordHandler}
                            disabled={loading}>{editPass ? 'сохранить' : 'изменить'}</button>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => {
    return {
        updateUserInfo: info => dispatch(updateUserInfo(info)),
        updateUserAddress: info => dispatch(updateUserAddress(info))
    }
}

export const ProfilePage = connect(mapStateToProps, mapDispatchToProps)(ProfilePageComponent)