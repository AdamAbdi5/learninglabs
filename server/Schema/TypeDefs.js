const {gql} = require("apollo-server-express");


const typeDefs = gql`

    type Student {
        id: String!
        first_name: String!
        last_name: String!
        password: String!
        classes: [String!]!
        tasks: [Task]
    }

    type Task {
        id: String!
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
        password: String!
        classes: [String!]!
        tasks: [Task]
    }

    type Query {
        getAllStudents: String!
        getAllTeachers: String!
        viewTask(id: String!): Task!
        viewAllTasks(id: String!): [Task!]!
    }

    type Mutation {
        createStudent(first_name: String!, last_name: String!,password: String!, classes: [String!]!): Student!
        createTeacher(first_name: String!, last_name: String!,password: String!, classes: [String!]!): Teacher!
        setTask(title: String!, description: String!, teacherid: String!): Task!
        submitTask(id: String!, text: String, tasksid: String!): Task!
        
    }

`

module.exports = {typeDefs};