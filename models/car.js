import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
	make: {
		type: String,
		required: true,
	},
	model: {
		type: String,
		required: true,
	},
	year: {
		type: Number,
		required: true,
	},
	owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
});

const Car = mongoose.model('Car', carSchema);

export default Car;
