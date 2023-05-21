const express = require("express");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user")

const loginSchema = joi.object({
    email: joi.string().required().min(6).email(),
    password: joi.string().required().min(6),
})

router.post("/", async (req, res) => {
    try {
        const {error} = loginSchema.validate(req.body);
        if(error) return res.status(400).send(error);

        //using findone threw an empty error, so switched to exists
        let user = await User.exists({email: req.body.email});
        if (!user) return res.status(400).send("user doesnt exist");

        //get user
        user = await User.findOne({email: req.body.email});

        const checkResult = await bcrypt.compare(req.body.password, user.password)
        if(!checkResult) return res.status(400).send("wrong password");

        const token = jwt.sign({_id: user._id}, process.env.JWTKEY);
        res.status(201).send(token);

    }
    catch (error){
        res.status(400).send(error)
    }
})




module.exports = router;