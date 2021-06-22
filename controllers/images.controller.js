const fs = require('fs');
const path = require('path')

const getProductsImage = async (req, res) => {
    await getImages(req, res, '/images/products')
}

const getSpecialOffersImage = async (req, res) => {
    await getImages(req, res, '/images/special_offers')
}

const getBrandLogoImage = async (req, res) => {
    await getImages(req, res, '/images/brands_image/logo')
}

const getBrandBackImage = async (req, res) => {
    await getImages(req, res, '/images/brands_image/back')
}

function getImages(req, res, route) {
    try {
        const {imagepath} = req.body;
        const filePath = path.join(
            __dirname.replace('\\controllers', ''),
            route,
            imagepath
        )
        fs.stat(filePath, (err, stats) => {
            if (err && err.code === 'ENOENT') {
                return res.status(404).json({
                    message: `Файл '${route}/${imagepath}' не найден`
                })
            }
            res.set({
                'Content-Type': 'image/jpeg'
            })
            res.sendFile(filePath)
        })
    } catch (e) {
        console.log('Ошибка', e.message)
        res.status(500).json({message: 'На сервере произошла ошибка, попробуйте снова'})
    }
}

module.exports = {getProductsImage, getSpecialOffersImage, getBrandLogoImage, getBrandBackImage}