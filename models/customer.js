let Customer = require('../schema/customer');
let mongoose = require('mongoose');

exports.createCustomer = async payload => {
	let dob = new Date(payload.DOB);
	//format dob here
	if (dob.toDateString() === 'Invalid Date') {
		let response = {
			statusCode: 400,
			result: { status: false, message: 'Invalid Date' },
		};
		return response;
	}

	const customer = {
		_id: mongoose.Types.ObjectId(),
		firstName: payload.firstName,
		lastName: payload.lastName,
		email: payload.email,
		phoneNumber: payload.phoneNumber,
		DOB: payload.DOB,
	};

	let createRes = await Customer.create(customer)
		.then(res => {
			let response = {
				statusCode: 200,
				result: { status: false, data: res },
			};
			return response;
		})
		.catch(err => {
			let response = {
				statusCode: 400,
				result: { status: false, error: err.errmsg },
			};
			return response;
		});

	return createRes;
};
