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
				result: { status: true, data: res },
			};
			return response;
		})
		.catch(err => {
			let response = {
				statusCode: 400,
				result: { status: false, message: err.errmsg },
			};
			return response;
		});

	return createRes;
};

exports.getCustomers = async () => {
	let customerList = await Customer.find({})
		.then(function(customers) {
			return customers;
		})
		.catch(err => {
			return err.errmsg;
		});

	return customerList;
};

exports.updateCustomer = async payload => {
	if (!('customerId' in payload)) {
		let response = {
			statusCode: 400,
			result: {
				status: false,
				message: 'please include the customerId in the payload',
			},
		};
		return response;
	}
	let customerId = payload.customerId;

	let updatePayload = {
		firstName: payload.firstName,
		lastName: payload.lastName,
		email: payload.email,
		phoneNumber: payload.phoneNumber,
		DOB: payload.DOB,
	};
	let customerUpdate = await Customer.findByIdAndUpdate(
		customerId,
		updatePayload,
	)
		.then(res => {
			let response = {
				statusCode: 200,
				result: {
					status: true,
					data: res,
					message: 'customer updated successfully',
				},
			};
			return response;
		})
		.catch(err => {
			let response = {
				statusCode: 400,
				result: { status: false, message: err.errmsg },
			};
			return response;
		});

	return customerUpdate;
};

exports.removeCustomer = async payload => {
	if (!('customerId' in payload)) {
		let response = {
			statusCode: 400,
			result: {
				status: false,
				message: 'please include the customerId in the payload',
			},
		};
		return response;
	}
	let customerId = payload.customerId;

	let customerUpdate = await Customer.findByIdAndRemove(customerId)
		.then(res => {
			let response = {
				statusCode: 200,
				result: { status: true, message: 'customer remvoed successfully' },
			};
			return response;
		})
		.catch(err => {
			let response = {
				statusCode: 400,
				result: {
					status: false,
					error: err.errmsg,
				},
			};
			return response;
		});

	return customerUpdate;
};
