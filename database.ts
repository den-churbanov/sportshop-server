const mysql = require('mysql');
const config = require('config');
const mysqlConfig = config.get('connectionURI');

const connection = mysql.createConnection(mysqlConfig);

async function connectDB() {
    try {
        await connection.connect();
    } catch (e) {
        console.log(`Server Error: ${e.message}`);
        process.exit(1);
    }
}

connectDB();

module.exports = connection;