const validator = require("validator");

const validateSignUpData = (req) => {

    const {firstName,lastName,emailId,password,age,gender,photoUrl,about,skills} = req.body;

    if(!firstName || !lastName){
       throw new Error("First Name and Last Name are required");
    }
    else if(!validator.isEmail(emailId)){
       throw new Error("Email is invalid");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough");
    }
    if(!validator.isNumeric(age)){
        return false;
    }
    if(gender !== "male" && gender !== "female"){
        return false;
    }
    if(!validator.isURL(photoUrl)){
        return false;
    }
    if(!validator.isLength(about,{min:5})){
        return false;
    }
    if(!validator.isLength(skills,{min:5})){
        return false;
    }
    return true;
}

const validateProfileData = (req) => {
    const allowedEditFields = ["firstName","lastName","emailId","age","gender","photoUrl","about","skills"];
    const isEditAllowed = Object.keys(req.body).every((key)=>allowedEditFields.includes(key));
    if(!isEditAllowed){
        throw new Error("Invalid updates");
    }
}
module.exports = {validateSignUpData,validateProfileData}