const mongoose = require("mongoose");


const tasksSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    decription: {
        type: String, 
        required: true
    },
    text: {
        type: String,
        required: false
    },
    teacher: {
        type: String,
        required: true
    },

    completed: {
        type: Boolean,
        default: false
    }
})


module.exports = tasksSchema