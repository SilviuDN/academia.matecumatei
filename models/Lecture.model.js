const { Schema, model } = require("mongoose");

const lectureSchema = new Schema({  
  sectionNumber: {
    type: Number,
    // unique: true -> Ideally, should be unique, but its up to you
  },  

  lectureNumber: {
    type: Number,
    // unique: true -> Ideally, should be unique, but its up to you
  },

  name: {
    type: String,
    // unique: true -> Ideally, should be unique, but its up to you
  },

  typeOfLecture: {
    type: String,
    enum: ['video', 'written', 'OTHER'],
  },

  description: {
    type: String,
    // unique: true -> Ideally, should be unique, but its up to you
  },

  videoUrl: {
    type: String,
    // unique: true -> Ideally, should be unique, but its up to you
  },

  imageUrl: {
    type: String,
    // unique: true -> Ideally, should be unique, but its up to you
  },

  tags: [{
    type: String, 
  }],

  // reviews: [{
  //     type: Number, 
  // }],

  freeAccess:{
    type: Boolean,
  },

  authors:[{
    type: Schema.Types.ObjectId, ref: 'User'
  }],

  sectionId:{
    type: Schema.Types.ObjectId, ref: 'Section'
  },

  courseId:{
    type: Schema.Types.ObjectId, ref: 'Course'
  },
},
{
    timestamps: true
}
);

const Lecture = model("Lecture", lectureSchema);

module.exports = Lecture;