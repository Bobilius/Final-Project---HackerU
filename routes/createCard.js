const express = require("express");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Card = require("../models/cards")
const User = require("../models/user")
const auth = require("../middleware/auth")

const cardSchema = joi.object({
    userID: joi.string().required().min(2),
    businessName: joi.string().required().min(2),
    description: joi.string().required().min(2),
    address: joi.string().required().min(2),
    telephone: joi.string().required().min(2),
    image: joi.string().required().min(2),
})

router.post("/", auth, async (req, res) => {
    try {
        const {error} = cardSchema.validate(req.body);
        if(error) return res.status(400).send(error.message);

        //using findone threw an empty error, so switched to exists
        let card = await Card.exists({businessName: req.body.businessName});
        if (card) return res.status(400).send("card name already exists");

         //using findone threw an empty error, so switched to exists
        let user = await User.exists({_id: req.body.userID});
        if (!user) return res.status(400).send("user doesnt exist");

        card = new Card(req.body);
        card = await card.save();

        user = await User.findById(req.body.userID)
        let updated = await User.findByIdAndUpdate(req.body.userID, {businessCard:[...user.businessCard, card],isBusinessAccount:true});

        res.status(201).send(card);

    }
    catch (error){
        res.status(400).send(error)
    }
})




module.exports = router;