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

// api/images/brands_image/logo
router.post(
    '/brands_image/logo',
    [
        check('imagepath', '').custom(imagePathValidator)
    ],
    controller.getBrandLogoImage
);

// api/images/brands_image/logo
router.post(
    '/brands_image/back',
    [
        check('imagepath', '').custom(imagePathValidator)
    ],
    controller.getBrandBackImage
);

function imagePathValidator (value) {
    return !!value.toString().match('^\\S+[.](?:gif|jpg|jpeg|png)$')??[0]
}

module.exports = router;