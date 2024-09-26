const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
authRouter.post("/signup",async(req,res)=>{
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

authRouter.post("/login",async(req,res)=>{
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

authRouter.post("/logout",async(req,res)=>{
    try{
        res.cookie("token",null,{expires: new Date(Date.now())});
        res.clearCookie("token");
        res.send("Logout Successful");
    }catch(err){
        res.status(400).send(err.message);
    }
})

module.exports = authRouter;