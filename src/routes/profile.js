const express = require("express");
const {validateProfileData} = require("../utils/validation");
const profileRouter = express.Router();
const UserAuth = require("../middlewares/auth");
profileRouter.get("/profile/view",UserAuth,async(req,res)=>{
    try{
         const user = req.user;
        console.log("Logged in user",_id);
        res.send(user);
    }
    catch(err){
        
    }    
})

profileRouter.patch("/profile/edit",UserAuth,async(req,res)=>{
    try{
        if(!validateProfileData(req)){
            return res.status(400).send("Invalid updates");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key)=>{
            loggedInUser[key] = req.body[key];
        })
        await loggedInUser.save();
        res.send(loggedInUser);
    }
    catch(err){
        res.status(400).send(err.message);
    }    
})

module.exports = {profileRouter}