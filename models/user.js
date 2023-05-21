const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
name:{
    type:String,
    minlength: 2,
    required:true
},
email:{
    type:String,
    minlength: 6,
    unique: true,
    required: true
},
password:{
    type:String,
    minlength: 6,
    required: true
},
businessCard:{
    type: Array,
  },
isBusinessAccount:{
    type: Boolean,
    default: false,
},
})

const User = mongoose.model("users", userSchema);
module.exports = User;