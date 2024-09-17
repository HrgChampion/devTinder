const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");


app.post("/signup",async(req,res)=>{
    const userObj ={
        firstName:"Himanshu",
        lastName:"Gauba",
        emailId:"XpCq0@example.com",
        password:"12345",
        age:21,
        gender:"Male"
    }

    const user = new User(userObj);
    try{
    await user.save();
    res.send("User added successfully");
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
    res.send(user);
})
connectDb().then(()=>{
    console.log("Database connected")
    app.listen(4000,()=>{
        console.log("Listening on port 4000");
    });
})
    .catch((err)=>console.log(err))