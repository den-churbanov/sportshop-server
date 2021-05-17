const mysql = require('mysql');
const config = require('config');
const mysqlConfig = config.get('connectionURI');

const connection = mysql.createConnection(mysqlConfig);

async function connectDB() {
    try {
        await connection.connect(err => {
            if (err) throw err
            console.log(`The server is connected to the database ${mysqlConfig.database} on the host ${mysqlConfig.host}, connection port ${mysqlConfig.port}, user login ${mysqlConfig.user}`
            )
        });

    } catch (e) {
        console.log(`DataBase Error: ${e.message}`);
        process.exit(1);
    }
}

connectDB();

module.exports = connection;