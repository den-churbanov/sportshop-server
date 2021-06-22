const {validationResult} = require('express-validator')
const {getRequestControllerCreator} = require('./controller.request.creators')
const model = require('../models/basket.model')

const addProduct = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при добавлении товара'
            })
        }
        const params = Object.values(req.body)
        let data
        if (params.length) {
            data = await model.addProductToBasket(params)
        }
        else {
            return res.status(400).json({
                message: 'Не были переданы параметры запроса'
            })
        }
        if (data[0] === -1) {
            return res.status(201).json({
                inserted: data[0],
                message: "Товар был добавлен в корзину"
            })
        }
        return res.status(200).json({
            inserted: data[0],
            message: "Товар уже в корзине"
        })
    } catch (e) {
        console.log('Ошибка', e.message)
        res.status(500).json("На сервере произошла ошибка, попробуйте снова")
    }
}

const deleteProduct = async (req, res) => {
    try {
        const params = Object.values(req.body)
        let data
        if (params.length) {
            data = await model.deleteProductFromBasket(params)
        }
        else {
            return res.status(400).json({
                message: 'Не были переданы параметры запроса'
            })
        }
        if (data[0] === -1) {
            return res.status(500).json({
                message: "Товар не был удалён. Произошла непредвиденная ошибка"
            })
        }
        return res.status(200).json({
            deleted: data[0],
            message: "Товар успешно удалён с корзины"
        })
    } catch (e) {
        console.log('Ошибка', e.message)
        res.status(500).json("На сервере произошла ошибка, попробуйте снова")
    }
}

const select_all_basket = getRequestControllerCreator(model.select_all_basket)

module.exports = {
    addProduct,
    deleteProduct,
    select_all_basket
}