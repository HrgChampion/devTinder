const express = require("express");
const app = express();


app.get("/user",(req,res)=>{
    res.send({"name":"Himanshu","age":21});
});

app.post("/user",(req,res)=>{
    res.send("Saving User Data")
})

app.delete("/user",(req,res)=>{
    res.send("Deleting User Data")
})
app.use("/test",(req,res)=>res.send("Hello World"));
app.use("",(req,res)=>{
    res.send("Dev Tinder learning");
})

app.listen(4000,()=>{
    console.log("Listening on port 4000");
});