const {Router} = require('express');
const controller = require('../controllers/catalog.controller');
const router = Router();

// api/catalog/sections
router.get(
    '/sections',
    controller.getSections);

// api/catalog/subsections
router.post(
    '/subsections',
    controller.getSubSections);

// api/catalog/brands
router.get(
    '/brands',
    controller.getBrands);

// api/catalog/sport_types
router.get(
    '/sport_types',
    controller.getSportTypes);

module.exports = router;


