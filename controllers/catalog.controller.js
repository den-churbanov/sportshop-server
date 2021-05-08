const model = require('../models/catalog.model');

const getSections = async (req, res) => {
    // console.log(`getSections`)
    try {
        const data = await model.getSections()
        res.status(200).json(data)
    } catch (e) {
        console.log('Ошибка', e.message)
        res.status(500).json("На сервере произошла ошибка, попробуйте снова")
    }
}

const getSubSections = async (req, res) => {
    try {
        const {id} = req.body
        // console.log(`getSubsections with id = ${id}`)
        const data = await model.getSubsections([id])
        res.status(200).json(data)
    } catch (e) {
        console.log('Ошибка', e.message)
        res.status(500).json("На сервере произошла ошибка, попробуйте снова")
    }
}


const getBrands = async (req, res) => {
    try {
        const data = await model.getBrands()
        res.status(200).json(data)
    } catch (e) {
        console.log('Ошибка', e.message)
        res.status(500).json("На сервере произошла ошибка, попробуйте снова")
    }
}

const getSportTypes = async (req, res) => {
    try {
        const data = await model.getSportTypes()
        res.status(200).json(data)
    } catch (e) {
        console.log('Ошибка', e.message)
        res.status(500).json("На сервере произошла ошибка, попробуйте снова")
    }
}

module.exports = {getSections, getSubSections, getBrands, getSportTypes}