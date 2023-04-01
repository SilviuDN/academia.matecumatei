const express = require('express')
const router = express.Router()
const { handleMongoooseError, isValidIdFormat } = require('../utils')

const bcrypt = require("bcrypt")
const bcryptSalt = 10

const User = require('./../models/User.model')



// Signup (post)
router.post('/signup', (req, res) => {

    const { email, pwd, name, surname, username } = req.body
    // username && (username = name.trim().split(' ')[0])


    User
        .findOne({ email })
        .then(user => {

            if (user) {
                // console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                res.status(400).json({ code: 400, err: ['A user already exists with this email address.'] })
                return
            }

            // toAdd: check the username

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = pwd ? bcrypt.hashSync(pwd, salt) : undefined

            User
                .create({ email, password: hashPass, name, surname, username})
                .then((user) => res.json({ code: 200, message: 'User created.'}))
                .catch(err => res.status(500).json({ code: 500, message: 'DB error while creating user.', err: handleMongoooseError(err) }))
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user.', err }))
})


// Login (post)
router.post('/login', (req, res) => {

    const { email, pwd } = req.body

    if( !email || !pwd ){
        res.status(400).json({ code: 401, err: ['Please provide the email and the password.'] })
        return
    }

    User
        .findOne({ email })
        .then(user => {

            if (!user) {
                res.status(401).json({ code: 401, err: ['User not registered.'] })
                return
            }

            if (bcrypt.compareSync(pwd, user.password) === false) {
                res.status(401).json({ code: 401, err: ['Incorect password.'] })
                return
            }

            req.session.currentUser = user
            res.json(req.session.currentUser)
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user.', err: handleMongoooseError(err) }))
})


router.get('/logout', (req, res) => {
    // res.json(req.session.currentUser)
    req.session.destroy((err) => res.json({ mssage: 'Logout successful.' }));
})

router.get('/isLoggedIn', (req, res) => {
    req.session.currentUser ? res.json(req.session.currentUser) : res.status(401).json({ code: 401, message: 'Unauthorized operation for unidentified user.' })
})



module.exports = router