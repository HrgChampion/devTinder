const express = require("express");
const { UserAuth } = require("../middlewares/auth");
const userRouter = express.Router();

// Get all the pending connection request for the logged in user
userRouter.get("/user/requests/received",UserAuth,async(req,res)=>{
    
    try{
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status:"interested"
    }).populate("fromUserId",["firstName","lastName"]);
    res.send(connectionRequests);
    }catch(err){
        res.status(400).send(err.message);
    }

})

userRouter.get("user/connections",userAuth,async(req,res)=>{
    try{
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
    $or:[
        {toUserId:loggedInUser._id,status:"accepted"},
        {fromUserId:loggedInUser._id,status:"accepted"}
    ]
    }).populate("fromUserId",["firstName","lastName"]).populate("toUserId",["firstName","lastName"]);
    


    const data = connectionRequests.map((row) =>{
        if(row.fromUserId.equals(loggedInUser._id)){
            return row.toUserId;
    }
      return row.fromUserId;
    });
    res.send(connectionRequests);
    }catch(err){
        res.status(400).send(err.message);
    }
})

userRouter.get("/feed",userAuth, async(req,res)=>{
    try{
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page-1)*limit;
    limit = limit > 50 ? 50 : limit;
    const connectionRequests = await ConnectionRequest.find({
        $or:[
            {toUserId:loggedInUser._id},
            {fromUserId:loggedInUser._id}
        ]
    }).select("fromUserId toUserId");
    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) =>{
        hideUsersFromFeed.add(req.fromUserId.toString());
        hideUsersFromFeed.add(req.toUserId.toString());
    })
     const users = await User.find({
        $and:[
           { _id:{$nin:hideUsersFromFeed}  },
           { _id:{$ne:loggedInUser._id}  }
        ]
    }).select("firstName lastName _id photoUrl").skip(skip).limit(limit);
    res.send(users);
    }catch(err){
        res.status(400).send(err.message);
    }
})

module.exports = {userRouter}