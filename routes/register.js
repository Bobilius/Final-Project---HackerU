const express = require("express");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user")

const registerSchema = joi.object({
    name: joi.string().required().min(2),
    email: joi.string().required().min(6).email(),
    password: joi.string().required().min(6),
    isBusinessAccount: joi.boolean(),
})

router.post("/", async (req, res) => {
    try {
        const {error} = registerSchema.validate(req.body);
        if(error) return res.status(400).send(error.message);

        //using findone threw an empty error, so switched to exists
        let user = await User.exists({email: req.body.email});
        if (user) return res.status(400).send("user already exists");

        user = new User(req.body);

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(req.body.password, salt)
        
        await user.save()

        res.status(201).send(user);


    }
    catch (error){
        res.status(400).send(error)
    }
})




module.exports = router;