const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const {bcrypt} = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {UserAuth} = require("./middlewares/auth");


app.use(express.json());
app.use(cookieParser())
app.post("/signup",async(req,res)=>{
// Validation of Data
 validateSignUpData(req)
// Encrypt password

 const passwordHash = await bcrypt.hash(req.body.password,10);
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        password: passwordHash,
        age: req.body.age,
        gender: req.body.gender,
        photoUrl: req.body.photoUrl,
        about: req.body.about,
        skills: req.body.skills
    });
    try{
    await user.save();
    res.send("User added successfully");
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
    res.send(user);
})

app.post("/login",async(req,res)=>{
    try{
     const {emailId,password} = req.body;
     const user = await User.findOne({emailId});
     if(!user){
        throw new Error ("User not found");
     }
     const isPasswordValid = await user.validatePassword(password);
     if(isPasswordValid){
        const token = await user.getJwt();
        res.cookie("token",token)
        res.send("Login Successful");
     }else{
        res.status(400).send("Invalid Credentials");
     }
    }catch(err){
        res.status(400).send(err.message);
    }
})

app.get("/profile",UserAuth,async(req,res)=>{
    try{
         const user = req.user;
        console.log("Logged in user",_id);
        res.send(user);
    }
    catch(err){
        
    }    
})



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