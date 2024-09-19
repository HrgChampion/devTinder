const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = mongoose.Schema({
      firstName : {
        type: String,
        required: true
      },
      lastName: {
        type: String,
      },
      emailId:{
        type: String,
        required: true,
        unique: true,
        validate(value){
          if(!validator.isEmail(value)){
            throw new Error("Email is invalid");
          }
        }
      },
      password:{
        type: String,
        required: true,
        validate(value){
          if(!validator.isStrongPassword(value)){ 
            throw new Error("Password is not strong enough");
          }
        }
      },
      age: {
        type: Number,
        min:18
      },
      gender:{
        type: String,
        validate(value){
          if(value !== "male" && value !== "female"){
            throw new Error("Gender should be male or female");
          }
        }
      },
      photoUrl:{
        type: String
      },
      about:{
        type: String
      },
      skills:{
        type:[String]
      }
},{
    timestamps: true
});

module.exports = mongoose.model("User",userSchema);
