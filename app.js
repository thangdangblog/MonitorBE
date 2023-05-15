const express = require('express')
const app = express();

// Require route files
const usersRouter = require('./src/routes/user');
const tasksRouter = require('./src/routes/task');

app.use(express.json());

// Use routes as middleware
app.use('/api/user', usersRouter);
app.use('/api/task', tasksRouter);

app.get('/', function (req, res) {
    res.send('Customize come back with many customers')
});

app.listen(3000)