const controller = require('../controllers/images.controller')
const {check} = require('express-validator')
const {Router} = require('express')

const router = Router()

// api/images/products
router.post(
    '/products',
    // [
    //     check('imagepath', '').custom((value, { req }) => value === req.body.password)
    // ],// ^ \\.(?:gif|jpg|png)$
    controller.getProductsImage
)

module.exports = router