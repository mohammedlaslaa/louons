const express = require('express');
const router = express.Router();
const { User } = require("../models/userSchema");

router.get('/', async (req, res) => {
    const allUser = await User.find()
    res.send(allUser)
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select("firstName lastName email dateBirth");
    res.send(user)
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