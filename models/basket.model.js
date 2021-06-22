const {getRequestFunctionCreator, getRequestProcedureCreator} = require('./models.request.creators')

const addProductToBasket = getRequestFunctionCreator('add_product_to_basket')
const deleteProductFromBasket = getRequestFunctionCreator('delete_product_from_basket')
const select_all_basket = getRequestProcedureCreator('select_all_positions_from_basket')

module.exports = {
    addProductToBasket,
    deleteProductFromBasket,
    select_all_basket
}