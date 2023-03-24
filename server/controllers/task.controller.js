const express = require('express');
const router = express.Router();


//use pascal case Task:task
const Task = require('../models/task.model');
const {generateCrudMethods} = require('../services/index');
const taskCrud = generateCrudMethods(Task);


// all tasks
router.get('/', (req, res)=>{
    taskCrud.getAll()
        .then(data => res.send(data))
        .catch(err => console.log(err))
});


// valid id
router.get('/:id', (req, res)=>{
    taskCrud.getById(req.params.id)
        .then(data => {
            if(data){
                res.send(data)
            }else{
                res.status(404).json({
                    error: 'No record found with ID: ' + req.params.id
                })
            }
        })
        .catch(err => console.log(err))
});


// new task
router.post('/', (req, res) => {
    const newRecord = {
        name: req.body.name,
        date: req.body.date,
        priority: req.body.priority
    }
    taskCrud.create(newRecord)
        .then(data => res.status(200).json('Task Added Successfully'))
        .catch(err => console.log(err))
});


// update task
router.put('/:id', (req, res)=>{
    const updatedRecord = {
        name: req.body.name,
        date: req.body.date,
        priority: req.body.priority
    }
    taskCrud.update(req.params.id, updatedRecord)
        .then(data => {
            if(data){
                res.send(data)
            }else{
                res.status(404).json({
                    error: 'No record found with ID: ' + req.params.id
                })
            }
        })
        .catch(err => console.log(err))
});


//delete task
router.delete('/:id', (req, res)=>{
    taskCrud.delete(req.params.id)
        .then(data => {
            if(data){
                res.send(data)
            }else{
                res.status(404).json({
                    error: 'No record found with ID: ' + req.params.id
                })
            }
        })
        .catch(err => console.log(err))
});

module.exports = router;