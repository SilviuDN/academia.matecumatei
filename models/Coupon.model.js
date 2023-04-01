const { Schema, model } = require('mongoose');

const couponSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},

	course: [{
		type: Schema.Types.ObjectId,
		ref: 'Course',
		required: true,
	}],

	code: {
		type: String,
		required: true,
	},

	date: {
		type: Date,
		required: true,
	},

	percentageDiscount: {
		type: Number,
		required: true,
		max: 100,
		min: 30,
	},
});

const Coupon = model('Coupon', couponSchema);

module.exports = Coupon;