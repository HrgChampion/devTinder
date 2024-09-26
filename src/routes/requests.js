const express = require("express");

const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const User = require("../models/user");
const connectionRequest = require("../models/connectionRequest");
requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    
    try{
     const fromUserId = req.user._id;
     const toUserId = req.params.toUserId;
     const status = req.params.status;
     const allowedStatus = ["ignored","interested"]
     if(!allowedStatus.includes(status)){
        return res.status(400).send("Invalid status");
     }

     const existingRequest = await connectionRequest.findOne({
        $or :[
            {fromUserId,toUserId},
            {toUserId,fromUserId}
        ]
     })
     if(!existingRequest){
        return res.status(400).send("Request already sent");
     }
     const connectionRequest = new connectionRequest({
        fromUserId,
        toUserId,
        status
     })
     let data = await connectionRequest.save();
     await request.save();
     res.send({message:"Request Sent",data});
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
})

module.exports = {requestRouter}