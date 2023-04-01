const { Schema, model } = require("mongoose");

const sectionSchema = new Schema({
  name: {
    type: String,
    // unique: true -> Ideally, should be unique, but its up to you
  },  

  sectionNumber: {
    type: Number,
    // unique: true -> Ideally, should be unique, but its up to you
  },  

  description: {
    type: String,
    // unique: true -> Ideally, should be unique, but its up to you
  },

  tags: [{
    type: String, 
  }],

  lectures: [{
      type: Schema.Types.ObjectId, ref: 'Lecture'
  }],

  rating: {
      type: Number, 
  },
  
  grade:{
    type:String,
  },

  authors:[{
    type: Schema.Types.ObjectId, ref: 'User'
  }],

  freeAccessForAllLecturesInSection:{
    type: Boolean,
  },

  courseId:{
    type: Schema.Types.ObjectId, ref: 'Course'
  },
},
{
    timestamps: true
}
);

const Section = model("Section", sectionSchema);

module.exports = Section;