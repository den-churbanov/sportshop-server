const model = require('../models/catalog_model');

const getSections = async (req, res) => {
    try {
        console.log('getSections')
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

const getSubSections = (id ,req, res) => {
    try {
        console.log(`getSubsections with id = ${id}`)
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

module.exports = {getSections, getSubSections};