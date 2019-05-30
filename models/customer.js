let mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
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

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
