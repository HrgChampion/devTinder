const express = require("express");
const app = express();

const {adminAuth,UserAuth} = require("./middlewares/auth");

app.use("/admin",adminAuth);

app.get("/user",UserAuth,(req,res)=>{
    console.log(req.query)
    res.send({"name":"Himanshu","age":21});
});

app.get("/user/:userId",(req,res)=>{
    console.log(req.params)
    res.send({"name":"Himanshu","age":21});
});

app.post("/user",(req,res)=>{
    res.send("Saving User Data")
})

app.delete("/user",(req,res)=>{
    res.send("Deleting User Data")
})

app.get("ab?c",(req,res)=>{
    res.send("ab?c")
})
app.get("ab+c",(req,res)=>{
    res.send("ab+c")
})
app.get("ab*cd",(req,res)=>{
    res.send("ab*c")
})

app.get("a(bc)?d",(req,res)=>{
    res.send("a(bc)?d")
})

app.get(/.*fly$/,(req,res)=>{
    res.send("a(bc)?d")
})

app.use("/test",(req,res)=>res.send("Hello World"));
app.use("",(req,res)=>{
    res.send("Dev Tinder learning");
})

app.use("/user",(req,res,next)=>{
    console.log("Handling the route user");
   // res.send("User1 route")
   next();
},(req,res)=>{
    console.log("Handling the route user");
    res.send("User2 route")
})

app.use("/user",(req,res,next)=>{
    console.log("Handling the route user");
   next();
   res.send("User1 route")
},(req,res)=>{
    console.log("Handling the route user");
    res.send("User2 route")
})

app.get("/admin/getAllData",(req,res)=>{
    const token = "xyz";
    const isAdminAuthorized = token==="xyz";
    if(isAdminAuthorized){
        res.send("Admin Data");
    }else{
        res.status(401).send("Not Authorized")
    }
})

// app.use("/admin",(req,res)=>{
//     const token = "xyz";
//     const isAdminAuthorized = token==="xyz";
//     if(!isAdminAuthorized){
//         res.status(401).send("Not Authorized")
//     }else{
//       next();
//     }
// })

app.get("/admin/getAllData",(req,res)=>{
    res.send("All Data sent");
})

app.get("/admin/deleteUser",(req,res)=>{
    res.send("User Deleted");
})

app.listen(4000,()=>{
    console.log("Listening on port 4000");
});