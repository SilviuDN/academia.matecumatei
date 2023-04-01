const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true, //-> Ideally, should be unique, but it's up to you		
    // validate: {
    // 	validator: (email) => {
    // 		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    // 	},
    // 	message: 'The email must have a address@domani.[2-3Letters] format',
    // },
    required: [true, 'You must introduce a valid email address.'],

  },

  password: {
    type: String,
    // validate: {
		// 	validator: (pass) => {
		// 		return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(pass);
		// 	},
		// 	message: 'The password must contain at least a number, an uppercase letter, a lowercase letter and an 8 digits length',
		// },
		required: [true, 'You must introduce a valid password.'],
  },
  
  username: {
    type: String,
    // unique: true,
		required: [true, 'You must choose a username to represent you in our comunity.'],
  },

  role: {
    type: String,
    enum: ['admin', 'user', 'superUser', 'author'],
    default: 'user',
  },

  name: {
    type: String,
  },

  surname: {
    type: String,
  },

  description: [{
    type: String,
  }],

  contact: {
    linkedIn: {type: String},
    youtube: {type: String},
    slack: {type: String},
    twitter: {type: String},
    facebook: {type: String},
    instagram: {type: String},
  },

	address: {
		street: { type: String,},
		number: { type: Number,},
		country: { type: String,},
		city: { type: String,},
		postal: { type: String,},
		// location: {
		// 	type: {
		// 		type: String,
		// 	},
		// 	coordinates: [Number],
		// },
	},

	profile_img: {
		type: String,
	},

	digitalSignature_img: {
		type: String,
	},

  thumbsUp:{
    type: Number,
    default: 0,
  },

  level:{
    type: Number,
    default: 0,
  },

  courses:[{
    type: Schema.Types.ObjectId, 
    ref: 'Course'
  }],

  certificates:[{
    type: Schema.Types.ObjectId,
    ref: 'Certificate',
  }],

  invoices:[{
    type: Schema.Types.ObjectId,
    ref: 'Invoice',
  }],

  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }],

  replies: [{
    type: Schema.Types.ObjectId,
    ref: 'Reply'
  }]
},
{
    timestamps: true
}
);

const User = model("User", userSchema);

module.exports = User;
