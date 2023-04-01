const express = require('express')
const router = express.Router()

const User = require('./../models/User.model')


// router.get('/', (req, res) => {

//     User
//         .find()
//         .sort({ position: 1 })
//         .then(response => res.json(response))
//         // .then(response => setTimeout(() => res.json(response), 200))
//         .catch(err => res.status(500).json({ code: 500, message: 'Error fetching users.', err }))
// })


router.get('/:user_id', (req, res) => {

    User
        .findById(req.params.user_id)
        // .populate('courses')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching user.', err }))
})


// router.post('/new', (req, res) => {

//     const user = req.body

//     User
//         .create(user)
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json({ code: 500, message: 'Error saving user.', err }))
// })


// router.put('/edit/:user_id', (req, res) => {

//     const user = req.body

//     // adauga pozitia automat!!!

//     User
//         .findByIdAndUpdate(req.params.user_id, user)
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json({ code: 500, message: 'Error editing user.', err }))
// })


module.exports = router