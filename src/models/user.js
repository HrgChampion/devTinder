const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
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

userSchema.methods.getJwt = async function(){
  const user = this;
const token = await jwt.sign({_id:user._id},"Dev@Tinder$790",{expiresIn:"1d"});
return token
}

userSchema.index({firstName:1,lastName:1});
userSchema.methods.validatePassword = async function(password){
    const isPasswordValid = await bcrypt.compare(password,this.password);
    return isPasswordValid;
}

module.exports = mongoose.model("User",userSchema);
