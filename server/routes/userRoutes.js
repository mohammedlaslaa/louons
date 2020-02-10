const express = require('express');
const app = express();
const router = express.Router();
const { User } = require("../models/userSchema");

router.get('/', async (req, res) => {
    const allUser = await User.find()
    res.send(allUser)
})

router.post('/', async (req, res) => {
    const user = new User({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
        password: req.body.password
    }) 

    await user.save();
    res.send(user)
})

module.exports = router;