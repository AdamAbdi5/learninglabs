const mongoose = require("mongoose")
const {ApolloServer} = require("apollo-server-express");
const express = require("express")
const {typeDefs} = require("./Schema/TypeDefs")
const {resolvers}= require("./Schema/Resolvers")
const uri = require("../uri")
require("dotenv/config");
mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected…")
})
.catch(err => console.log(err))

const app = express();


const main = async() =>{
  const server = new ApolloServer({typeDefs, resolvers, context: ({req, res}) => {
    return {
      req,res
    }
    }});

  

  await server.start();


  server.applyMiddleware({app});

  

  app.listen(6969, ()=>{
    console.log("Server running!")
  })
}

// const main = async()=>{
    
//     const user = new User({name: "Adam", age: 69});

//     await user.save();

//     console.log(user);
// }




main();

