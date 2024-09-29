const express = require("express");

const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");
requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    
    try{
     const fromUserId = req.user._id;
     const toUserId = req.params.toUserId;
     const status = req.params.status;
     const allowedStatus = ["ignored","interested"]
     if(!allowedStatus.includes(status)){
        return res.status(400).send("Invalid status");
     }

     const existingRequest = await ConnectionRequest.findOne({
        $or :[
            {fromUserId,toUserId},
            {toUserId,fromUserId}
        ]
     })
     if(existingRequest){
        return res.status(400).send("Request already sent");
     }
     const toUser = await User.findById(toUserId);
     if(!toUser){
        return res.status(400).send("User not found");
     }
     const connectionRequest = new ConnectionRequest({
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

requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
   try{
   const loggedInUser = req.user;
   const {status,requestId} = req.params;
   const allowedStatus = ["accepted","rejected"];
   if(!allowedStatus.includes(status)){
    return res.status(400).send("Invalid status");
   }

   const connectionRequest = await ConnectionRequest.findOne({
      _id:requestId,
      toUserId:loggedInUser._id,
      status:"interested"
   })

   if(!connectionRequest){
    return res.status(400).send("Request not found");
   }
   connectionRequest.status = status;
   const data = await connectionRequest.save();
   res.send({message:"Request Reviewed",data});
   }catch(err){
    res.status(400).send(err.message);
   }
})
module.exports = {requestRouter}