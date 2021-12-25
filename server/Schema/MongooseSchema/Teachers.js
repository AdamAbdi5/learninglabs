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
    tasks: {
        type: [tasksSchmea]
    }
})

module.exports = mongoose.model("Teacher", teacherSchema)