// Import necessary modules and controllers
const express = require('express');
const {verifyToken}= require('../middleware/verifyJwttoken.js')

const router = express.Router();
const {
    createTask,
    createSubTask, getAllTasks,
    getAllSubTasks,
    updateTask,
    updateSubTask,
    deleteTask,
    deleteSubTask,
    showTaskPage
} = require('../controllers/taskControllers');


// Route to create a new task
router.get('/tasks',verifyToken,showTaskPage);
router.post('/tasks/create', createTask);

// Route to create a new subtask
router.post('/subtasks/create', createSubTask);

// Route to get all user tasks
router.get('/showtasks', getAllTasks);

// Route to get all user subtasks
router.get('/subtasks', getAllSubTasks);

// Route to update task
router.patch('/tasks/:id/update', updateTask);

// Route to update subtask
router.patch('/subtasks/:id/update', updateSubTask);

// Route to soft delete task
router.delete('/tasks/:id/delete', deleteTask);

// Route to soft delete subtask
router.delete('/subtasks/:id/delete', deleteSubTask);

module.exports = router;
