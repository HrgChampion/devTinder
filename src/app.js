const express = require("express");
const app = express();


app.get("/user",(req,res)=>{
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

app.listen(4000,()=>{
    console.log("Listening on port 4000");
});