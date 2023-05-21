const express = require("express");
const router = express.Router();
const Card = require("../models/cards")
const auth = require("../middleware/auth")
const _ = require("lodash")

router.get("/:id", auth, async (req, res) => {
    try {

        const id = req.params.id;
        //using findone threw an empty error, so switched to exists
        let card = await Card.exists({_id: id});
        if (!card) return res.status(400).send("card doesnt exist");
        
        //get user
        card = await Card.findById(id);

        res.status(200).send(card);

    }
    catch (error){
        res.status(400).send(error)
    }
})




module.exports = router;