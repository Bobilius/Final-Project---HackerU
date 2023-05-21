const express = require("express");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Card = require("../models/cards")
const User = require("../models/user")
const auth = require("../middleware/auth")


router.delete("/:id", auth, async (req, res) => {
    try {
        const id = req.params.id;
        //using findone threw an empty error, so switched to exists
        let card = await Card.exists({_id: id});
        if (!card) return res.status(200).send("deletion successful");

        card = await Card.findById(id);

        //based on notes, we wont have a card that doesnt have a user
        let user = await User.findById(card.userID)

        let usercards = user.businessCard.filter((mycard) => mycard._id != id)

        await User.findByIdAndUpdate(card.userID, {businessCard:[...usercards]});

        await Card.findByIdAndDelete(id);
        
        res.status(200).send("delete successful");
    }
    catch (error){
        res.status(400).send(error)
    }
})




module.exports = router;