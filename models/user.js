// user.js (User model)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id:{
        type:Number,
        required:true,
    },
    phone_number: {
        type: Number,
        required: true
    },
    priority: {
        type: Number,
        enum: [0, 1, 2],
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
