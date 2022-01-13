const mongoose = require("mongoose")
const {ApolloServer} = require("apollo-server-express")
const cors = require("cors");
const express = require("express")
const {typeDefs} = require("./Schema/TypeDefs")
const {resolvers}= require("./Schema/Resolvers")
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
  const corsOptions = {
    credentials: true,
    origin: 'https://studio.apollographql.com'
  }
  const server = new ApolloServer({typeDefs,resolvers, context: ({req, res}) => {
    return {
      req,res
    }
  }});

 
  

  await server.start();
  app.set("trust-proxy")
  app.use(cors(corsOptions))

  server.applyMiddleware({app, cors: corsOptions});

  

  app.listen(4000, ()=>{
    console.log("Server running!")
  })
}

// const main = async()=>{
    
//     const user = new User({name: "Adam", age: 69});

//     await user.save();

//     console.log(user);
// }




main();

