//взаимодействие с базой данных для получения данных
const {getRequestProcedureCreator} = require('./models.request.creators')

const getSections = getRequestProcedureCreator('select_all_section')
const getSubsections = getRequestProcedureCreator('select_subsections')
const getBrands = getRequestProcedureCreator('select_all_brands')
const getSportTypes = getRequestProcedureCreator('select_all_sport_types')
const getSpecialOffers = getRequestProcedureCreator('select_special_offers')
const getNewProducts = getRequestProcedureCreator('select_new_products')
const getHitsProducts = getRequestProcedureCreator('select_hit_products')
const getSalesProducts = getRequestProcedureCreator('select_sale_products')
const getAllSizes = getRequestProcedureCreator('select_count_products_by_sizes')
const getProductsByFilters = getRequestProcedureCreator('select_products_by_filters')
const getCountPreviewsByFilters = getRequestProcedureCreator('select_count_products_by_filters')
const getFullProductInfo = getRequestProcedureCreator('select_full_product_info_by_id')
const getAllProductImages = getRequestProcedureCreator('select_all_images_by_product_id')
const getAllProductSizes = getRequestProcedureCreator('select_product_sizes_by_id')

module.exports = {
    getSections,
    getSubsections,
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
    getAllProductImages,
    getAllProductSizes
};