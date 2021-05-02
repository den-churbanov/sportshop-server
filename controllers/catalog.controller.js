const model = require('../models/catalog.model');

const getSections = async (req, res) => {
    try {
        // console.log('getSections', req)
        model.getSections(data => {
                res.status(200).json(data);
            },
            error => {
                throw error;
            });
    } catch (e) {
        console.log('Ошибка', e.message)
        res.status(500).json("На сервере произошла ошибка, попробуйте снова");
    }
}

const getSubSections = (req, res) => {
    try {
        const {id} = req.body
        // console.log(`getSubsections with id = ${id}`)
        model.getSubsections(id,
            data => {
                res.status(200).json(data);
            },
            error => {
                throw error;
            });
    } catch (e) {
        console.log('Ошибка', e.message)
        res.status(500).json("На сервере произошла ошибка, попробуйте снова");
    }
}

const getBrands = (req, res) => {
    try {
        model.getBrands(
            data => {
                res.status(200).json(data);
            },
            error => {
                throw error;
            });
    } catch (e) {
        console.log('Ошибка', e.message)
        res.status(500).json("На сервере произошла ошибка, попробуйте снова");
    }
}

module.exports = {getSections, getSubSections, getBrands};