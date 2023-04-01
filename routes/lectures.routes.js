const express = require('express')
const router = express.Router()

const Lecture = require('./../models/Lecture.model')
const Section = require('./../models/Section.model')
const Course = require('./../models/Course.model')


// router.get('/', (req, res) => {

//     Lecture
//         .find()
//         .sort({ position: 1 })
//         .then(response => res.json(response))
//         // .then(response => setTimeout(() => res.json(response), 200))
//         .catch(err => res.status(500).json({ code: 500, message: 'Error fetching lectures', err }))
// })


router.get('/:lecture_id', (req, res) => {

    Lecture
        .findById(req.params.lecture_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching lectures', err }))
})


router.post('/new', (req, res) => {

    const lecture = req.body
    lecture.videoUrl += process.env.VIMEO_SETTINGS
    // console.log(lecture)

    // Section
    //     .findByIdAndUpdate(lecture.sectionId, { $push: {lectures: lecture._id }}, { new: true })
    //     // .findByIdAndUpdate(section, { $push: {sections: new mongoose.Types.ObjectId( section._id ) }}, { new: true })
    //     .then( (res) => console.log('We have a new lecture', res))
    //     .catch( (err) => console.log(err))


    Lecture
        .create(lecture)
        .then(response =>{
            const lectureId = response._id

            Section
                .findByIdAndUpdate(lecture.sectionId, { $push: {lectures: response._id }}, { new: true })
                .then( (res) => {
                    console.log(`We have a new lecture in the section: ${res._id} from the course ${res.courseId} snd the full section is ${res}`)
                    Course
                        .findByIdAndUpdate(res.courseId, { $push: {lectures: lectureId }}, { new: true })
                        .then( (res) => console.log('We have a new lecture', res))
                        .catch( (err) => console.log(err))
                })
                .catch( (err) => console.log(err))

            // Section
            //     .findByIdAndUpdate(lecture.sectionId, { $push: {lectures: response._id }}, { new: true })
            //     .then( (res) => console.log('We have a new lecture: ', res))
            //     .catch( (err) => console.log(err))

            // Course
            //     .findByIdAndUpdate(lecture.courseId, { $push: {lectures: response._id }}, { new: true })
            //     .then( (res) => console.log('We have a new lecture', res))
            //     .catch( (err) => console.log(err))
            
            return response

        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error saving lectures.', err }))
})




router.put('/edit/:lecture_id', (req, res) => {

    const lecture = req.body

    Lecture
        .findByIdAndUpdate(req.params.lecture_id, lecture)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error editing lectures', err }))
})

router.post('/delete/:lecture_id', (req, res) => {
    const lecture_id = req.params.lecture_id

    Lecture
        .findByIdAndDelete(lecture_id)
        .then(lecture => console.log(lecture))
        .catch(err => console.log(err))
})


module.exports = router