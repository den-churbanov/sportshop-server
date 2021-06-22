const connection = require('../database')
const config = require('config')
const mysqlConfig = config.get('connectionURI')

/**
 * Request Method: GET, POST
 * Calling: db PROCEDURE
 **/
const getRequestProcedureCreator = requestCreatorGenerator('call')

/**
 * Request Method: GET, POST
 * Calling: db FUNCTION
 **/
const getRequestFunctionCreator = requestCreatorGenerator('SELECT')

/**
 * creates functions for requesting database
 * procedures and functions with a different
 * number of parameters
 * @param method set call(for PROCEDURES) or SELECT (for FUNCTIONS) method
 * */
function requestCreatorGenerator(method) {
    return function (dbProcFuncName) {
        return function (params) {
            return new Promise(((resolve, reject) => {
                try {
                    connection.query(
                        `${method} ${mysqlConfig.database}.${dbProcFuncName}(${getParamsReplacer(params)});`,
                        params,
                        (err, result) => {
                            if (err) {
                                return reject(err)
                            }
                            let data = []
                            for (let key in result[0]) {
                                data.push(result[0][key])
                            }
                            return resolve(data)
                        })
                }catch (e) {
                    console.log(`MySQL ERROR on ${dbProcFuncName}:`, e)
                }

            }))
        }
    }
}

function getParamsReplacer(params) {
    if (params) return params.map(_ => '?').join(', ')
    return ''
}

module.exports = {getRequestProcedureCreator, getRequestFunctionCreator}