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

module.exports = {
    getSections,
    getSubsections,
    getBrands,
    getSportTypes,
    getSpecialOffers,
    getNewProducts,
    getHitsProducts,
    getSalesProducts
};