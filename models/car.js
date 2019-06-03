let Car = require('../schema/car');
let mongoose = require('mongoose');

exports.createCar = async payload => {
	//validate payload
	//TODO: move validations to controllers
	if (!('make' in payload)) {
		let response = {
			statusCode: 400,
			result: {
				status: false,
				message: 'please include make in payload to create car',
			},
		};
		return response;
	}

	if (!('model' in payload)) {
		let response = {
			statusCode: 400,
			result: {
				status: false,
				message: 'please include model in payload to create car',
			},
		};
		return response;
	}

	if (!('year' in payload)) {
		let response = {
			statusCode: 400,
			result: {
				status: false,
				message: 'please include year in payload to create car',
			},
		};
		return response;
	}
	if (!('owner' in payload)) {
		let response = {
			statusCode: 400,
			result: {
				status: false,
				message: 'please include owner in payload to create car',
			},
		};
		return response;
	}

	const car = {
		_id: mongoose.Types.ObjectId(),
		make: payload.make,
		model: payload.model,
		year: payload.year,
		owner: payload.owner,
	};

	let createRes = await Car.create(car)
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

exports.getCars = async () => {
	let carList = await Car.find({})
		.then(function(cars) {
			return cars;
		})
		.catch(err => {
			return err.errmsg;
		});

	return carList;
};

exports.updateCar = async payload => {
	if (!('carId' in payload)) {
		let response = {
			statusCode: 400,
			result: {
				status: false,
				message: 'please include the carId in the payload',
			},
		};
		return response;
	}
	let carId = payload.carId;

	let updatePayload = {
		make: payload.make,
		model: payload.model,
		year: payload.year,
		owner: payload.owner,
	};
	let customerUpdate = await Car.findByIdAndUpdate(carId, updatePayload)
		.then(res => {
			let response = {
				statusCode: 200,
				result: {
					status: true,
					data: res,
					message: 'car updated successfully',
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

exports.removeCar = async payload => {
	if (!('carId' in payload)) {
		let response = {
			statusCode: 400,
			result: {
				status: false,
				message: 'please include the carId in the payload',
			},
		};
		return response;
	}
	let carId = payload.carId;

	let carUpdate = await Car.findByIdAndRemove(carId)
		.then(res => {
			let response = {
				statusCode: 200,
				result: { status: true, message: 'car removed successfully' },
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

	return carUpdate;
};
