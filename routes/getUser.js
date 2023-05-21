const express = require("express");
const router = express.Router();
const User = require("../models/user")
const auth = require("../middleware/auth")
const _ = require("lodash")

router.get("/:id", auth, async (req, res) => {
    try {

        const id = req.params.id;
        //using findone threw an empty error, so switched to exists
        let user = await User.exists({_id: id});
        if (!user) return res.status(400).send("user doesnt exist");
        
        //get user
        user = await User.findById(id);

        let values;
        if(user.isBusinessAccount)
            values = _.pick(user, "_id", "name", "email", "isBusinessAccount", "businessCard")
        else
            values = _.pick(user, "_id", "name", "email", "isBusinessAccount")
        res.status(200).send(values);

    }
    catch (error){
        res.status(400).send(error)
    }
})




module.exports = router;