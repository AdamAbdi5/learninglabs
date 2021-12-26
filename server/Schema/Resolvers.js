const mongoose = require("mongoose")
const Student = require("./MongooseSchema/Students")
const Teacher = require("./MongooseSchema/Teachers")
const Task = require("./MongooseSchema/TasksModel")
const Teachers = require("./MongooseSchema/Teachers")
const resolvers = {
    Query:{
        async getAllStudents(){
            try{
                const students = await Student.find()
                return JSON.stringify(students)
            } catch (err){
                return err;
            }
            
        },

        async getAllTeachers(){
            try{
                const teachers = await Teachers.find()
                return JSON.stringify(teachers)
            } catch (err){
                return err;
            }
        },

        async viewTask(parent, args){
            try{
                const task = Student.find({_id: args.studentid, "tasks.id": args.taskid })
                

                return task;
            } catch (err){
                return err;
            }
        }
    },

    Mutation:{
        async createStudent(parent, args){
            try{
                const student = await Student.create({
                    first_name: args.first_name,
                    last_name: args.last_name,
                    classes: args.classes
                })

                return student;
            } catch (err){
                return err;
            }
            

            
        },

        async createTeacher(parent, args){
            try{
                const teacher = await Teacher.create({
                    first_name: args.first_name,
                    last_name: args.last_name,
                    classes: args.classes
                })
                return teacher;
            } catch(err){
                return err;
            }
            
            
        },

        async setTask(parent, args){

            
            const task = new Task({title: args.title, description: args.description, teacher: args.teacherid})
            
            
            try{
                await Student.updateMany({classes: {$all: args.class}}, {
                    $push: {tasks: task}
                })

                await Teacher.updateOne({classes: {$all: args.class}}, {
                    $push: {tasks: task}
                })

                return JSON.stringify(task);
            } catch (err){
                return err;
            }

        },

        async submitTask(parent, args){
            try{
                await Student.updateOne({id: args.id, "tasks.id": args.tasksid},
                {
                    $set: {"tasks.text": args.text, "tasks.completed": true}
                }
                )
                
                return args.text
            } catch(err){
                return err;
            }
        },

        
    }
}

module.exports = {resolvers}