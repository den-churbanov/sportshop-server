const connection = require('../database');

const signin = (login, dbFunction, response, reject) => {
    console.log(`SELECT site_database.${dbFunction}('${login}')`);
    connection.query(`SELECT site_database.${dbFunction}('${login}')`, (err, results)=>{
        if(err){
            console.log('MySQL ERROR on user_model.signin:', err);
            return reject(err);
        }
        let data = new Array();
        for(let key in results[0]){
            data.push(results[0][key]);
        }
        return response({data});
    });
}

const signup = (lastname, firstname, patronymic, login, hashedPass, response, reject) => {
    connection.query(`SELECT site_database.register_new_user('${lastname}','${firstname}','${patronymic}','${login}','${hashedPass}');`,
        (err, results) => {
            if(err){
                console.log('MySQL ERROR on user_model.signup:', err);
                return reject(err);
            }
            let data = new Array();
            for(let key in results[0]){
                data.push(results[0][key]);
            }
            return response({data});
        });
}

module.exports = {signup, signin};