const {Router} = require('express');
const controller = require('../controllers/catalog.controller');
const router = Router();

// api/catalog/sections
router.get(
    '/sections',
    controller.getSections)

// api/catalog/subsections
router.post(
    '/subsections',
    controller.getSubSections)

// api/catalog/brands
router.get(
    '/brands',
    controller.getBrands)

// api/catalog/sport_types
router.get(
    '/sport_types',
    controller.getSportTypes)

// api/catalog/special_offers
router.get(
    '/special_offers',
    controller.getSpecialOffers)


// api/catalog/products/new
router.post(
    '/products/new',
    controller.getNewProducts)

// api/catalog/products/sales
router.post(
    '/products/sales',
    controller.getSalesProducts)

// api/catalog/products/hits
router.post(
    '/products/hits',
    controller.getHitsProducts)

module.exports = router


