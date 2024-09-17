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

const UserAuth =(req,res)=>{
    console.log("Admin auth is getting checked");
    const token = "xyz";
    const isAdminAuthorized = token==="xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Not Authorized")
    }else{
      next();
    }
}

module.exports = {adminAuth,UserAuth}