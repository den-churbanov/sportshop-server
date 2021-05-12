const controller = require('../controllers/images.controller');
const {check} = require('express-validator');
const {Router} = require('express')

const router = Router();

// api/images/products
router.post(
    '/products',
    [
        check('imagepath', '').custom(imagePathValidator)
    ],
    controller.getProductsImage
);

// api/images/special_offers
router.post(
    '/special_offers',
    [
        check('imagepath', '').custom(imagePathValidator)
    ],
    controller.getSpecialOffersImage
);

function imagePathValidator (value) {
    return !!value.toString().match('^\\S+[.](?:gif|jpg|png)$')[0]
}

module.exports = router;