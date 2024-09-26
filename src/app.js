const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");
const {bcrypt} = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {UserAuth} = require("./middlewares/auth");


app.use(express.json());
app.use(cookieParser())

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);


// Get User by email
app.get("/user",async(req,res)=>{
    try{
    const userEmail = req.query.email;
    const users = await User.findOne({emailId:userEmail});
    if(users.length ===0){
        res.status(400).send("User not found");
    }
    res.send(users);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
})

// Feed API to get all the user
app.get("/feed",async(req,res)=>{
    try{
     const users = await User.find();
     res.send(users);
    }catch(err){
     res.status(400).send(err.message);
    }
})

app.delete("user",async(req,res)=>{
    try{
    const userEmail = req.query.email;
    const users = await User.findOneAndDelete({emailId:userEmail});
    if(users.length ===0){
        res.status(400).send("User not found");
    }
    res.send("User deleted successfully");
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
})

// Update User
app.patch("/user",async(req,res)=>{

    const ALLOWED_UPDATES = ["skills","age","gender","photoUrl"];

    const updates = Object.keys(req.body);

    const isValidOperation = updates.every((update)=>ALLOWED_UPDATES.includes(update));
    if(!isValidOperation){
        return res.status(400).send("Invalid updates");
    }
    try{
    const data = req.body;
    const userId = req.body.userId;
    const users = await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"after"});
    if(users.length ===0){
        res.status(400).send("User not found");
    }
    res.send("User updated successfully");
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
})

connectDb().then(()=>{
    console.log("Database connected")
    app.listen(4000,()=>{
        console.log("Listening on port 4000");
    });
})
    .catch((err)=>console.log(err))