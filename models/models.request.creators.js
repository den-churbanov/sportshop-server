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
                connection.query(
                    `${method} ${mysqlConfig.database}.${dbProcFuncName}(${getSQLParamsString(params)});`,
                    (err, result) => {
                        if (err) {
                            console.log(`MySQL ERROR on ${dbProcFuncName}:`, err)
                            return reject(err)
                        }
                        let data = []
                        for(let key in result[0]){
                            data.push(result[0][key])
                        }
                        return resolve(data)
                    })
            }))
        }
    }
}

function getSQLParamsString(params) {
    if (params && params.length === 1) {
        return typeof params[0] === 'string' ? `'${params[0]}'` : params[0]
    }
    return Array.isArray(params) ?
        params.reduce((result,
                       current,
                       idx) => {
            if (idx === 1) {
                if (typeof result == 'string') {
                    result = `'${result}',`
                }
                else {
                    result = `${result.toString()},`
                }
            }
            switch (typeof current) {
                case "number":
                    return result.concat(`${current.toString()},`)
                    break
                case "string":
                    return result.concat(`'${current}',`)
            }
        }).slice(0, -1) : ''
}

module.exports = {getRequestProcedureCreator, getRequestFunctionCreator}