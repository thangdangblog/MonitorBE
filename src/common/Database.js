const mysql = require('mysql');
let connection = null;
class Database {
    constructor() {

        if (connection) {
            this.connection = connection;
        } else {
            this.connection = connection = mysql.createConnection({
                host: 'localhost',
                port: 3306, 
                user: 'root',
                password: '12345678@Abc',
                database: 'customize_job'
            });
        }
    }

    connect() {
        this.connection.connect((err) => {
            if (err) {
                console.error('Error connecting to MySQL database:', err);
                return;
            }

            console.log('Connected to MySQL database');
        });
    }

    disconnect() {
        this.connection.end();
    }
}

module.exports = Database;