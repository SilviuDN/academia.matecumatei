const { Schema, model } = require('mongoose');

const invoiceSchema = new Schema({
	student: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},

	course: {
		type: Schema.Types.ObjectId,
		ref: 'Course',
		required: true,
	},

	date: {
		type: Date,
		required: true,
	},

	qualification: {
		type: String,
		required: true,
        enum: ['excelent', 'bine'],		
	},
});

const Invoice = model('Invoice', invoiceSchema);

module.exports = Invoice;