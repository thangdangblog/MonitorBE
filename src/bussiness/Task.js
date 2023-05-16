const Database = require('../common/Database');

class Task {
    constructor() {
        this.database = new Database();
    }

    async insert(taskName, point, userID, taskType, completeDate) {
        completeDate = new Date(completeDate).toISOString().slice(0, 19).replace('T', ' ');
        const query = `INSERT INTO tasks (TaskName, Point, UserID,TaskType, CompleteDate) VALUES ('${taskName}', '${point}', '${userID}', '${taskType}', '${completeDate}')`;

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

    async insertMany(rows) {

        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            row.CompleteDate = new Date(row.CompleteDate).toISOString().slice(0, 19).replace('T', ' ');
        }

        await this.database.connect();

        const sql = 'INSERT INTO tasks (TaskName,TaskID, Point, UserID, CompleteDate, TaskType) VALUES ?';

        // Convert the array of rows into a two-dimensional array
        const values = rows.map(row => [row.TaskName, row.TaskID, row.Point, row.UserID, row.CompleteDate, row.TaskType]);


        return new Promise((resolve, reject) => {
            // Execute the query to insert the rows
            this.database.connection.query(sql, [values], (error, results) => {
                if (error) {
                    console.error('Error inserting rows:', error);
                    resolve(false);
                } else {
                    console.log(`${results.affectedRows} rows inserted successfully`);
                    resolve(true);
                }

                // End the MySQL connection
                // this.database.connection.end();
            });
        })
    }


    // Call the stored procedure
    async getPointsByUserAndDateRange(fromDate, toDate) {
        fromDate = fromDate.slice(0, 19).replace('T', ' ');;
        toDate = toDate.slice(0, 19).replace('T', ' ');;
        return new Promise((resolve, reject) => {

            this.database.connection.query('CALL GetPointsByUserAndDateRange(?, ?)', [fromDate, toDate], (error, results) => {
                if (error) {
                    console.error('Error executing stored procedure:', error);
                    return resolve([]);
                } else {
                    console.log('Results:', results[0]); // Assuming the result set is the first element of the results array
                    return resolve(results[0]);
                }
            });
        })
    }

    async getTop() {
        const query = `SELECT * from tasks`;

        await this.database.connect();

        return new Promise((resolve, reject) => {
            this.database.connection.query(query, (error, results) => {
                this.database.disconnect();
                if (error) {
                    console.error('Error inserting record:', error);
                    return resolve(false);;
                }
                return resolve(true);
            });
        })
    }

}

module.exports = Task;