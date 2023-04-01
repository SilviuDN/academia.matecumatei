const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},

	course: {
		type: Schema.Types.ObjectId,
		ref: 'Course',
		required: true,
	},

	message: {
		type: String,
		required: true,
	},

	date: {
		type: Date,
		required: true,
	},

	rating: {
		type: Number,
		required: true,
		max: 5,
		min: 0,
	},
});

const Review = model('Review', reviewSchema);

module.exports = Review;