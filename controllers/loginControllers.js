const jwt = require('jsonwebtoken');
const User= require('../models/user');

const authUser = async (req, res) => {
    const { user_id, phone_number } = req.body;

    try {
        // Authenticate user
        const user=await User.findOne({user_id});
        // console.log(phone_number, user.phone_number,phone_number==user.phone_number);
    
        if(!user)
        {
            res.status(401).json({ message: 'Id is not Correct' });
        }
        if (  phone_number == user.phone_number) {
           const token = await jwt.sign({ user_id }, process.env.SECRET_KEY, { expiresIn: '1h' });
           res.cookie('Authorization', token, {
            httpOnly: true,
            // maxAge: 3600, 
        });
            res.redirect('/api/tasks');
        }
        else {
        res.status(401).json({ message: 'Wrong Password' });
        }
    }
     catch (error) {
        console.error('Error in user authentication:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const loginPage= async(req,res)=>{

    res.render('login');
}

module.exports={authUser,loginPage};