const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
      firstName : {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      emailId:{
        type: String,
      },
      password:{
        type: String,
      },
      age: {
        type: Number
      },
      gender:{
        type: String
      }
});

module.exports = mongoose.model("User",userSchema);
