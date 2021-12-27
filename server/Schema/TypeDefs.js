const {gql} = require("apollo-server-express");


const typeDefs = gql`

    type Student {
        id: String!
        first_name: String!
        last_name: String!
        classes: [String!]!
        tasks: [Task]
    }

    type Task {
        title: String!
        description: String!
        text: String
        teacher: String!
        completed: Boolean!
    }

    type Teacher {
        id: String!
        first_name: String!
        last_name: String!
        classes: [String!]!
        tasks: [Task]
    }

    type Query {
        getAllStudents: String!
        getAllTeachers: String!
        viewTask(taskid: String!, studentid: String!): String!
        viewAllTasks(studentid: String!): String!
    }

    type Mutation {
        createStudent(first_name: String!, last_name: String!, classes: [String!]!): Student!
        createTeacher(first_name: String!, last_name: String!, classes: [String!]!): Teacher!
        setTask(title: String!, description: String!, class: String!, teacherid: String!): String!
        submitTask(id: String!, text: String, tasksid: String!): String!
        
    }

`

module.exports = {typeDefs};