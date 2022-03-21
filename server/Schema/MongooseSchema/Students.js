const mongoose = require("mongoose");
const {tasksSchema} = require("./Tasks")



const studentSchema = new mongoose.Schema({
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
        type: [tasksSchema]
    },
    tokenNumber: {
        type: Number, 
        default: 0
    }
    
})


module.exports = mongoose.model("Student", studentSchema);