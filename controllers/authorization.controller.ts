const jwt = require('jsonwebtoken');
const config = require('config');
const bCrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const model = require('../models/user.model');

const signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            });
        }
        const {login, password, lastname, firstname, patronymic} = req.body;
        const hashedPass = await bCrypt.hash(password, 12);
        model.signup(lastname, firstname, patronymic, login, hashedPass,
            inserted => {
                if (inserted.data[0] === -1) {
                    return res.status(400).json({message: "Пользователь с данным логином уже зарегистрирован"});
                }
                else {
                    res.status(201).json({
                        inserted,
                        message: "Вы успешно зарегистрировались"
                    });
                }
            },
            error => {
                throw error;
            }
        );
    } catch (e) {
        return res.status(500).json({
            errorMsg: e.message,
            message: "На сервере произошла ошибка, попробуйте снова"
        });
    }
};

const signin = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при входе в систему'
            });
        }
        const {login, password} = req.body;
        //console.log('auth controller signin login ', login)
        model.signin(login, 'check_login_user_exists',
            result => {
                const userID = result.data[0];

                if (userID == -1) {
                    return res.status(400).json({message: "Пользователь не найден"});
                }
                model.signin(login, 'get_password_by_login',
                    result => {
                        const dbpassword = result.data[0];
                        const isMatch = bCrypt.compareSync(password, dbpassword);
                        if (!isMatch) {
                            return res.status(400).json({message: 'Неверный логин или пароль, попробуйте снова'})
                        }
                        const token = jwt.sign(
                            {accessID: userID},
                            config.get('jwtSecret'),
                            {expiresIn: '1h'}
                        );
                        res.status(200).json({
                            token,
                            userID
                        });
                    },
                    error => {
                        throw error;
                    });
            },
            error => {
                console.log(error);
                throw error;
            });
    } catch (e) {
        return res.status(500).json({
            errorMsg: e.message,
            message: "На сервере произошла ошибка, попробуйте снова"
        });
    }
}

module.exports = {signup, signin};