const express = require('express')
const Router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchUser')

const salt = 10;
const secreatKey = "akisdon"
Router.post('/createuser',
    body('email').isEmail(),
    body('name', 'Name should be atleast 3 characters long').isLength({ min: 3 }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            const salt = 10;
            const hash = await bcrypt.hash(req.body.password, salt)
            // console.log(hash,req.body.password)
            try {
                const user = User(req.body)
                user.password = hash;
                await user.save()
                res.json({ result: "User Created" })
            }

            // error if not saved 
            catch (err) {
                return res.status(400).json({ error:err.code})
            }
            // internal server error generator
        }
        catch (err) {
            res.status(500).send("internal server error")
        }
        // console.log(user)
    })

Router.post('/login',
    [body('email', 'please enter valid email').isEmail(),
    body('password').exists(),
    ],
    async (req, res) => {

        try {

            //checking for valid email is entered or not
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(406).json({ errors: errors.array() })
            }

            //finding if user exist or not in db
            const { email, password } = req.body;
            let user = await User.findOne({ email })
            if (!user) { return res.status(404).json({ result: "user not found" }) }

            //checking if password is correct or not
            const passCheck = user.password;
            const authPass = await bcrypt.compare(password, passCheck)

            if (!authPass) {
                return res.status(400).json({ result: "Please enter correct credentials" })
            }

            //generating jwt token
            const payload = {
                id: user.id
            }
            const token = jwt.sign(payload, secreatKey)
            res.json({ token,"name":user.name,"email":user.email })
        }
        catch (err) {
            res.status(500).json({ error: "internal server error" })
        }
    })

//getting user info /getuser
Router.post('/getuser', fetchUser, async (req, res) => {
    const userId = req.user

    const user = await User.findById(userId)
    console.log(user)
    res.send({ user })
})
module.exports = Router
