const express = require("express");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Card = require("../models/cards")
const User = require("../models/user")
const auth = require("../middleware/auth")

const cardSchema = joi.object({
    businessName: joi.string().min(2),
    description: joi.string().min(2),
    address: joi.string().min(2),
    telephone: joi.string().min(2),
    image: joi.string().min(2),
})

router.put("/:id", auth, async (req, res) => {
    try {
        const {error} = cardSchema.validate(req.body);
        if(error) return res.status(400).send(error.message);

        const id = req.params.id;
        //using findone threw an empty error, so switched to exists
        let card = await Card.exists({_id: id});
        if (!card) return res.status(400).send("card doesnt exists");

        card = await Card.findById(id);

        let updated = await Card.findByIdAndUpdate(id, req.body);

        let user = await User.findById(card.userID)

        let usercards = user.businessCard.filter((mycard) => mycard._id != id)

        await User.findByIdAndUpdate(card.userID, {businessCard:[...usercards, updated],isBusinessAccount:true});

        res.status(200).send("update successful");

    }
    catch (error){
        res.status(400).send(error)
    }
})




module.exports = router;