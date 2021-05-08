const {getRequestFunctionCreator} = require('./models.request.creators')

const check_signin = getRequestFunctionCreator('check_login_user_exists')
const signin = getRequestFunctionCreator('get_password_by_login')
const signup = getRequestFunctionCreator('register_new_user')

module.exports = {signup, signin, check_signin}