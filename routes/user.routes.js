const {Router} = require('express')
const {check} = require('express-validator')
const controller = require('../controllers/user.controller')
const authMiddleware = require('../middleware/auth.middleware')
const router = Router()

// api/user/check_jwt_expires
router.get(
    '/check_jwt_expires',
    authMiddleware,
    controller.checkJWTExpires)

// api/user/get_user_info
router.get(
    '/get_user_info',
    authMiddleware,
    controller.getUserInfo)

// api/user/update_user_info
router.post(
    '/update_user_info',
    [
        check('firstname', 'Введите имя').exists({checkNull: true, checkFalsy: true}),
        check('lastname', 'Введите фамилию').exists({checkNull: true, checkFalsy: true}),
        check('patronymic', 'Введите отчество').exists({checkNull: true, checkFalsy: true}),
        check('email', 'Некорректный email').isEmail(),
        check('phone_number', 'Некорректный номер телефона').isMobilePhone("ru-RU"),
        authMiddleware
    ],
    controller.updateUserInfo)

// api/user/update_user_address
router.post(
    '/update_user_address',
    [
        check('country', 'Введите страну').exists({checkNull: true, checkFalsy: true}),
        check('city', 'Введите город').exists({checkNull: true, checkFalsy: true}),
        check('street', 'Введите улицу').exists({checkNull: true, checkFalsy: true}),
        check('home', 'Введите дом').exists({checkNull: true, checkFalsy: true}),
        check('apartment', 'Введите подъезд').exists({checkNull: true, checkFalsy: true}),
        check('mail_index', 'Введите почтовый индекс').exists({checkNull: true, checkFalsy: true}),
        authMiddleware,
    ],
    controller.updateUserAddress)

// api/user/update_user_password
router.post(
    '/update_user_password',
    [
        check('old_password', 'Введите старый пароль').exists({checkNull: true, checkFalsy: true}),
        check('new_password', 'Введите новый пароль').exists({checkNull: true, checkFalsy: true}),
        check('new_password', 'Минимальная длина пароля - 6 символов').isLength({min: 6}),
        check('confirm_password', 'Введите новый пароль ещё раз').exists({checkNull: true, checkFalsy: true}),
        authMiddleware,
    ],
    controller.updateUserPassword)

module.exports = router