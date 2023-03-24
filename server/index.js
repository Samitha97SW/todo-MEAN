const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const dbUrl = "mongodb://127.0.0.1/mean-todo";


// local imports
const taskRoutes = require('./controllers/task.controller')


// use express and make the app - use dependencies
const app = express();
app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:4200'})); //use this before routes
app.use('/api/tasks', taskRoutes);


// Run the function after app up
app.listen(3000,()=>console.log('API server is running'));


// connect DB
mongoose.connect(dbUrl).then(()=>{
    console.log(`DB Connected`);
    }).catch((err)=>{
        console.log(`DB Not Connected ${err}`);
    });