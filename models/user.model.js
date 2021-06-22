const {getRequestFunctionCreator, getRequestProcedureCreator} = require('./models.request.creators')

const check_signin = getRequestFunctionCreator('check_login_user_exists')
const signin = getRequestFunctionCreator('get_password_by_login')
const signup = getRequestFunctionCreator('register_new_user')

const getUserInfo = getRequestProcedureCreator('select_user_info_by_id')
const getUserAddress = getRequestProcedureCreator('select_user_address_by_id')
const updateUserInfo = getRequestProcedureCreator('update_user_info')
const updateUserPassword = getRequestProcedureCreator('update_user_password')
const updateUserAddress = getRequestProcedureCreator('update_user_address')
const getPasswordByUserId = getRequestFunctionCreator('select_password_by_user_id')

module.exports = {
    signup,
    signin,
    check_signin,
    getUserInfo,
    getUserAddress,
    updateUserInfo,
    updateUserAddress,
    updateUserPassword,
    getPasswordByUserId
}