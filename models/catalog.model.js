//взаимодействие с базой данных для получения данных
const {getRequestProcedureCreator} = require('./models.request.creators')

const getSections = getRequestProcedureCreator('select_all_section')
const getSubsections = getRequestProcedureCreator('select_subsections')
const getBrands = getRequestProcedureCreator('select_all_brands')
const getSportTypes = getRequestProcedureCreator('select_all_sport_types')

module.exports = {getSections, getSubsections, getBrands, getSportTypes};