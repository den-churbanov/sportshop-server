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

// api/catalog/sizes
router.get(
    '/sizes',
    controller.getAllSizes)

// api/catalog/products/by_filters
router.post(
    '/products/by_filters',
    controller.getProductsByFilters)

// api/catalog/products/count/by_filters
router.post(
    '/products/count/by_filters',
    controller.getCountPreviewsByFilters)

// api/catalog/products/product_info
router.post(
    '/products/product_info',
    controller.getFullProductInfo)

// api/catalog/products/product_sizes
router.post(
    '/products/product_sizes',
    controller.getProductSizes)
module.exports = router


