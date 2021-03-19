const {Router} = require('express');
const controller = require('../controllers/authorization_controller');
const {check} = require('express-validator');
const router = Router();

// api/auth/signup
router.post(
    '/signup',
    [
        check('login', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6}),
    ],
    controller.signup
);

// api/auth/signin
router.post('/signin',
    [
        check('login', 'Некорректный email').isEmail(),
        check('password', 'Введите пароль').exists(),
    ],
    controller.signin
    );

module.exports = router;