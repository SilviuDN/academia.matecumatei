const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
  name: {
    type: String,
    // unique: true -> Ideally, should be unique, but its up to you
  },

  position: {
    type: Number,
    // unique: true -> Ideally, should be unique, but its up to you
  },

  typeOfCourse: {
    type: String,
    enum: ['video', 'written', 'OTHER'],
    // default: 'video',
  },

  about:{
    type: String,
  },

  description: {
    type: String,
    // unique: true -> Ideally, should be unique, but its up to you
  },

  tags: [{
    type: String, 
  }],

  image: {
    type: String,
    // unique: true -> Ideally, should be unique, but its up to you
  },

  sections: [{
      type: Schema.Types.ObjectId, ref: 'Section'
  }],

  lectures: [{
      type: Schema.Types.ObjectId, ref: 'Lecture'
  }],
  
  reviews: [{
      type: Number, 
			// type: Schema.Types.ObjectId,
			// ref: 'Review',
  }],

  //price must be null or exceed the StripeMinimumCharge * 3
  //if price is null, subscription is not available, certificate is unavailable (might be manually emmited for a fee)
  price: {
    type: Number,
    // unique: true -> Ideally, should be unique, but its up to you
  },
  
  //discountedPrice must be null or exceed the StripeMinimumCharge * 3
  discountedPrice: {
    type: Number,
    // unique: true -> Ideally, should be unique, but its up to you
  },

  //if the array includes the X value, whenever an "All with X% discount" is on, the discount applies.
  allPlatformPromotions:[{
    type: Number,
    enum: [10, 30, 50, 70, 80, 90]
  }],

  //the final discounted price after using the coupon should exceed the StripeMinimumCharge * 3 
  Coupons: [{
    type: Schema.Types.ObjectId,
    ref: 'Coupon',
  }],

  authors:[{
    type: Schema.Types.ObjectId, ref: 'User'
  }],

  owner:{
    type: Schema.Types.ObjectId, ref: 'User'
  },

  skillLevel:{
    type: String,
    enum: ['începător', 'mediu', 'avansat']
  },

  language:{
    type: String,
    enum: ['română', 'engleză', 'spaniolă']
  },

  students:[{
    type: Schema.Types.ObjectId, ref: 'User'
  }],

  //lecturesNumber = lectures.length ==> might be removed
  lecturesNumber: {
    type: Number,
  },

  totalTimeInSeconds: {
    type: Number,
  },

  freeAccessForAllLectures:{
    type: Boolean,
  },
},
{
    timestamps: true
}
);

const Course = model("Course", courseSchema);

module.exports = Course;