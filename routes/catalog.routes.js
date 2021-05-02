const {Router} = require('express');
const controller = require('../controllers/catalog.controller');
const router = Router();

// api/catalog/sections
router.get(
    '/sections',
    controller.getSections);

router.get(
    '/brands',
    controller.getBrands);

// api/catalog/subsections
router.post(
    '/subsections',
    controller.getSubSections);

module.exports = router;


