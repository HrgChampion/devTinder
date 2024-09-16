const express = require("express");
const app = express();


app.use("/test",(req,res)=>res.send("Hello World"));
// app.use("",(req,res)=>{
//     res.send("Dev Tinder learning");
// })

app.listen(4000,()=>{
    console.log("Listening on port 4000");
});