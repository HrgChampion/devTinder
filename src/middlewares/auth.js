const jwt = require("jsonwebtoken");
const User = require("../models/user");
const adminAuth =(req,res)=>{
    console.log("Admin auth is getting checked");
    const token = "xyz";
    const isAdminAuthorized = token==="xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Not Authorized")
    }else{
      next();
    }
}

const UserAuth =async(req,res,next)=>{
  try{
const {token} = req.cookies;
if(!token){
  throw new Error("Invalid Token");
}
const decodedObj = await jwt.verify(token,"Dev@Tinder$790");
const user = await User.findById({_id:decodedObj._id});
if(!user){
  throw new Error("User not found");
}
req.user = user;
next();
  }catch(err){
    res.status(401).send(err.message);
  }
}

module.exports = {adminAuth,UserAuth}