// Import necessary modules and models
const Task = require('../models/task');
const SubTask = require('../models/subtask');
const User = require('../models/user');
const jwt = require('jsonwebtoken');



const showTaskPage= async( req, res)=>{

    res.render('task');
}

// Function to create a new task
const createTask = async (req, res) => {
    try {
      
        const { title, description, due_date,priority } = req.body;
        const token=req.cookies.Authorization;
        console.log(token);
        
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const { user_id } = decodedToken;
        user_id=parseInt(user_id, 10);
        console.log(decodedToken,user_id);

       
        const task = await Task.create({
            title,
            description,
            due_date,
            user_id,
            priority
        });
       
       

        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to create a new subtask
const createSubTask = async (req, res) => {
    try {
        // Extract data from request body
        const { task_id } = req.body;

        // Create new subtask
        const subTask =  SubTask.create({
            task_id,
            status: 0
        });
        // Save subtask to the database
        await subTask.save();

        res.status(201).json({ message: 'Subtask created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get all user tasks
const getAllTasks = async (req, res) => {
    try {
        // Implement logic to get all user tasks with filters
        // Pagination, priority filter, due date filter, etc.
        const tasks = await Task.find({ user_id: req.user.id }).exec();

        // Render HTML response
        res.render('alltasks', { tasks }); 

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get all user subtasks
const getAllSubTasks = async (req, res) => {
    try {
        // Implement logic to get all user subtasks with optional filter by task_id
        const { task_id } = req.params;
        const subtasks = await SubTask.find({ task_id }).exec();
        res.status(200).json(subtasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to update task
const updateTask = async (req, res) => {
    try {
        // Extract data from request body
        const { due_date, status } = req.body;
        const taskId = req.params.id;

        // Update task in the database
        await Task.findByIdAndUpdate(taskId, { due_date, status }, { new: true });

        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to update subtask
const updateSubTask = async (req, res) => {
    try {
        // Extract data from request body
        const { status } = req.body;
        const subtaskId = req.params.id;

        // Update subtask in the database
        await SubTask.findByIdAndUpdate(subtaskId, { status }, { new: true });

        res.status(200).json({ message: 'Subtask updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to soft delete task
const deleteTask = async (req, res) => {
    try {
        // Soft delete task in the database
        const taskId = req.params.id;
        await Task.findByIdAndUpdate(taskId, { deleted_at: new Date() });

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to soft delete subtask
const deleteSubTask = async (req, res) => {
    try {
        // Soft delete subtask in the database
        const subtaskId = req.params.id;
        await SubTask.findByIdAndUpdate(subtaskId, { deleted_at: new Date() });

        res.status(200).json({ message: 'Subtask deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    showTaskPage,

    createTask,
    createSubTask,

    getAllTasks,
    getAllSubTasks,

    updateTask,
    updateSubTask,

    deleteTask,
    deleteSubTask
};
