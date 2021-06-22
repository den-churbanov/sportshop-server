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
const getCountPreviewsByFilters = getRequestControllerCreator(model.getCountPreviewsByFilters)

const addProductInfo = async (data, params) => {
    const product = data[0]
    product.images = await model.getAllProductImages(params)
    product.sizes = await model.getAllProductSizes(params)
    product.pageCount = 1
    return product
}
const getFullProductInfo = getRequestControllerCreator(model.getFullProductInfo,null, addProductInfo)
const getProductSizes = getRequestControllerCreator(model.getAllProductSizes)

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
    getProductsByFilters,
    getCountPreviewsByFilters,
    getFullProductInfo,
    getProductSizes
}