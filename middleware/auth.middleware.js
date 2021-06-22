const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') return next()
    try {
        const token = req.headers.authorization.split(' ')[1] //`Bearer TOKEN`
        if(!token) throw new Error('Вы не авторизованы')
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.body.id = decoded.userID
        next()
    } catch (e) {
        return res.status(401).json({message: e.message})
    }
}