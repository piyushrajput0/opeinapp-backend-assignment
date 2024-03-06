// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskroutes.js');
const userRoutes = require('./routes/userroutes.js');
const loginRoutes= require('./routes/loginRoutes.js');
const cookieParser = require("cookie-parser");
const cron = require('node-cron');
const taskPriorityCron = require('./cron/taskPriorityCron');




// app.js
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

app.set('views', 'views');


app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


mongoose.connect(`mongodb+srv://singhpiyush1805:${process.env.MONGODB_PASSWORD}@cluster0.natfviu.mongodb.net/`)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.use('/users', userRoutes); 
app.use('/api' , taskRoutes);
app.use('/login',loginRoutes);

taskPriorityCron.start(); 


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
