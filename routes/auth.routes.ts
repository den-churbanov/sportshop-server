const {Router} = require('express')
// @ts-ignore
const controller = require('../controllers/authorization.controller')
const {check} = require('express-validator')
const router = Router()

// api/auth/signups
router.post(
    '/signup',
    [
        check('login', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6}),
        check('firstname', 'Введите имя').exists({checkNull: true, checkFalsy: true}),
        check('lastname', 'Введите фамилию').exists({checkNull: true, checkFalsy: true}),
        check('patronymic', 'Введите отчество').exists({checkNull: true, checkFalsy: true}),
    ],
    controller.signup
)

// api/auth/signin
router.post(
    '/signin',
    [
        check('login', 'Некорректный email').isEmail(),
        check('password', 'Введите пароль').exists({checkNull: true, checkFalsy: true}),
    ],
    controller.signin
    )

module.exports = router