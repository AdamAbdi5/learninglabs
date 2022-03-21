const mongoose = require("mongoose")
const {ApolloServer} = require("apollo-server-express")
const cors = require("cors");
const express = require("express")
const {typeDefs} = require("./Schema/TypeDefs")
const {resolvers}= require("./Schema/Resolvers");
const { verify } = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Teachers = require("./Schema/MongooseSchema/Teachers");
const Students = require("./Schema/MongooseSchema/Students");
const { createRefreshToken, createAccessToken } = require("./auth");

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


  app.post("/refresh_token", async(req, res) =>{
    const token = req.cookies.mid;
    
    if (!token){
      return res.send({ok: false, accessToken: ""})
    }
    
    let payload = null
    try{
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET)
    }catch (err){
      console.log(err)
      return res.send({ok: false, accessToken: ""})
    }

    const user = payload.userId;
    const isteacher = payload.teacher;
    
    if (isteacher){
      let teacher = await Teachers.find({_id:user});
      if (!teacher){
        return res.send({ok:false, accessToken: ""})
      }
      if (teacher[0].tokenNumber !== payload.tokenNumber){
        return res.send({ok: false, accessToken: ""})
      }
      res.cookie("mid", createRefreshToken(teacher, isteacher). {
        httpOnly: true, 
        secure: true,
        sameSite: "none"
      })

      return res.send({ok: true, accessToken: createAccessToken(teacher, isteacher)})
    }

    let student = await Students.find({_id:user})
    
    
    if (!student){
      return res.send({ok: false, accessToken: ""})
    }


    if (student[0].tokenNumber !== payload.tokenNumber){
      return res.send({ok: false, accessToken:""})
    }

    
    res.cookie("mid", createRefreshToken(student, isteacher), 
        {
          httpOnly: true,
          secure: true,
          sameSite: "none"
        }
      )
    
    
    return res.send({ok: true, accessToken: createAccessToken(student, isteacher)})
  })

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

