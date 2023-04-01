const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},

	lecture: {
		type: Schema.Types.ObjectId,
		ref: 'Lecture',
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

    //thumbsUp = apreciatedBy.length => will probably be removed. Might be usefull for confort in ordering by score
	thumbsUp:{
	  type: Number,
	  default: 0,
	},

	//in order to avoid the same person casting multiple votes for the same question
	apreciatedBy:{
		type: Object.Types.ObjectId,
		ref: 'User'
	},
});

const Question = model('Question', questionSchema);

module.exports = Question;