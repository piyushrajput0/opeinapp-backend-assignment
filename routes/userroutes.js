// Import required modules
const express = require('express');
const router = express.Router();

// Import the user controller
const {createUser, showUserPage} = require('../controllers/usercontrollers.js');

// Define route for creating a user
router.route('/')
.get(showUserPage)
.post(createUser);

// Export the router
module.exports = router;
