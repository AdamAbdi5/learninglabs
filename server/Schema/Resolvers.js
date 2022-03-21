const mongoose = require("mongoose")
const Student = require("./MongooseSchema/Students")
const Teacher = require("./MongooseSchema/Teachers")
const Task = require("./MongooseSchema/TasksModel")
const Teachers = require("./MongooseSchema/Teachers")
const { hash, compare } = require("bcrypt")

const {createAccessToken,createRefreshToken} = require("../auth")
const Students = require("./MongooseSchema/Students")
const resolvers = {
    Query:{
        async getAllStudents(){
            try{
                const students = await Student.find()

                return students
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
                const task = await Task.find({"_id": args.id})
                
                return JSON.stringify(task);
            } catch (err){
                return err;
            }
        },

        async viewAllTasks(parent, args){
            try{
                const tasks = await Student.find({"_id": args.id}, {"tasks": 1});

                return JSON.stringify(tasks);
            } catch (err){
                return err;
            }
        }, 
        
    },

    Mutation:{
        refreshToken(parent, args, {req}){
            return req.cookies
        },
        h1 (parent, args){
            
            
            
            return "E";
        },
        async viewStudent(_, args){
            const student = await Student.find({_id: args.id})
            return JSON.stringify(student)
        },
        async createStudent(parent, args){
            try{
                const hashedPassword = await hash(args.password, 12)
                const student = await Student.create({
                    first_name: args.first_name,
                    last_name: args.last_name,
                    classes: args.classes,
                    password: hashedPassword
                })

                return student;
            } catch (err){
                return err;
            }
            

            
        },

        async createTeacher(parent, args){
            try{
                const hashedPassword = await hash(args.password, 12);
                const teacher = await Teacher.create({
                    first_name: args.first_name,
                    last_name: args.last_name,
                    classes: args.classes,
                    password: hashedPassword
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

                await task.save()
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

        async studentLogin(parent, args, ctx){
            
            const {req, res} = ctx; 

            const student = await Student.find({$and: [{"first_name": args.first_name.toLowerCase()}, {"last_name": args.last_name.toLowerCase()}]});


            if (student.length === 0){
                throw new Error("could not find student");
            }
            
            const valid = await compare(args.password, student[0].password);

            if (!valid){
                throw new Error("incorrect password");
            }

            res.cookie("mid", 
            createRefreshToken(student, false)
            ,
                {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none"
                }
                )

            return {
                accessToken: createAccessToken(student, false)
            };
        },

        async revokeStudentToken(_, {userId}){
            const student = Students.find({_id: userId})
            const number = student[0].tokenNumber + 1;
            Students.updateOne({_id: userId}, {
                $set:{tokenNumber:number}
            })
        }

        
    }
}

module.exports = {resolvers}