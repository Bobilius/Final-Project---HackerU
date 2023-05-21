const mongoose = require("mongoose")

const cardSchema = new mongoose.Schema({
userID:{
    type:String,
    required:true
},
businessName:{
    type:String,
    minlength: 2,
    unique: true,
    required: true
},
description:{
    type:String,
    minlength: 2,
    required: true
},
address:{
    type:String,
    minlength: 2,
    required: true
},
telephone:{
    type:String,
    minlength: 2,
    required: true
},
image:{
    type:String,
    minlength: 2,
    required: true
},
})

const Card = mongoose.model("cards", cardSchema);
module.exports = Card;