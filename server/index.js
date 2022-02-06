const mongoose = require("mongoose")
const {ApolloServer} = require("apollo-server-express")
const cors = require("cors");
const express = require("express")
const {typeDefs} = require("./Schema/TypeDefs")
const {resolvers}= require("./Schema/Resolvers");
const { verify } = require("jsonwebtoken");
const cookieParser = require("cookie-parser")
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
  app.use(cookieParser());
  app.use(cors({
    origin: "http://localhost:3000" ,
    credentials: true
  }))
  const server = new ApolloServer({typeDefs,resolvers, context: ({req, res}) => {
    const authorization = req.headers["authorization"]
    let payload = ""
    if (authorization === ""){
      return {
        req, res, payload
      }
    }
    const token = authorization.split(" ")[1];
    payload = verify(token, process.env.ACCESSS_TOKEN_SECRET)
    return {
      req,res,payload
    }
  }});

 
  

  await server.start();
  
  

  server.applyMiddleware({app, cors: false});

  

  app.listen(4000, ()=>{
    console.log("Server running!")
  })
}






main();

