//взаимодействие с базой данных для получения данных
const connection = require('../database');

const getSections = (response, reject) => {
    // console.log('call site_database.select_all_section();');
    connection.query('call site_database.select_all_section();', (err, results)=>{
        if(err){
            console.log('MySQL ERROR on catalog_model.getSections:', err);
            return reject(err);
        }
        let data = new Array();
        for(let key in results[0]){
            data.push(results[0][key]);
        }
        return response(data);
    });
}

const getSubsections = (id, response, reject) => {
    // console.log(`call site_database.select_subsections(${id});`);
    connection.query(`call site_database.select_subsections(${id});`, (err, results)=>{
        if(err){
            console.log('MySQL ERROR on catalog_model.getSubsections:', err);
            return reject(err);
        }
        let data = new Array();
        for(let key in results[0]){
            data.push(results[0][key]);
        }
        return response(data);
    });
}

module.exports = {getSections, getSubsections};