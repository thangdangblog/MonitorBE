const Database = require('../common/Database');

class User {
    constructor() {
        this.database = new Database();
    }

    async insert(code, name) {
        const query = `INSERT INTO users (code, name) VALUES ('${code}', '${name}')`;

        this.database.connect();

        return new Promise((resolve, reject) => {
            this.database.connection.query(query, (error, results) => {
                this.database.disconnect();
                if (error) {
                    console.error('Error inserting record:', error);
                    return resolve(false);;
                }

                console.log('Record added successfully');
                return resolve(true);
            });
        })
    }
}

module.exports = User;