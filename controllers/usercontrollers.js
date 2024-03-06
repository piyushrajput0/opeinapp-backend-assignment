const User = require('../models/user');
const jwt = require('jsonwebtoken');



const showUserPage= async(req,res)=>{
    res.render('user');
}

// Function to create a new user
const createUser = async (req, res) => {
    try {
        // Extract data from request body
        const { user_id,phone_number, priority } = req.body;

        // Create new user
        const newuser = await User.create({
            user_id,
            phone_number,
            priority
        });
         

        const token = jwt.sign({ user_id: newuser.id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        // Send token to client
        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports ={showUserPage,
    createUser};