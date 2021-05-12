const fs = require('fs');
const path = require('path')

const getProductsImage = async (req, res) => {
    await getImages(req, res, '/images/products')
}

const getSpecialOffersImage = async (req, res) => {
    await getImages(req, res, '/images/special_offers')
}

function getImages(req, res, route) {
    try {
        const {imagepath} = req.body;
        const filePath = path.join(
            __dirname.replace('\\controllers', ''),
            route,
            imagepath
        )
        console.log(filePath)
        res.set({
            'Content-Type':'image/jpeg'
        })
        res.sendFile(filePath)
    } catch (e) {
        console.log('Ошибка', e.message)
        res.status(500).json("На сервере произошла ошибка, попробуйте снова")
    }
}

module.exports = {getProductsImage, getSpecialOffersImage}