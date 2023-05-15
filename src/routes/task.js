const express = require('express');
const router = express.Router();
const Task = require('../bussiness/Task');
const ServiceActionResult = require('../model/ServiceActionResult');

// POST route for handling the request
router.post('/', async (req, res) => {
    const taskName = req.body.TaskName;
    const point = req.body.Point;
    const userID = req.body.UserID;
    const taskType = req.body.TaskType;
    const completeDate = req.body.CompleteDate;

    const task = new Task();
    const result = await task.insert(taskName, point, userID, taskType, completeDate);

    const serviceActionResult = new ServiceActionResult(result);

    res.send(serviceActionResult);
});

module.exports = router;