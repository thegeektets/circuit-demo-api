let mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	DOB: {
		type: Date,
		required: true,
	},
});

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;
