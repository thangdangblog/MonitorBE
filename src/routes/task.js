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


router.post('/many', async (req, res) => {
    const rows = req.body;

    const task = new Task();
    const result = await task.insertMany(rows);

    const serviceActionResult = new ServiceActionResult(result);

    res.send(serviceActionResult);
});


router.post('/top', async (req, res) => {
    const FromDate = req.body.FromDate;
    const ToDate = req.body.ToDate;

    const task = new Task();
    const result = await task.getPointsByUserAndDateRange(FromDate, ToDate);

    const serviceActionResult = new ServiceActionResult(result);

    res.send(serviceActionResult);
});

module.exports = router;