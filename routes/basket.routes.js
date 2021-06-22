const {Router} = require('express')
const controller = require('../controllers/basket.controller')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/auth.middleware')
const router = Router()

// api/basket/add
router.post(
    '/add',
    [
        check('size', 'Перед добавлением товара в корзину выберите размер').custom(value => !(value === 0)),
        authMiddleware
    ],
    controller.addProduct)

// api/basket/delete
router.post(
    '/delete',
    [
        authMiddleware
    ],
    controller.deleteProduct)

// api/basket/select_all_positions
router.get(
    '/select_all_basket',
    [
        authMiddleware
    ],
    controller.select_all_basket)

module.exports = router