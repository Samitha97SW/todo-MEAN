const mongoose = require('mongoose');

module.exports = mongoose.model('Task',{
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true
    },
});