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
}

module.exports = Task;