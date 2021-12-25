const mongoose = require("mongoose");


const tasksSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    text: {
        type: String,
        default: ""
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

module.exports = mongoose.model("Task", tasksSchema);