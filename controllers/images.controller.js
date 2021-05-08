const path = require('path');

const getProductsImage = async (req, res) => {
    await getImages(req, res, '/images/products')
}

function getImages(req, res, route) {
    try {
        const {imagepath} = req.body;
        console.log(path.join(__dirname, route, imagepath))
        res.sendFile(path.join(__dirname, route, imagepath), {
            ContentType: 'image/jpeg'
        });
    } catch (e) {
        console.log('Ошибка', e.message)
        res.status(500).json("На сервере произошла ошибка, попробуйте снова");
    }
}

module.exports = {getProductsImage};