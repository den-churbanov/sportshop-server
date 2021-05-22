const {getRequestControllerCreator} = require('./controller.request.creators')
const model = require('../models/catalog.model')

const getSections = getRequestControllerCreator(model.getSections)
const getSubSections = getRequestControllerCreator(model.getSubsections)
const getBrands = getRequestControllerCreator(model.getBrands)
const getSportTypes = getRequestControllerCreator(model.getSportTypes)
const getSpecialOffers = getRequestControllerCreator(model.getSpecialOffers)
const getNewProducts = getRequestControllerCreator(model.getNewProducts)
const getHitsProducts = getRequestControllerCreator(model.getHitsProducts)
const getSalesProducts = getRequestControllerCreator(model.getSalesProducts)
const getAllSizes = getRequestControllerCreator(model.getAllSizes)
const getProductsByFilters = getRequestControllerCreator(model.getProductsByFilters)

module.exports = {
    getSections,
    getSubSections,
    getBrands,
    getSportTypes,
    getSpecialOffers,
    getNewProducts,
    getHitsProducts,
    getSalesProducts,
    getAllSizes,
    getProductsByFilters
}