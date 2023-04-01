const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Section = require('./../models/Section.model')
const Course = require('./../models/Course.model')


// router.get('/', (req, res) => {

//     Section
//         .find()
//         .sort({ position: 1 })
//         .then(response => res.json(response))
//         // .then(response => setTimeout(() => res.json(response), 200))
//         .catch(err => res.status(500).json({ code: 500, message: 'Error fetching sections', err }))
// })


router.get('/:section_id', (req, res) => {

    Section
        .findById(req.params.section_id)
        .populate('lectures')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching sections', err }))
})


router.post('/new', (req, res) => {

    const section = req.body

    // console.log(mongoose.Types.ObjectId.isValid('53cb6b9b4f4ddef1ad47f943'));
    console.log(mongoose.Types.ObjectId.isValid(section.courseId));
    console.log(mongoose.Types.ObjectId.isValid(section._id)); 

    // console.log(section)

    // console.log('server says', section.courseId)

    // Pet.findByIdAndUpdate(id, { $push: { messages: message._id } }, { new: true });

    // Course
    //     .findByIdAndUpdate(section.courseId, { $push: {sections: section._id }}, { new: true })
    //     // .findByIdAndUpdate(section, { $push: {sections: new mongoose.Types.ObjectId( section._id ) }}, { new: true })
    //     .then( (res) => console.log('We have a new section', res))
    //     .catch( (err) => console.log(err))

    Section
        .create(section)
        .then(response => {

            // console.log('raspunsul este', response)

            Course
                .findByIdAndUpdate(section.courseId, { $push: {sections: response._id }}, { new: true })
                .then( (res) => console.log('We have a new section', res))
                .catch( (err) => console.log(err))
            
            return response

        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error saving sections', err }))


    
})


// router.put('/edit/:section_id', (req, res) => {

//     const section = req.body

//     Section
//         .findByIdAndUpdate(req.params.section_id, section)
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json({ code: 500, message: 'Error editing sections', err }))
// })


module.exports = router