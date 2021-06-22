const {validationResult} = require("express-validator")
const bCrypt = require('bcrypt')
const {getRequestControllerCreator} = require('./controller.request.creators')
const model = require('../models/user.model')

const addUserAddress = async (data, params) => {
    const user = data[0]
    const address = await model.getUserAddress(params)
    user.address = address.length ? address[0] : null
    return user
}

const getUserInfo = getRequestControllerCreator(model.getUserInfo, null, addUserAddress)

const updateUserInfo = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                status: 400,
                message: 'Некорректные данные при обновлении данных'
            })
        }
        const params = Object.values(req.body)
        if (params.length) {
            await model.updateUserInfo(params)
        }
        else {
            return res.status(400).json({
                status: 400,
                message: 'Не были переданы параметры запроса'
            })
        }
        return res.status(200).json({
            status: 200,
            message: "Данные успешно обновлены"
        })
    } catch (e) {
        console.log('Ошибка', e.message)
        res.status(500).json({
            status: 500,
            message: "На сервере произошла ошибка, попробуйте снова"
        })
    }
}

const updateUserAddress = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                status: 400,
                message: 'Некорректные данные при обновлении адреса'
            })
        }
        const params = Object.values(req.body)
        if (params.length) {
            await model.updateUserAddress(params)
        }
        else {
            return res.status(400).json({
                status: 400,
                message: 'Не были переданы параметры запроса'
            })
        }
        return res.status(200).json({
            status: 200,
            message: "Адрес успешно обновлён"
        })
    } catch (e) {
        console.log('Ошибка', e.message)
        res.status(500).json({
            status: 500,
            message: "На сервере произошла ошибка, попробуйте снова"
        })
    }
}

const updateUserPassword = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                status: 400,
                message: 'Некорректные данные при обновлении пароля'
            })
        }
        const {old_password, new_password, confirm_password, id} = req.body
        const data = await model.getPasswordByUserId([id])
        const dbpassword = data[0]
        const isMatch = bCrypt.compareSync(old_password, dbpassword)
        if (!isMatch) {
            return res.status(400).json({message: 'Вы ввели неверный пароль, попробуйте снова'})
        }
        if (new_password !== confirm_password) {
            return res.status(400).json({message: 'Введённые пароли не совпадают'})
        }
        const hashedPass = await bCrypt.hash(new_password, 12);
        await model.updateUserPassword([hashedPass, id])
        return res.status(200).json({
            status: 200,
            message: "Пароль был успешно обновлён"
        })
    } catch (e) {
        console.log('Ошибка', e.message)
        res.status(500).json({
            status: 500,
            message: "На сервере произошла ошибка, попробуйте снова"
        })
    }
}

const checkJWTExpires = async (req, res) => {
    try {
        res.status(200).json({message: 'Токен авторизации действует'})
    } catch (e) {
        console.log('Ошибка', e.message)
        res.status(500).json("На сервере произошла ошибка, попробуйте снова")
    }
}

module.exports = {
    getUserInfo,
    updateUserInfo,
    updateUserAddress,
    updateUserPassword,
    checkJWTExpires
}