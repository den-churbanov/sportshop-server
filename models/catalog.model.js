//взаимодействие с базой данных для получения данных
const connection = require('../database');
const config = require('config');
const mysqlConfig = config.get('connectionURI');
const {getRequestProcCreator} = require('./models.request.creators')

const getSections = getRequestProcCreator('select_all_section')

const getSubsections = (id, response, reject) => {
    // console.log(`call site_database.select_subsections(${id});`);
    connection.query(`call site_database.select_subsections(${id});`, (err, results) => {
        if (err) {
            console.log('MySQL ERROR on catalog_model.getSubsections:', err);
            return reject(err);
        }
        let data = new Array();
        for (let key in results[0]) {
            data.push(results[0][key]);
        }
        return response(data);
    });
}

const getBrands = getRequestProcCreator('select_all_brands')


module.exports = {getSections, getSubsections, getBrands};