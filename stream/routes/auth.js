const router = require('express').Router();
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const shortid = require('shortid');
const User = require('../models/User.js').User;
require("dotenv").config();

//Register
router.post('/register', async(req, res) => {

    // Validate the data of user
    const { error } = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // checking if user already exists

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    

    //Create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        stream_key: shortid.generate()
    })
    await user.save().then(User => res.json(User))
});

//Login
router.post('/login', async (req, res) => {
    // Validate the data of user
    const { error } = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // Validate email
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Email Does Not exists')

    // Validate password
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Invalid Password')

    //create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
})

module.exports = router
