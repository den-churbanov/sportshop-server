const connection = require('../database');
const config = require('config');
const mysqlConfig = config.get('connectionURI');

/**
 * Request Method: GET
 * Calling: db PROCEDURE
 * DESCRIPTION:
 * this function returns function,
 * that calling db procedure by defined props procedure
 * name and return result of the request from db
 **/
const getRequestProcCreator = function (dbProcedureName) {
    return function (response, reject) {
        connection.query(`call ${mysqlConfig.database}.${dbProcedureName}();`, (err, results) => {
            if (err) {
                console.log(`MySQL ERROR on ${dbProcedureName}:`, err);
                return reject(err);
            }
            let data = new Array();
            for (let key in results[0]) {
                data.push(results[0][key]);
            }
            return response(data);
        });
    }
}

module.exports = {getRequestProcCreator}