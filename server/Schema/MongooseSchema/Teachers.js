const mongoose = require("mongoose");
const {tasksSchmea} = require("./Tasks")


const teacherSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        lowercase: true
    },
    last_name: {
        type: String,
        required: true,
        lowercase: true
    },
    classes: {
        type: [String],
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: {
        type: [tasksSchmea]
    }, 
    tokenNumber: {
        type: Number, 
        default: 0
    }
})

module.exports = mongoose.model("Teacher", teacherSchema)